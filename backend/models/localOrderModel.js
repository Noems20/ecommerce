import mongoose from 'mongoose';
import validator from 'validator';

const localOrderSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      trim: true,
      required: [true, 'No puede estar vacío'],
    },
    clientEmail: {
      type: String,
      validate: [validator.isEmail, 'Debe ser un email válido'],
      required: [true, 'No puede estar vacío'],
    },
    clientCellphone: {
      type: String,
      validate: [validator.isNumeric, 'Solo debe contener numeros'],
      minlength: [10, 'Un número telefónico tiene 10 digitos'],
      maxlength: [10, 'Un número telefónico tiene 10 digitos'],
      required: [true, 'No puede estar vacío'],
    },
    employeeName: {
      type: String,
      trim: true,
      required: [true, 'No puede estar vacío'],
    },
    description: {
      type: String,
      trim: true,
      // validate: {
      //   validator: function (value) {
      //     return validator.isAlphanumeric(value.split(' ').join(''), 'es-ES', {
      //       ignore: ',.!¡¿?"()',
      //     });
      //   },
      //   message: 'Solo puede contener caracteres y números',
      // },
    },
    products: {
      type: [
        {
          product: {
            type: String,
            required: [true, 'No puede estar vacío'],
          },
          quantity: {
            type: String,
            validate: [validator.isNumeric, 'Solo debe contener numeros'],
            required: [true, 'Debe tener una cantidad'],
          },
          price: {
            type: String,
            validate: [validator.isNumeric, 'Solo debe contener numeros'],
            required: [true, 'Debe tener un precio'],
          },
          totalPrice: {
            type: String,
            validate: [validator.isNumeric, 'Solo debe contener numeros'],
            required: [true, 'Debe tener un precio'],
          },
        },
      ],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Debe tener al menos un elemento',
      },
    },
    totalPrice: {
      type: String,
      validate: [validator.isNumeric, 'Solo debe contener numeros'],
      required: [true, 'Debe tener un precio'],
    },
    paid: {
      type: String,
      validate: {
        // Only works with CREATE and SAVE
        // Because this. only points to current doc on NEW document creation
        validator: function (el) {
          return !(
            Number(el) < 0 ||
            Number(el) > this.totalPrice ||
            !validator.isNumeric(el)
          );
        },
        message: 'Introduce una cantidad valida',
      },
      default: 0,
    },
    percentage: {
      type: String,
      validate: [validator.isNumeric, 'Solo debe contener numeros'],
      min: [-100, 'Debe estar entre -100% y 100%'],
      max: [100, 'Debe estar entre -100% y 100%'],
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['En preparación', 'Listo para entregar', 'Entregado'],
        message: 'Proporciona un estado válido',
      },
      default: 'En preparación',
    },
    date: {
      type: Date,
      required: [true, 'No puede estar vacío'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Una cita debe pertenecer a un usuario'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --------------- POPULATE APPOINTMENT -----------------
localOrderSchema.pre(/^find/, function (next) {
  this.populate('user', 'name photo');
  next();
});

// ------------------- MIDDLEWARES -----------------------

const LocalOrder = mongoose.model('LocalOrder', localOrderSchema);

export default LocalOrder;
