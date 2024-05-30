const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = await prisma.review.create({
      data: {
        userId: req.user.userId,
        productId,
        rating,
        comment,
      },
    });
    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(req.params.productId) },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await prisma.review.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};