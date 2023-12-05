const {
  verifyToken,
  verifyAndAuthorize,
  verifyAndAdmin,
} = require("../middlewares/jwt/verifyToken.js");
const router = require("express").Router();
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getUserOrderByOrderId,
  getUserOrderByUserId,
  getAllOrder,
} = require("../controllers/order.controller.js");
// add
router.post("/add", verifyAndAuthorize, addOrder);

// update
router.patch("/update/:orderId", verifyAndAdmin, updateOrder);

// delete
router.delete("/delete/:cartId", verifyAndAdmin, deleteOrder);

// get  order by userid
router.get("/:orderId", verifyAndAuthorize, getUserOrderByOrderId);

// get all cart
router.get("/user/:userId", verifyAndAuthorize, getUserOrderByUserId);

// get a user cart
router.get("/all/", verifyAndAdmin, getAllOrder);

module.exports = router;
