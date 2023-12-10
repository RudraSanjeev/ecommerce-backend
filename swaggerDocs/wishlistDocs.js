/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operations related to user wishlist
 *
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the wishlist
 *         userId:
 *           type: string
 *           description: The ID of the user owning the wishlist
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product in the wishlist
 *             required:
 *               - productId
 *           description: The list of products in the wishlist
 *       required:
 *         - userId
 *         - items
 *       example:
 *         _id: wishlist123
 *         userId: user123
 *         items:
 *           - productId: product123
 *           - productId: product456
 *
 *     GetWishlistResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the wishlist
 *         userId:
 *           type: string
 *           description: The ID of the user owning the wishlist
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product in the wishlist
 *             required:
 *               - productId
 *           description: The list of products in the wishlist
 *       example:
 *         _id: wishlist123
 *         userId: user123
 *         items:
 *           - productId: product123
 *           - productId: product456
 *
 *   parameters:
 *     wishlistId:
 *       in: path
 *       name: wishlistId
 *       required: true
 *       description: The ID of the wishlist to be retrieved
 *       schema:
 *         type: string
 *
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wishlist'
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product or wishlist not found.
 *       500:
 *         description: Internal server error.
 */
// router.post("/wishlist", authenticateToken, addWishList);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWishlistResponse'
 *       404:
 *         description: Not Found. Wishlist not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/wishlist", authenticateToken, getWishList);

/**
 * @swagger
 * /api/wishlist/{wishlistId}:
 *   get:
 *     summary: Get a specific wishlist for the authenticated user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/wishlistId'
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWishlistResponse'
 *       404:
 *         description: Not Found. Wishlist not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/wishlist/{wishlistId}", authenticateToken, getWishList);
