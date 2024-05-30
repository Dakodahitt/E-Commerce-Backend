const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createWishlist = async (req, res) => {
  try {
    const { name } = req.body;
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: req.user.userId,
        name,
      },
    });
    res.status(201).json({ message: 'Wishlist created', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error creating wishlist', error });
  }
};

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await prisma.wishlist.findMany({
      where: { userId: req.user.userId },
    });
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlists', error });
  }
};

exports.getWishlistById = async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json({ message: 'Wishlist updated', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist',error });
  }
  };
  
  exports.deleteWishlist = async (req, res) => {
    try {
      await prisma.wishlist.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(200).json({ message: 'Wishlist deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting wishlist', error });
    }
  };