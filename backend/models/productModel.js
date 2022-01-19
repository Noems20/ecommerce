import mongoose from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';

// ---------------------------------------------------------
// VALIDATION HELPERS  --------------------------
// ---------------------------------------------------------
const categoriesForClothing = ['playera', 'sudadera'];
const forClothing = ['niño', 'niña', 'hombre', 'mujer'];

async function validateCategory() {
  if (this.catalog === 'ropa') {
    if (categoriesForClothing.includes(this.category)) return true;
    return false;
  }
  if (this.category !== 'general') return false;
  return true;
}

function validateSizes() {
  const clothingSizes = ['S', 'XS', 'M', 'L', 'XL', 'XXL'];
  const generalSizes = ['chico', 'mediano', 'grande', 'general'];
  if (this.parent().parent().parent().catalog === 'ropa') {
    if (clothingSizes.includes(this.size)) {
      return true;
    }
    return false;
  } else if (generalSizes.includes(this.size)) {
    return true;
  }
  return false;
}

function isEligibleForGeneral() {
  if (this.catalog === 'ropa') {
    if (forClothing.includes(this.for)) return true;
    return false;
  }

  if (this.for !== 'general') return false;
  return true;
}

// ---------------------------------------------------------
// SUBCATEGORY SCHEMA --------------------------
// ---------------------------------------------------------

const subcategory = new mongoose.Schema({
  color: {
    type: [
      {
        colorname: {
          type: String,
          minlength: [3, 'Necesita ser mayor a 2 caracteres'],
          maxlength: [6, 'Necesita ser menor a 7 caracteres'],
          required: [true, 'Debe tener un color'],
          validate: {
            validator: (val) => validator.isHexadecimal(val),
            message: 'Introduce un color en formato hexadecimal',
          },
        },
        image: {
          type: String,
        },
        sizes: {
          type: [
            {
              size: {
                type: String,
                validate: {
                  validator: validateSizes,
                  message: 'Selecciona un tamaño adecuado',
                },
                required: [true, 'No puede estar vacío'],
              },
              quantity: {
                type: Number,
                required: [true, 'No puede estar vacío'],
              },
            },
          ],
          validate: {
            // validator: requireSizes,
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: 'Debe tener al menos un elemento',
          },
        },
      },
    ],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Debe tener al menos un elemento',
    },
  },
});

// ---------------------------------------------------------
// PRODUCT SCHEMA --------------------------
// ---------------------------------------------------------

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'No puede estar vacío'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'No puede estar vacío'],
    },
    specifications: [String],
    extraimages: [String],
    catalog: {
      type: String,
      trim: true,
      enum: {
        values: ['ropa', 'agendas', 'regalos', 'encuadernados'],
        message: 'Catálogo debe ser: ropa, agendas, regalos o encuadernados',
      },
      required: [true, 'No puede estar vacío'],
    },
    category: {
      type: String,
      trim: true,
      validate: {
        validator: validateCategory,
        message: 'Debe tener una categoria correcta',
      },
      required: [true, 'No puede estar vacío'],
    },
    for: {
      type: String,
      trim: true,
      enum: {
        values: ['hombre', 'mujer', 'niño', 'niña', 'general'],
        message: 'Catálogo debe ser: hombre, mujer, niño, niña o general',
      },
      validate: {
        validator: isEligibleForGeneral,
        message: 'Debe tener un catálogo correcto',
      },
      required: [true, 'No puede estar vacío'],
    },
    subcategory: {
      type: subcategory,
      required: [true, 'Debe tener una subcategoria'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Debe tener precio'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });

// Virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product', // How is called in review model
  localField: '_id', // How is called in local model
});

// DOCUMENT MIDDLEWARE runs before .save() and .create() not insertMany(), update(), findOneAndUpdate()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name + ' ' + this.for, { lower: true });
  next();
});

// --------------- ADD PRODUCT IMAGE -----------------
productSchema.pre('save', async function (next) {
  // console.log('-------------- COLOR ARRAY ----------------');
  for (const colorId in this.subcategory.color) {
    let image = `product-${this.id}-${this.subcategory.color[colorId].colorname}.png`;
    this.subcategory.color[colorId].image = image;
  }

  next();
});

// productSchema.pre(/^findOneAnd/, async function (next) {
//   this.currentDoc = await this.findOne().clone();
//   next();
// });

// // This works for both because the others are findById -> (uses findOne not findOneAnd)
// // findByIdAndUpdate -> short hand of findOneAndUpdate
// // findByIdAndDelete -> short hand of findOneAndDelete
// productSchema.post(/^findOneAnd/, async function (doc) {
//   console.log('llego a post');
//   if (doc) {
//     const slugCheck = slugify(doc.name, { lower: true });
//     if (doc.slug !== slugCheck) {
//       await doc.save();
//     }
//   }
// });

const Product = mongoose.model('Product', productSchema);

export default Product;
