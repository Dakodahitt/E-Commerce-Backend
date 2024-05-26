const User = require('../models/User');
const Order = require('../models/Order');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    await user.update(req.body);
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error });
  }
};