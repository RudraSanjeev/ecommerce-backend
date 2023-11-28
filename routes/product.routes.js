const { verifyAndAdmin } = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  searchAllMatchingProduct,
} = require("../controllers/product.controller.js");
// add
router.post("/add", verifyAndAdmin, addProduct);

// update
router.patch("/update/:productId", verifyAndAdmin, updateProduct);

// delete
router.delete("/delete/:id", verifyAndAdmin, deleteProduct);

// get a product
router.get("/findAll", getAllProduct);

// searching all matching product
router.get("/search", searchAllMatchingProduct);

// get a product
router.get("/:productId", getProduct);
module.exports = router;
