const {
  verifyToken,
  verifyAndAuthorize,
  verifyAndAdmin,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addCart,
  updatedCart,
  deletedCart,
  getAllCart,
} = require("../controllers/cart.controller.js");
// add
router.post("/", verifyToken, addCart);

// update
router.patch("/:productId", verifyAndAuthorize, updatedCart);

// delete
router.delete("/:productId", verifyAndAuthorize, deletedCart);

// get all cart
router.get("/", verifyAndAdmin, getAllCart);

module.exports = router;
