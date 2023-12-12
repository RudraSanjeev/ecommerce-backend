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
 *   name: Cart
 *   description: Operations related to shopping cart
 *
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product in the cart
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *       required:
 *         - productId
 *         - quantity
 *       example:
 *         productId: "product_id_here"
 *         quantity: 2
 *
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *         - totalPrice
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the cart
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the cart
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *           description: Array of items in the cart
 *         totalPrice:
 *           type: number
 *           description: The total price of items in the cart
 *       example:
 *         _id: "cart_id_here"
 *         userId: "user_id_here"
 *         items:
 *           - productId: "product_id_here"
 *             quantity: 2
 *         totalPrice: 20.00
 *
 *   parameters:
 *     productId:
 *       in: path
 *       name: productId
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the product in the cart
 *
 *   responses:
 *     GetCartResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the cart
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the cart
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *           description: Array of items in the cart
 *         totalPrice:
 *           type: number
 *           description: The total price of items in the cart
 *       example:
 *         _id: "cart_id_here"
 *         userId: "user_id_here"
 *         items:
 *           - productId: "product_id_here"
 *             quantity: 2
 *         totalPrice: 20.00
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found or cart not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/carts/{productId}:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Cart or product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/carts/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product or cart not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/carts/all:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Not Found. No carts found.
 *       500:
 *         description: Internal server error.
 */
