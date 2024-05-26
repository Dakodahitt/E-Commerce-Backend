const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await Order.create({ userId: req.user.userId, totalAmount });
    // Add logic to handle items
    await Promise.all(items.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ quantity: product.quantity - item.quantity });
      }
    }));
    await CartItem.destroy({ where: { userId: req.user.userId } });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order && order.userId === req.user.userId) {
      order.status = 'cancelled';
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error });
  }
};