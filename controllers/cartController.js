const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.userId },
      include: { product: true },
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: req.user.userId,
        productId,
        quantity,
      },
    });
    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await prisma.cartItem.update({
      where: { userId_productId: { userId: req.user.userId, productId } },
      data: { quantity },
    });
    res.status(200).json({ message: 'Cart item updated', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    await prisma.cartItem.delete({
      where: { userId_productId: { userId: req.user.userId, productId } },
    });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};