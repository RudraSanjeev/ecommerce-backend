const { verifyAndAdmin } = require("../middlewares/jwt/verifyToken");
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
router.put("/update/:productId", verifyAndAdmin, updateProduct);

// delete
router.delete("/delete/:id", verifyAndAdmin, deleteProduct);

// get a product
router.get("/:id", getProduct);

// get a product
router.get("/all", getAllProduct);

// searching all matching product
router.get("/search", searchAllMatchingProduct);
