const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: req.body,
    });
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ where: { userId: req.user.userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error });
  }
};