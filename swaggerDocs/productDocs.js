/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     AddProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         quantity:
 *          type: number
 *          description: The quantity of the product
 *       example:
 *         name: Nike Shoes
 *         description: High-performance athletic shoes
 *         price: 99.99
 *         quantity: 2
 *
 *     AddProductResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         img:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the product
 *         quantity:
 *          type: number
 *          description: The quantity of product
 *       example:
 *         _id: abc123
 *         name: Nike Shoes
 *         description: High-performance athletic shoes
 *         price: 99.99
 *         img: ['http://example.com/nikeShoesImage1.jpg']
 *         quantity: 2
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProductRequest'
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddProductResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.post("/products", addProduct);

// update
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     UpdateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The updated name of the product
 *         description:
 *           type: string
 *           description: The updated description of the product
 *         price:
 *           type: number
 *           description: The updated price of the product
 *       example:
 *         name: Updated Nike Shoes
 *         description: Updated high-performance athletic shoes
 *         price: 109.99
 *
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the updated product
 *         name:
 *           type: string
 *           description: The updated name of the product
 *         description:
 *           type: string
 *           description: The updated description of the product
 *         price:
 *           type: number
 *           description: The updated price of the product
 *         img:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the updated product
 *       example:
 *         _id: abc123
 *         name: Updated Nike Shoes
 *         description: Updated high-performance athletic shoes
 *         price: 109.99
 *         img: ['http://example.com/updatedNikeShoesImage1.jpg']
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   patch:
 *     summary: Update a product
 *     tags: [Product]
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
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProductResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.put("/products/:productId", updateProduct);

// delete
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     DeleteProductRequest:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to be deleted
 *       example:
 *         productId: abc123
 *
 *     DeleteProductResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating that the product has been deleted successfully
 *       example:
 *         message: Product has been deleted successfully !
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.delete("/products/:productId", deleteProduct);

// getProduct
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     GetProductRequest:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to be retrieved
 *       example:
 *         productId: abc123
 *
 *     GetProductResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         img:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the product
 *       example:
 *         _id: abc123
 *         name: Nike Shoes
 *         description: High-performance athletic shoes
 *         price: 99.99
 *         img: ['http://example.com/nikeShoesImage1.jpg']
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product details
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be retrieved
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Product not found.
 *       500:
 *         description: Internal server error.
 */
// router.get("/products/:productId", getProduct);

// getAllProduct
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     GetAllProductRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: The page number for pagination (default: 1)
 *         limit:
 *           type: integer
 *           description: The number of items per page (default: 2)
 *         title:
 *           type: integer
 *           description: Sort by title (1 for ascending, -1 for descending)
 *         desc:
 *           type: integer
 *           description: Sort by description (1 for ascending, -1 for descending)
 *       example:
 *         page: 1
 *         limit: 2
 *         title: 1
 *         desc: -1
 *
 *     GetAllProductResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: The auto-generated ID of the product
 *           name:
 *             type: string
 *             description: The name of the product
 *           description:
 *             type: string
 *             description: The description of the product
 *           price:
 *             type: number
 *             description: The price of the product
 *           img:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of image URLs for the product
 *       example:
 *         - _id: abc123
 *           name: Nike Shoes
 *           description: High-performance athletic shoes
 *           price: 99.99
 *           img: ['http://example.com/nikeShoesImage1.jpg']
 *         - _id: xyz789
 *           name: Adidas Sneakers
 *           description: Comfortable casual sneakers
 *           price: 79.99
 *           img: ['http://example.com/adidasSneakersImage1.jpg']
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page (default: 2)
 *       - in: query
 *         name: title
 *         schema:
 *           type: integer
 *         description: Sort by title (1 for ascending, -1 for descending)
 *       - in: query
 *         name: desc
 *         schema:
 *           type: integer
 *         description: Sort by description (1 for ascending, -1 for descending)
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllProductResponse'
 *       404:
 *         description: Not Found. Products not found.
 *       500:
 *         description: Internal server error.
 */
// router.get("/products", getAllProduct);

// search - all product
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operations related to products
 *
 * components:
 *   schemas:
 *     SearchAllMatchingProductRequest:
 *       type: object
 *       properties:
 *         keyword:
 *           type: string
 *           description: The keyword for searching products
 *       example:
 *         keyword: shoes
 *
 *     SearchAllMatchingProductResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: The auto-generated ID of the product
 *           name:
 *             type: string
 *             description: The name of the product
 *           description:
 *             type: string
 *             description: The description of the product
 *           price:
 *             type: number
 *             description: The price of the product
 *           img:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of image URLs for the product
 *       example:
 *         - _id: abc123
 *           name: Nike Running Shoes
 *           description: High-performance running shoes
 *           price: 129.99
 *           img: ['http://example.com/nikeRunningShoesImage1.jpg']
 *         - _id: xyz789
 *           name: Adidas Basketball Shoes
 *           description: Premium basketball shoes
 *           price: 89.99
 *           img: ['http://example.com/adidasBasketballShoesImage1.jpg']
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by keyword
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: The keyword for searching products
 *         required: true
 *     responses:
 *       200:
 *         description: Products matching the keyword retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchAllMatchingProductResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
// router.get("/products/search", searchAllMatchingProduct);
