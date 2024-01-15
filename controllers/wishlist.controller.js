const Wishlist = require("../models/wishlist.model.js");
const Product = require("../models/product.model.js");
const {
  addWishListSchema,
  updateWishlistSchema,
} = require("../validators/wishlist.validator.js");
//CREATE
const addWishList = async (req, res) => {
  // const newWishList = new Wishlist(req.body);
  try {
    const { error } = addWishListSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const productId = req.body.items.productId;

    if (!productId) {
      return res.status(400).json({
        error: `User ID, Or Product ID are required.${userId}, ${productId}`,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found with given id !");
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ ...req.body, userId });
      await wishlist.save();
      return res.status(200).json("wishlist added successfully !");
    }

    const existingItem = wishlist.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      return res.status(400).json("product allready present in the wishlist !");
    }

    wishlist.items.push({ productId });
    await wishlist.save();

    res.status(201).json("wishlist added successfully !");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

// delete;
const deleteWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;

    const { error } = updateWishlistSchema.validate({
      productId,
    });
    if (error) {
      return res.status(400).json(error.message || "Bad request !");
    }
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json("Wishlist not found !");
    }

    const existingItem = wishlist.items.find(
      (item) => item.productId.equals(productId)
      // item.productId.toString() === productId.toString()
    );

    if (!existingItem) {
      return res.status(404).json("No product found in the wishlist !");
    }
    wishlist.items.pull({ productId: existingItem.productId });
    await wishlist.save();
    res.status(200).json("Item  has been deleted from wishlist ...");
  } catch (err) {
    res.status(500).json(err.message || "Internal server error !");
  }
};

//GET USER wishlist
const getWishList = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ userId })
      .populate("items.productId")
      .exec();
    if (!wishlist) {
      return res.status(404).json("wishlist not found !");
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err.message || "Internal sever error !");
  }
};

module.exports = {
  addWishList,
  deleteWishlist,
  getWishList,
};
