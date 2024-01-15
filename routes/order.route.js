const {
  verifyAndAuthorize,
  verifyAndAdmin,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
} = require("../controllers/order.controller.js");
// add
router.post("/", verifyAndAuthorize, addOrder);

// update
router.patch("/:orderId", verifyAndAdmin, updateOrder);

// delete
router.delete("/:orderId", verifyAndAdmin, deleteOrder);

// get a user cart
router.get("/", verifyAndAuthorize, getAllOrder);

// get  order by userid
router.get("/:orderId", verifyAndAuthorize, getOrder);

module.exports = router;
