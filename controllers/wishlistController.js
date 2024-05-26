const Wishlist = require('../models/Wishlist');
const WishlistItem = require('../models/WishlistItem');
const Product = require('../models/Product');

exports.createWishlist = async (req, res) => {
  try {
    const { name } = req.body;
    const wishlist = await Wishlist.create({ userId: req.user.userId, name });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating wishlist', error });
  }
};

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.findAll({ where: { userId: req.user.userId } });
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlists', error });
  }
};

exports.getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (wishlist && wishlist.userId === req.user.userId) {
      const items = await WishlistItem.findAll({ where: { wishlistId: wishlist.id }, include: [Product] });
      res.status(200).json({ wishlist, items });
    } else {
      res.status(404).json({ message: 'Wishlist not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (wishlist && wishlist.userId === req.user.userId) {
      await wishlist.update(req.body);
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist', error });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByPk(req.params.id);
    if (wishlist && wishlist.userId === req.user.userId) {
      await wishlist.destroy();
      res.status(200).json({ message: 'Wishlist deleted' });
    } else {
      res.status(404).json({ message: 'Wishlist not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting wishlist', error });
  }
};