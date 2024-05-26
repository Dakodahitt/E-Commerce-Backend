const express = require('express');
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, orderController.placeOrder);
router.get('/', authenticate, orderController.getOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.put('/:id/cancel', authenticate, orderController.cancelOrder);

module.exports = router;