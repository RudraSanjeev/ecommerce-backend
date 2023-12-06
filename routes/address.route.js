const { verifyAndAuthorize } = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAllAddressOfUser,
} = require("../controllers/address.controller.js");

// add
router.post("/", verifyAndAuthorize, addAddress);

// delete
router.patch("/:productId", verifyAndAuthorize, updateAddress);

// get  address by userid
router.delete("/", verifyAndAuthorize, deleteAddress);

// getAddress
router.get("/", verifyAndAuthorize, getAddress);

// getAddress all
router.get("/all", verifyAndAuthorize, getAllAddressOfUser);
module.exports = router;
