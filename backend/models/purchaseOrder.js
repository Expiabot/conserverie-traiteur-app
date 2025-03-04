const mongoose = require('mongoose');

const purchaseOrderItemSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ingredient',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0.1, 'La quantité doit être supérieure à 0']
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ['g', 'kg', 'ml', 'l', 'unité', 'pièce', 'botte', 'cuillère à café', 'cuillère à soupe'],
      message: 'Veuillez sélectionner une unité valide'
    }
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, 'Le prix unitaire ne peut pas être négatif']
  },
  subtotal: {
    type: Number,
    required: true
  },
  receivedQuantity: {
    type: Number,
    default: 0
  },
  notes: String
});

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDeliveryDate: {
    type: Date,
    required: true
  },
  actualDeliveryDate: Date,
  items: [purchaseOrderItemSchema],
  status: {
    type: String,
    required: true,
    enum: {
      values: ['brouillon', 'commandé', 'partiel', 'reçu', 'annulé'],
      default: 'brouillon'
    }
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: {
      values: ['non payé', 'partiel', 'payé'],
      default: 'non payé'
    }
  },
  paymentDueDate: Date,
  paymentDate: Date,
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Le montant total ne peut pas être négatif']
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  shippingAmount: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  notes: String,
  attachments: [{
    name: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Indexation
purchaseOrderSchema.index({ orderNumber: 1 }, { unique: true });
purchaseOrderSchema.index({ supplier: 1 });
purchaseOrderSchema.index({ orderDate: 1 });
purchaseOrderSchema.index({ status: 1 });
purchaseOrderSchema.index({ paymentStatus: 1 });

// Middleware pour calculer le montant total
purchaseOrderSchema.pre('save', function(next) {
  // Calculer le montant des articles
  let itemsTotal = 0;
  if (this.items && this.items.length > 0) {
    this.items.forEach(item => {
      item.subtotal = item.quantity * item.unitPrice;
      itemsTotal += item.subtotal;
    });
  }
  
  // Calculer le montant total
  this.totalAmount = itemsTotal + this.shippingAmount + this.taxAmount - this.discountAmount;
  
  // Mettre à jour la date de mise à jour
  this.updatedAt = Date.now();
  
  next();
});

// Méthodes virtuelles
purchaseOrderSchema.virtual('isOverdue').get(function() {
  if (this.status === 'commandé' && this.expectedDeliveryDate < new Date()) {
    return true;
  }
  return false;
});

purchaseOrderSchema.virtual('isPaymentOverdue').get(function() {
  if (this.paymentStatus !== 'payé' && this.paymentDueDate && this.paymentDueDate < new Date()) {
    return true;
  }
  return false;
});

purchaseOrderSchema.virtual('receivedPercentage').get(function() {
  if (!this.items || this.items.length === 0) return 0;
  
  let totalReceived = 0;
  let totalOrdered = 0;
  
  this.items.forEach(item => {
    totalReceived += item.receivedQuantity;
    totalOrdered += item.quantity;
  });
  
  return totalOrdered > 0 ? Math.floor((totalReceived / totalOrdered) * 100) : 0;
});

// Ajouter toutes les propriétés virtuelles quand on convertit en JSON
purchaseOrderSchema.set('toJSON', { virtuals: true });
purchaseOrderSchema.set('toObject', { virtuals: true });

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;