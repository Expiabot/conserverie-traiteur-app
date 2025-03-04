const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Un nom de fournisseur est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  contact: {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
    },
    phone: String,
    position: String
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: {
      type: String,
      default: 'France'
    }
  },
  categories: [{
    type: String,
    enum: {
      values: ['viande', 'poisson', 'légume', 'fruit', 'épice', 'condiment', 'produit laitier', 'céréale', 'autre'],
      message: 'Veuillez sélectionner une catégorie valide'
    }
  }],
  specialties: [String],
  rating: {
    quality: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    pricing: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  },
  minimumOrder: {
    amount: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      enum: {
        values: ['€', 'kg', 'unités'],
        default: '€'
      }
    }
  },
  deliveryTime: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 3
    },
    unit: {
      type: String,
      enum: {
        values: ['heures', 'jours', 'semaines'],
        default: 'jours'
      }
    }
  },
  paymentTerms: {
    type: String,
    enum: {
      values: ['à la livraison', '30 jours', '60 jours', '90 jours'],
      default: '30 jours'
    }
  },
  discounts: [{
    threshold: Number,
    percentage: Number,
    description: String
  }],
  website: String,
  notes: String,
  organic: {
    type: Boolean,
    default: false
  },
  local: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexation pour la recherche
supplierSchema.index({ name: 'text', 'specialties': 'text' });

// Méthodes virtuelles
supplierSchema.virtual('averageRating').get(function() {
  const { quality, delivery, pricing } = this.rating;
  return ((quality + delivery + pricing) / 3).toFixed(1);
});

supplierSchema.virtual('contactFullName').get(function() {
  if (!this.contact || !this.contact.firstName) return '';
  return `${this.contact.firstName} ${this.contact.lastName || ''}`.trim();
});

supplierSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  const { street, city, postalCode, country } = this.address;
  return `${street || ''}, ${postalCode || ''} ${city || ''}, ${country || ''}`.replace(/^,\s*|,\s*$/, '');
});

// Ajouter toutes les propriétés virtuelles quand on convertit en JSON
supplierSchema.set('toJSON', { virtuals: true });
supplierSchema.set('toObject', { virtuals: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;