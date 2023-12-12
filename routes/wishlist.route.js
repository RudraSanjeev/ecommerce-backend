const { verifyAndAuthorize } = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addWishList,
  getWishList,
  deleteWishlist,
} = require("../controllers/wishlist.controller.js");
// add
router.post("/", verifyAndAuthorize, addWishList);

// delete
router.delete("/:productId", verifyAndAuthorize, deleteWishlist);

// get  order by userid
router.get("/", verifyAndAuthorize, getWishList);

module.exports = router;
