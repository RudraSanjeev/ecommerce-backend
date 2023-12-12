/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: token
 *       description: Use the "Bearer" authentication scheme. Provide the token in the format "Bearer [jwt_token]".
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operations related to orders
 *
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product in the order
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the order
 *       required:
 *         - productId
 *         - quantity
 *       example:
 *          paymentMode: "Credit Card"
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *         cart:
 *           type: string
 *           description: The ID of the associated cart
 *         total:
 *           type: number
 *           description: The total price of the order
 *         paymentToken:
 *           type: string
 *           description: The payment token for the order
 *         paymentStatus:
 *           type: string
 *           description: The payment status of the order
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: Array of items in the order
 *       example:
 *         _id: "order_id_here"
 *         userId: "user_id_here"
 *         cart: "cart_id_here"
 *         total: 20.00
 *         paymentToken: "payment_token_here"
 *         paymentStatus: "success"
 *         items:
 *           - productId: "product_id_here"
 *             quantity: 2
 *
 *   parameters:
 *     orderId:
 *       in: path
 *       name: orderId
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the order
 *
 *   responses:
 *     GetOrderResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *         cart:
 *           type: string
 *           description: The ID of the associated cart
 *         total:
 *           type: number
 *           description: The total price of the order
 *         paymentToken:
 *           type: string
 *           description: The payment token for the order
 *         paymentStatus:
 *           type: string
 *           description: The payment status of the order
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: Array of items in the order
 *       example:
 *         _id: "order_id_here"
 *         userId: "user_id_here"
 *         cart: "cart_id_here"
 *         total: 20.00
 *         paymentToken: "payment_token_here"
 *         paymentStatus: "success"
 *         items:
 *           - productId: "product_id_here"
 *             quantity: 2
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Cart, user, or address not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/{orderId}:
 *   patch:
 *     summary: Update an existing order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Order not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Order not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not Found. No orders found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Order not found.
 *       500:
 *         description: Internal server error.
 */
