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
 *   name: Address
 *   description: Operations related to user addresses
 *
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the address
 *         houseNo:
 *           type: string
 *           description: The house number of the address
 *         landmark:
 *           type: string
 *           description: The landmark near the address
 *         city:
 *           type: string
 *           description: The city of the address
 *         pincode:
 *           type: string
 *           description: The pincode of the address
 *         state:
 *           type: string
 *           description: The state of the address
 *         country:
 *           type: string
 *           description: The country of the address
 *       required:
 *         - houseNo
 *         - landmark
 *         - city
 *         - pincode
 *         - state
 *         - country
 *       example:
 *         houseNo: "123"
 *         landmark: "Near Park of phase v"
 *         city: "City"
 *         pincode: "123456"
 *         state: "State"
 *         country: "Country"
 *
 *     GetAddressResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the address
 *         houseNo:
 *           type: string
 *           description: The house number of the address
 *         landmark:
 *           type: string
 *           description: The landmark near the address
 *         city:
 *           type: string
 *           description: The city of the address
 *         pincode:
 *           type: string
 *           description: The pincode of the address
 *         state:
 *           type: string
 *           description: The state of the address
 *         country:
 *           type: string
 *           description: The country of the address
 *       example:
 *         _id: address123
 *         houseNo: "123"
 *         landmark: "Near Park of phase v"
 *         city: "City"
 *         pincode: "123456"
 *         state: "State"
 *         country: "Country"
 *
 *     GetAddressesResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/GetAddressResponse'
 *       description: Array of user addresses
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Add a new address for the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAddressResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */
router.post("/address", authenticateToken, addAddress);

// update
/**
 * @swagger
 * /api/address/{addressId}:
 *   patch:
 *     summary: Update the address for the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAddressResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. Address not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.put("/address", authenticateToken, updateAddress);

/**
 * @swagger
 * /api/address/{addressId}:
 *   delete:
 *     summary: Delete the address for the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Not Found. Address not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.delete("/address", authenticateToken, deleteAddress);

/**
 * @swagger
 * /api/address/{addressId}:
 *   get:
 *     summary: Get the address for the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the address
 *     responses:
 *       200:
 *         description: Address retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAddressResponse'
 *       404:
 *         description: Not Found. Address not found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/address", authenticateToken, getAddress);

/**
 * @swagger
 * /api/address/all:
 *   get:
 *     summary: Get all addresses for the authenticated user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAddressesResponse'
 *       404:
 *         description: Not Found. No addresses found for the authenticated user.
 *       500:
 *         description: Internal server error.
 */
// router.get("/addresses", authenticateToken, getAllAddressOfUser);
