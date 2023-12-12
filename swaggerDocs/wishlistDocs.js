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
 *   name: Wishlist
 *   description: Operations related to user wishlists
 *
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         items:
 *           type: object
 *         productId:
 *           type: string
 *           description: The ID of the product in the wishlist
 *       required:
 *         - productId
 *       example:
 *         productId: "657306307060b5c8f0ee1bf2"
 *
 *     Wishlist:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user owning the wishlist
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistItem'
 *           description: Array of items in the wishlist
 *       example:
 *         userId: "user_id_here"
 *         items:
 *           - productId: "657306307060b5c8f0ee1bf2"
 *           - productId: "657306307060b5c8f0ee1bf2"
 *
 *   parameters:
 *     productId:
 *       in: path
 *       name: productId
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the product in the wishlist
 *
 *   responses:
 *     GetWishlistResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user owning the wishlist
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistItem'
 *           description: Array of items in the wishlist
 *       example:
 *         userId: "user_id_here"
 *         items:
 *           - productId: "657306307060b5c8f0ee1bf2"
 *           - productId: "657306307060b5c8f0ee1bf2"
 *
 *     GetWishlistsResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/GetWishlistResponse'
 *       description: Array of wishlists for the authenticated user
 */

/**
 * @swagger
 * /api/wishlists:
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
 *             type: object
 *             properties:
 *               items:
 *                 type: object
 *                 items:
 *                   $ref: '#/components/schemas/WishlistItem'
 *           example:
 *             items:
 *               - productId: "657306307060b5c8f0ee1bf2"
 *     responses:
 *       201:
 *         description: Product added to the wishlist successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found or wishlist not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/wishlists/{productId}:
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     responses:
 *       200:
 *         description: Product removed from the wishlist successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product or wishlist not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.delete("/:productId", verifyAndAuthorize, deleteWishlist);

/**
 * @swagger
 * /api/wishlists:
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
// router.get("/", verifyAndAuthorize, getWishList);

// module.exports = router;
