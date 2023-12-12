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
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - desc
 *         - price
 *         - quantity
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the product
 *         title:
 *           type: string
 *           description: The title of the product
 *         desc:
 *           type: string
 *           description: The description of the product
 *         img:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs associated with the product
 *         currency:
 *           type: string
 *           enum: ["INR", "USD", "EUR"]
 *           default: "INR"
 *           description: The currency code of the product price
 *         price:
 *           type: number
 *           description: The price of the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of categories associated with the product
 *         size:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of sizes available for the product
 *         color:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of colors available for the product
 *         inStock:
 *           type: boolean
 *           default: true
 *           description: Indicates whether the product is in stock or not
 *       example:
 *         _id: "product_id_here"
 *         title: "Product Title"
 *         desc: "Product Description"
 *         img: ["image_url_1", "image_url_2"]
 *         currency: "INR"
 *         price: 29.99
 *         quantity: 50
 *         category: ["Clothing", "Shoes"]
 *         size: ["S", "M", "L"]
 *         color: ["Red", "Blue", "Green"]
 *         inStock: true
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   patch:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be deleted
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get details of a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items per page
 *       - in: query
 *         name: title
 *         schema:
 *           type: integer
 *           enum: [1]
 *         description: Sort by title in ascending order (1 for true)
 *       - in: query
 *         name: desc
 *         schema:
 *           type: integer
 *           enum: [1]
 *         description: Sort by description in ascending order (1 for true)
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not Found. No products found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products based on a keyword
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: The keyword to search for in product titles and descriptions
 *     responses:
 *       200:
 *         description: Products matching the search keyword retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
