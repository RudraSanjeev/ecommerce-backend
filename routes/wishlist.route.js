const { verifyAndAuthorize } = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addWishList,
  updateWishlist,
  getWishList,
} = require("../controllers/wishlist.controller.js");
// add
router.post("/", verifyAndAuthorize, addWishList);

// update
router.patch("/:productId", verifyAndAuthorize, updateWishlist);

// get  order by userid
router.get("/", verifyAndAuthorize, getWishList);

module.exports = router;
