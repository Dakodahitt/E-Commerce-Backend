const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.elevateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role: 'admin' },
    });
    res.status(200).json({ message: 'User elevated to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Error elevating user', error });
  }
};

exports.demoteUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role: 'user' },
    });
    res.status(200).json({ message: 'User demoted to user', user });
  } catch (error) {
    res.status(500).json({ message: 'Error demoting user', error });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { banned: true },
    });
    res.status(200).json({ message: 'User banned', user });
  } catch (error) {
    res.status(500).json({ message: 'Error banning user', error });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { quantity: req.body.quantity },
    });
    res.status(200).json({ message: 'Product quantity updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product quantity', error });
  }
};

exports.updateProductStatus = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status },
    });
    res.status(200).json({ message: 'Product status updated', product });
  } catch (error) {
    res.status (500).json({ message: 'Error updating product status', error });
  }
};