/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to shopping cart
 *
 * components:
 *   schemas:
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
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product in the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the cart
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
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
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

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: object
 *                 required:
 *                   - productId
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: The ID of the product to be added to the cart
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the product to be added (default is 1)
 *             example:
 *               items:
 *                 productId: "product_id_here"
 *                 quantity: 2
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
 *         description: Not Found. Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product in the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: object
 *                 required:
 *                   - quantity
 *                 properties:
 *                   quantity:
 *                     type: integer
 *                     description: The new quantity of the product in the cart
 *             example:
 *               items:
 *                 quantity: 3
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
