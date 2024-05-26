const express = require('express');
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.put('/user/:id/elevate', adminMiddleware, adminController.elevateUser);
router.put('/user/:id/demote', adminMiddleware, adminController.demoteUser);
router.put('/user/:id/ban', adminMiddleware, adminController.banUser);
router.put('/product/:id/update-quantity', adminMiddleware, adminController.updateProductQuantity);
router.put('/product/:id/update-status', adminMiddleware, adminController.updateProductStatus);

module.exports = router;