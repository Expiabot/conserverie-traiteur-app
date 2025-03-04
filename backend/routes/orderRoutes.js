const express = require('express');
const router = express.Router();
const { 
  createEventOrder, 
  getEventOrderById, 
  updateEventOrderStatus, 
  getMyEventOrders 
} = require('../controllers/eventOrderController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Routes pour les commandes standard
// Sera implémenté plus tard

// Routes pour les commandes événementielles
router.route('/event')
  .post(protect, createEventOrder);

router.route('/event/myorders')
  .get(protect, getMyEventOrders);

router.route('/event/:id')
  .get(protect, getEventOrderById);

router.route('/event/:id/status')
  .put(protect, admin, updateEventOrderStatus);

module.exports = router;