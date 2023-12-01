const {
  verifyToken,
  verifyAndAuthorize,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addWishList,
  updateWishlist,
  getWishList,
} = require("../controllers/wishlist.controller.js");
// add
router.post("/add", verifyAndAuthorize, addWishList);

// delete
router.patch("/update/:productId", verifyAndAuthorize, updateWishlist);

// get  order by userid
router.get("/", verifyAndAuthorize, getWishList);

module.exports = router;
