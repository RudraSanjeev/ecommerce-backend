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
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phoneNumber
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *         phoneNumber:
 *           type: string
 *           minLength: 10
 *           maxLength: 10
 *           description: The user's phone number
 *         role:
 *           type: string
 *           enum: ["admin", "buyer"]
 *           description: The user's role
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         password: SecurePassword123!
 *         phoneNumber: "1234567890"
 *         role: admin
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       500:
 *         description: Internal server error.
 */

// router.post("/register", register);
// login
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *       example:
 *         email: john.doe@example.com
 *         password: SecurePassword123!
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               phoneNumber: 1234567890
 *               role: buyer
 *               refreshToken: [refresh token]
 *               token: [access token]
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       401:
 *         description: Unauthorized. Invalid email or password.
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal server error.
 */
// router.post("/login", login);

// logout
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the logout status
 *       example:
 *         message: User has been logged out successfully!
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       401:
 *         description: Unauthorized. Access token is not provided.
 *       500:
 *         description: Internal server error.
 */
// router.post("/logout", logout);

// reset-password
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *       example:
 *         email: john.doe@example.com
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating that the reset mail has been sent
 *       example:
 *         message: Reset mail has been sent to your email
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Reset mail sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal server error.
 */

// update
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     UpdatePasswordRequest:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: The new password
 *       example:
 *         password: NewSecurePassword123!
 *
 *     UpdatePasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating that the password has been updated successfully
 *       example:
 *         message: Password updated successfully!
 */

/**
 * @swagger
 * /api/auth/update-password/{resetToken}:
 *   post:
 *     summary: Update user password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token received in the reset password email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordRequest'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdatePasswordResponse'
 *       400:
 *         description: Bad request. Validation error or internal server error.
 *       401:
 *         description: Unauthorized. Token not found in params.
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal server error.
 */
// router.post("/update-password/:resetToken", updatePassword);

// refreshToken
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and authentication
 *
 * components:
 *   schemas:
 *     RefreshAccessTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The refresh token
 *       example:
 *         refreshToken: [refresh token]

 *     RefreshAccessTokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The new access token
 *       example:
 *         accessToken: [new access token]
 */

/**
 * @swagger
 * /api/auth/refresh-access-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshAccessTokenRequest'
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshAccessTokenResponse'
 *       401:
 *         description: Unauthorized. Refresh token is missing or access token is missing.
 *       500:
 *         description: Internal server error.
 */
// router.post("/refresh-access-token", refresAccessToken);
