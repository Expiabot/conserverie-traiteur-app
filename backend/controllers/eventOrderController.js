const asyncHandler = require('express-async-handler');
const Order = require('../models/order');
const Product = require('../models/product');

// @desc    Créer une nouvelle commande pour événement
// @route   POST /api/orders/event
// @access  Private
const createEventOrder = asyncHandler(async (req, res) => {
  const { 
    orderItems, 
    event, 
    shippingAddress, 
    paymentMethod
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('Aucun produit dans la commande');
  }

  if (!event || !event.date || !event.guestCount) {
    res.status(400);
    throw new Error('Les détails de l\'événement sont incomplets');
  }

  // Vérifier la disponibilité des produits pour la date sélectionnée
  const productsToCheck = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404);
        throw new Error(`Produit non trouvé: ${item.product}`);
      }
      return product;
    })
  );

  // Vérifier si tous les produits sont disponibles
  const unavailableProducts = productsToCheck.filter(product => !product.available || product.stock < 1);
  
  if (unavailableProducts.length > 0) {
    res.status(400);
    throw new Error(`Certains produits ne sont pas disponibles: ${unavailableProducts.map(p => p.name).join(', ')}`);
  }

  // Calculer les prix
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  ).toFixed(2);

  const taxPrice = (Number(itemsPrice) * 0.2).toFixed(2);
  const shippingPrice = event.guestCount > 20 ? 0 : 15;
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  // Créer la commande
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderType: 'event',
    event,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Obtenir les détails d'une commande événementielle
// @route   GET /api/orders/event/:id
// @access  Private
const getEventOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate({
      path: 'orderItems.product',
      select: 'name images category',
    });

  if (order && order.orderType === 'event') {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Commande événementielle non trouvée');
  }
});

// @desc    Mettre à jour le statut d'une commande événementielle
// @route   PUT /api/orders/event/:id/status
// @access  Private/Admin
const updateEventOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Commande non trouvée');
  }

  if (order.orderType !== 'event') {
    res.status(400);
    throw new Error('Cette commande n\'est pas de type événementiel');
  }

  order.status = status;
  
  if (status === 'livrée') {
    order.deliveryDate = Date.now();
  }

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Obtenir toutes les commandes événementielles d'un utilisateur
// @route   GET /api/orders/event/myorders
// @access  Private
const getMyEventOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    orderType: 'event',
  }).sort({ createdAt: -1 });
  
  res.json(orders);
});

module.exports = {
  createEventOrder,
  getEventOrderById,
  updateEventOrderStatus,
  getMyEventOrders,
};