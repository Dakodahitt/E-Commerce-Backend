const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user.userId },
      include: [Product],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await CartItem.create({
      userId: req.user.userId,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await CartItem.findOne({
      where: { userId: req.user.userId, productId },
    });
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cartItem = await CartItem.findOne({
      where: { userId: req.user.userId, productId },
    });
    if (cartItem) {
      await cartItem.destroy();
      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
};
