/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 *
 * components:
 *   schemas:
 *     AddCartRequest:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           properties:
 *             productId:
 *               type: string
 *               description: The ID of the product to be added to the cart
 *             quantity:
 *               type: number
 *               description: The quantity of the product to be added to the cart (default: 1)
 *         totalPrice:
 *           type: number
 *           description: The total price of the cart
 *         required:
 *             - productId
 *             - quantity
 *       example:
 *         items:
 *           productId: abc123
 *           quantity: 2
 *         totalPrice: 199.98
 *
 *     AddCartResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the cart
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
 *             required:
 *               - productId
 *               - quantity
 *           description: Array of items in the cart
 *         totalPrice:
 *           type: number
 *           description: The total price of the cart
 *       example:
 *         _id: cart123
 *         userId: user123
 *         items:
 *           - productId: abc123
 *             quantity: 2
 *           - productId: xyz789
 *             quantity: 1
 *         totalPrice: 199.98
 */

/**
 * @swagger
 * /api/cart:
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
 *             $ref: '#/components/schemas/AddCartRequest'
 *     responses:
 *       201:
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddCartResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found with the given ID.
 *       500:
 *         description: Internal server error.
 */
// router.post("/cart", authenticateToken, addCart);

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 *
 * components:
 *   schemas:
 *     UpdateCartRequest:
 *       type: object
 *       properties:
 *         items:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *               description: The ID of the product to be updated in the cart
 *             quantity:
 *               type: integer
 *               description: The updated quantity of the product in the cart
 *           required:
 *             - productId
 *             - quantity
 *       example:
 *         items:
 *           productId: abc123
 *           quantity: 3
 *
 *     UpdateCartResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the cart
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
 *             required:
 *               - productId
 *               - quantity
 *           description: Array of items in the cart
 *         totalPrice:
 *           type: number
 *           description: The total price of the cart
 *       example:
 *         _id: cart123
 *         userId: user123
 *         items:
 *           - productId: abc123
 *             quantity: 3
 *           - productId: xyz789
 *             quantity: 1
 *         totalPrice: 299.97
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         description: The ID of the product to be updated in the cart
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartRequest'
 *     responses:
 *       200:
 *         description: Quantity of the product in the cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCartResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Cart or product not found with the given ID.
 *       500:
 *         description: Internal server error.
 */
// router.put("/cart/:productId", authenticateToken, updateCart);

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
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
 *         productId: abc123
 *         quantity: 2
 *
 *     GetCartResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the cart
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
 *           description: The total price of the cart
 *       example:
 *         _id: cart123
 *         userId: user123
 *         items:
 *           - productId: abc123
 *             quantity: 2
 *           - productId: xyz789
 *             quantity: 1
 *         totalPrice: 199.98
 */

// get a single cart

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the shopping cart for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartResponse'
 *       404:
 *         description: Not Found. Cart not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/cart", authenticateToken, getCart);

// get all cart

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all shopping carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetCartResponse'
 *       404:
 *         description: Not Found. No carts found.
 *       500:
 *         description: Internal server error.
 */
// router.get("/carts", getAllCart);
