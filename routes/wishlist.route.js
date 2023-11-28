const {
  verifyToken,
  verifyAndAuthorize,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addWishList,
  deleteWishList,
  getUserWishlistByUserId,
  getUserWishlistByWishlistId,
} = require("../controllers/wishlist.controller.js");
// add
router.post("/add", verifyToken, addWishList);

// delete
router.delete("/delete/:wishlistId", verifyAndAuthorize, deleteWishList);

// get  order by userid
router.get("/:userId", verifyAndAuthorize, getUserWishlistByUserId);

// get  order by userid
router.get("/:wishlistId", verifyAndAuthorize, getUserWishlistByWishlistId);

module.exports = router;
