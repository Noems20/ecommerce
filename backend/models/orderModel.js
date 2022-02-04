import mongoose from 'mongoose';
import validator from 'validator';
import Product from './productModel.js';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'Debe pertenecer a un producto'],
        },
        name: { type: String, required: [true, 'No puede estar vacío'] },
        slug: {
          type: String,
        },
        for: { type: String, required: [true, 'No puede estar vacío'] },
        image: {
          type: String,
          required: [true, 'No puede estar vacío'],
        },
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
        size: {
          type: String,
          required: [true, 'No puede estar vacío'],
        },
        quantity: {
          type: Number,
          min: [1, 'Debe tener una cantidad mayor a 0'],
          required: [true, 'Debe tener una cantidad'],
        },
        price: {
          type: Number,
          required: [true, 'Debe tener un precio'],
        },
        totalprice: {
          type: Number,
          required: [true, 'Debe tener un precio'],
        },
      },
    ],
    shippingAddress: {
      state: {
        type: String,
        enum: {
          values: ['Zacatecas'],
          message: 'Selecciona un estado valido',
        },
        required: [true, 'No puede estar vacío'],
      },
      city: {
        type: String,
        enum: {
          values: ['Zacatecas', 'Guadalupe'],
          message: 'Selecciona una ciudad valida',
        },
        required: [true, 'No puede estar vacío'],
      },
      suburb: {
        type: String,
        trim: true,
        required: [true, 'No puede estar vacío'],
      },
      postalcode: {
        type: String,
        trim: true,
        minlength: [5, 'Debe ser un código postal valido'],
        maxlength: [5, 'Debe ser un código postal valido'],
        required: [true, 'No puede estar vacío'],
      },
      address: {
        type: String,
        trim: true,
        required: [true, 'No puede estar vacío'],
      },
      phone: {
        type: String,
        trim: true,
        validate: [validator.isNumeric, 'Solo debe contener numeros'],
        minlength: [10, 'Un número telefónico tiene 10 digitos'],
        maxlength: [10, 'Un número telefónico tiene 10 digitos'],
        required: [true, 'No puede estar vacío'],
      },
      references: {
        type: String,
        trim: true,
        default: '',
        validate: {
          validator: function (value) {
            if (value !== '') {
              return validator.isAlphanumeric(
                value.split(' ').join(''),
                'es-ES',
                {
                  ignore: ',.!¡¿?"()',
                }
              );
            }
            return true;
          },
          message: 'Solo puede contener caracteres y números',
        },
      },
      instructions: {
        type: String,
        trim: true,
        default: '',
        validate: {
          validator: function (value) {
            if (value !== '') {
              return validator.isAlphanumeric(
                value.split(' ').join(''),
                'es-ES',
                {
                  ignore: ',.!¡¿?"()',
                }
              );
            }
            return true;
          },
          message: 'Solo puede contener caracteres y números',
        },
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: {
        values: [
          'Pedido recibido',
          'Preparando pedido',
          'Listo para entregar',
          'En camino',
          'Entregado',
        ],
        message: 'Proporciona un estado válido',
      },
      default: 'Pedido recibido',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
  }
  // {
  //   timestamps: true,
  // }
);

// --------------------------------------- MIDDLEWARE -----------------------------------------------

// --------------- UPDATE PRODUCTS STOCK -----------------
orderSchema.pre('save', async function (next) {
  const fetchedProducts = {};

  for (const item of this.orderItems) {
    if (!(item.product in fetchedProducts)) {
      const product = await Product.findById(item.product);
      fetchedProducts[item.product] = product;
    }
    for (let color of fetchedProducts[item.product].subcategory.color) {
      if (color.colorname === item.colorname) {
        for (let size of color.sizes) {
          if (size.size === item.size) {
            size.quantity -= item.quantity;
          }
        }
      }
    }
  }

  for (let product in fetchedProducts) {
    // console.log(fetchedProducts[product].subcategory.color[0]);
    await fetchedProducts[product].save();
  }

  next();
});

// ---------------------- SAVE MIDDLEWARE -------------------
orderSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    if (doc.status === 'Entregado' && doc.deliveredAt === null) {
      doc.deliveredAt = new Date().toISOString();
    } else if (doc.status !== 'Entregado' && doc.deliveredAt !== null) {
      doc.deliveredAt = null;
    }
  }

  await doc.save();
});

// -------------------- QUERY MIDDLEWARE -------------------
orderSchema.pre(/^find/, function (next) {
  this.populate('user', 'name photo email');
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
