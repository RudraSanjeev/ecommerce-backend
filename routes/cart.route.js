const {
  verifyToken,
  verifyAndAuthorize,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUserCart,
  getAllCart,
} = require("../controllers/cart.controller.js");
// add
router.post("/add", verifyToken, addCart);

// update
router.patch("/update/:cartId", verifyAndAuthorize, updateCart);

// delete
router.delete("/delete/:cartId", verifyAndAuthorize, deleteCart);

// get all  user cart
router.get("/allUser/:cartId", verifyAndAuthorize, getAllUserCart);

// get all cart
router.get("/all/:cartId", verifyAndAuthorize, getAllCart);

// get a user cart
router.get("/:cartId", verifyAndAuthorize, getUserCart);

module.exports = router;
