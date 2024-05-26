const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, wishlistController.createWishlist);
router.get('/', authenticate, wishlistController.getWishlists);
router.get('/:id', authenticate, wishlistController.getWishlistById);
router.put('/:id', authenticate, wishlistController.updateWishlist);
router.delete('/:id', authenticate, wishlistController.deleteWishlist);

module.exports = router;