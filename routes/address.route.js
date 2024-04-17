const { verifyAndAuthorize } = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addAddress,
  updateAddress,
  updateCurrentAddress,
  deleteAddress,
  getAddress,
  getAllAddressOfUser,
  getCurrentAddress,
} = require("../controllers/address.controller.js");

// add
router.post("/", verifyAndAuthorize, addAddress);
// update
router.patch("/:addressId", verifyAndAuthorize, updateAddress);
// update current address
router.patch("/current/:addressId", verifyAndAuthorize, updateCurrentAddress);

// delete
router.delete("/:addressId", verifyAndAuthorize, deleteAddress);

// getAddress all
router.get("/", verifyAndAuthorize, getAllAddressOfUser);

// getCurrentAddress
router.get("/current", verifyAndAuthorize, getCurrentAddress);
// getAddress
router.get("/:addressId", verifyAndAuthorize, getAddress);
module.exports = router;
