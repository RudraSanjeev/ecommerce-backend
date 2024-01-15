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

// update
router.patch("/:addressId", verifyAndAuthorize, updateAddress);

// delete
router.delete("/:addressId", verifyAndAuthorize, deleteAddress);

// getAddress all
router.get("/", verifyAndAuthorize, getAllAddressOfUser);

// getAddress
router.get("/:addressId", verifyAndAuthorize, getAddress);
module.exports = router;
