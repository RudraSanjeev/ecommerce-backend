const Wishlist = require("../models/wishlist.model.js");

//CREATE
const addWishList = async (req, res) => {
  const newWishList = new Order(req.body);

  try {
    const savedWishList = await newWishList.save();
    res.status(201).json(savedWishList);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteWishList = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.wishlistId);
    res.status(200).json("Item  has been deleted from wishlist ...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER wishlist
const getUserWishlistByUserId = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.params.userId });
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET single wishlist by wishlist id
const getUserWishlistByWishlistId = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.wishlistId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addWishList,
  deleteWishList,
  getUserWishlistByUserId,
  getUserWishlistByWishlistId,
};
