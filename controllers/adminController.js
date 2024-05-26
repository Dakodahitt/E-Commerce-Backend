const User = require('../models/User');
const Product = require('../models/Product');
const Review = require('../models/Review');

exports.elevateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({ role: 'admin' });
    res.status(200).json({ message: 'User elevated to admin successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error elevating user to admin', error });
  }
};

exports.demoteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({ role: 'user' });
    res.status(200).json({ message: 'User demoted to regular user successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error demoting user to regular user', error });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User banned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error banning user', error });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update({ quantity: req.body.quantity });
    res.status(200).json({ message: 'Product quantity updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update({ status: req.body.status });
    res.status(200).json({ message: 'Product status updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product status', error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};