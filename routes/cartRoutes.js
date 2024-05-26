const express = require('express');
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, cartController.getCart);
router.post('/add', authenticate, cartController.addToCart);
router.put('/update', authenticate, cartController.updateCartItem);
router.delete('/remove', authenticate, cartController.removeFromCart);

module.exports = router;