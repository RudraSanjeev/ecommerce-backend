/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operations related to user orders
 *
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user placing the order
 *         cart:
 *           type: string
 *           description: The ID of the cart associated with the order
 *         total:
 *           type: number
 *           description: The total price of the order
 *         paymentToken:
 *           type: string
 *           description: The payment token associated with the order
 *         paymentStatus:
 *           type: string
 *           enum: [success, pending, failed]
 *           description: The payment status of the order
 *       required:
 *         - userId
 *         - cart
 *         - total
 *         - paymentToken
 *         - paymentStatus
 *       example:
 *         _id: order123
 *         userId: user123
 *         cart: cart123
 *         total: 100.0
 *         paymentToken: stripeToken123
 *         paymentStatus: success
 *
 *     UpdatedOrder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the updated order
 *         userId:
 *           type: string
 *           description: The ID of the user placing the updated order
 *         cart:
 *           type: string
 *           description: The ID of the cart associated with the updated order
 *         total:
 *           type: number
 *           description: The updated total price of the order
 *         paymentToken:
 *           type: string
 *           description: The updated payment token associated with the order
 *         paymentStatus:
 *           type: string
 *           enum: [success, pending, failed]
 *           description: The updated payment status of the order
 *       example:
 *         _id: order123
 *         userId: user123
 *         cart: cart123
 *         total: 120.0
 *         paymentToken: stripeToken456
 *         paymentStatus: pending
 *
 *     GetOrderResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user placing the order
 *         cart:
 *           type: string
 *           description: The ID of the cart associated with the order
 *         total:
 *           type: number
 *           description: The total price of the order
 *         paymentToken:
 *           type: string
 *           description: The payment token associated with the order
 *         paymentStatus:
 *           type: string
 *           enum: [success, pending, failed]
 *           description: The payment status of the order
 *       example:
 *         _id: order123
 *         userId: user123
 *         cart: cart123
 *         total: 100.0
 *         paymentToken: stripeToken123
 *         paymentStatus: success
 *
 *     GetOrdersResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/GetOrderResponse'
 *       description: Array of user orders
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Place a new order for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrderResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. No items in the cart or address not added.
 *       500:
 *         description: Internal server error.
 */
// router.post("/order", authenticateToken, addOrder);

/**
 * @swagger
 * /api/order/{orderId}:
 *   patch:
 *     summary: Update the order for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatedOrder'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.put("/order/{orderId}", authenticateToken, updateOrder);

/**
 * @swagger
 * /api/order/{orderId}:
 *   delete:
 *     summary: Delete the order for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.delete("/order/{orderId}", authenticateToken, deleteOrder);

/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     summary: Get a specific order for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrderResponse'
 *       404:
 *         description: Not Found. Order not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
router.get("/order/{orderId}", authenticateToken, getUserOrderByOrderId);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       404:
 *         description: Not Found. No orders found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/orders", authenticateToken, getUserOrderByUserId);

/**
 * @swagger
 * /api/all-orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
// router.get("/all-orders", authenticateAdmin, getAllOrder);
