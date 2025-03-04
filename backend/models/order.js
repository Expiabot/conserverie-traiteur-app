const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La quantité doit être au moins 1']
  },
  price: {
    type: Number,
    required: true
  }
});

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'La date de l\'événement est requise']
  },
  location: String,
  guestCount: {
    type: Number,
    required: [true, 'Le nombre d\'invités est requis'],
    min: [1, 'Le nombre d\'invités doit être au moins 1']
  },
  specialInstructions: String
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Une commande doit appartenir à un utilisateur']
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  phoneNumber: {
    type: String,
    required: [true, 'Un numéro de téléphone est requis']
  },
  orderType: {
    type: String,
    required: true,
    enum: {
      values: ['standard', 'event'],
      message: 'Le type de commande doit être standard ou événement'
    }
  },
  event: eventSchema,
  paymentMethod: {
    type: String,
    required: [true, 'Une méthode de paiement est requise'],
    enum: {
      values: ['carte', 'paypal'],
      message: 'La méthode de paiement doit être carte ou PayPal'
    }
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  status: {
    type: String,
    required: true,
    enum: {
      values: ['en attente', 'confirmée', 'en préparation', 'expédiée', 'livrée', 'annulée'],
      message: 'Statut de commande non valide'
    },
    default: 'en attente'
  },
  deliveryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pré-middleware pour remplir automatiquement les noms de produits
orderSchema.pre('save', async function(next) {
  if (this.isModified('orderItems')) {
    for (const item of this.orderItems) {
      if (!item.name) {
        const product = await mongoose.model('Product').findById(item.product);
        if (product) {
          item.name = product.name;
        }
      }
    }
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;