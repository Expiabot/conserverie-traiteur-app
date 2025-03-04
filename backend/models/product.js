const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Un nom de produit est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'Une description est requise'],
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Un prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  category: {
    type: String,
    required: [true, 'Une catégorie est requise'],
    enum: {
      values: ['conserve', 'plat-traiteur', 'amuse-bouche', 'entree', 'plat', 'dessert'],
      message: 'Veuillez sélectionner une catégorie valide'
    }
  },
  stock: {
    type: Number,
    required: [true, 'La quantité en stock est requise'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },
  images: [String],
  available: {
    type: Boolean,
    default: true
  },
  allergens: [String],
  ingredients: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  conservation: {
    type: String,
    default: 'Conserver au frais après ouverture'
  },
  expiryDays: {
    type: Number,
    default: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexation pour la recherche
productSchema.index({ name: 'text', description: 'text' });

// Méthode virtuelle pour vérifier si le produit est en stock
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;