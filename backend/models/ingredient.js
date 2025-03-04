const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Un nom d\'ingrédient est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  category: {
    type: String,
    required: [true, 'Une catégorie est requise'],
    enum: {
      values: ['viande', 'poisson', 'légume', 'fruit', 'épice', 'condiment', 'produit laitier', 'céréale', 'autre'],
      message: 'Veuillez sélectionner une catégorie valide'
    }
  },
  unit: {
    type: String,
    required: [true, 'Une unité de mesure est requise'],
    enum: {
      values: ['g', 'kg', 'ml', 'l', 'unité', 'pièce', 'botte', 'cuillère à café', 'cuillère à soupe'],
      message: 'Veuillez sélectionner une unité valide'
    }
  },
  stock: {
    type: Number,
    required: [true, 'La quantité en stock est requise'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },
  minStock: {
    type: Number,
    required: [true, 'Le stock minimum est requis'],
    min: [0, 'Le stock minimum ne peut pas être négatif'],
    default: 10
  },
  cost: {
    type: Number,
    required: [true, 'Le coût est requis'],
    min: [0, 'Le coût ne peut pas être négatif']
  },
  suppliers: [{
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: 'Supplier'
    },
    preferenceOrder: {
      type: Number,
      default: 1
    },
    supplierReference: String,
    supplierCost: Number
  }],
  allergen: {
    type: Boolean,
    default: false
  },
  allergenInfo: {
    type: String
  },
  organic: {
    type: Boolean,
    default: false
  },
  local: {
    type: Boolean,
    default: false
  },
  seasonality: [{
    month: {
      type: Number,
      min: 1,
      max: 12
    },
    available: {
      type: Boolean,
      default: true
    },
    quality: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  }],
  expiryDays: {
    type: Number,
    default: 7
  },
  storageTips: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexation pour la recherche
ingredientSchema.index({ name: 'text' });

// Méthodes virtuelles
ingredientSchema.virtual('needsRestock').get(function() {
  return this.stock <= this.minStock;
});

ingredientSchema.virtual('preferredSupplier').get(function() {
  if (!this.suppliers || this.suppliers.length === 0) return null;
  
  return this.suppliers.sort((a, b) => a.preferenceOrder - b.preferenceOrder)[0];
});

// Calcul de la saisonnalité actuelle
ingredientSchema.virtual('currentSeasonality').get(function() {
  const currentMonth = new Date().getMonth() + 1; // getMonth() retourne 0-11
  const currentSeason = this.seasonality.find(s => s.month === currentMonth);
  
  return currentSeason ? currentSeason : { available: true, quality: 3 };
});

// Ajouter toutes les propriétés virtuelles quand on convertit en JSON
ingredientSchema.set('toJSON', { virtuals: true });
ingredientSchema.set('toObject', { virtuals: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;