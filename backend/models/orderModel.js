import mongoose from 'mongoose';
import validator from 'validator';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
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
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// -------------------- QUERY MIDDLEWARE -------------------
orderSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
