const express = require('express');
const reviewController = require('../controllers/reviewController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, reviewController.addReview);
router.get('/:productId', reviewController.getProductReviews);
router.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = router;