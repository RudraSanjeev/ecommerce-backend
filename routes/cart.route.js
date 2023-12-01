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
  getCart,
  getAllCart,
} = require("../controllers/cart.controller.js");
// add
router.post("/add", verifyToken, addCart);

// update
router.patch("/update/:productId", verifyAndAuthorize, updatedCart);

// delete
router.delete("/delete/:cartId", verifyAndAuthorize, deletedCart);

// get single user cart
router.get("/", verifyAndAuthorize, getCart);

// // get all cart
router.get("/all", verifyAndAdmin, getAllCart);

module.exports = router;
