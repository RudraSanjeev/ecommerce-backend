#### E-commerce Backend:

- please add the following in the .env file to run the app

```.env
MONGO_URI = "mongodb://localhost:27017/ecommerce"

AES_SEC = "CRYPTOJS_SEC"

# access token
JWT_TOKEN_SEC = "ACCESS_TOKEN_SEC"
JWT_TOKEN_EXP = "1h"



# refresh token
JWT_REFRESH_TOKEN_SEC = "REFRESH_TOKEN_SEC"
JWT_REFRESH_TOKEN_EXP = '1h'


# reset token
JWT_RESET_TOKEN_SEC = "PASSWORD_RESET_TOKEN"
JWT_RESET_TOKEN_EXP = "10m"

# mailgun
MAILGUN_API_KEY = "ADD_YOUR_MAILGUN_API_KEY"
MAILGUN_DOMAIN = "ADD_YOUR_MAILGUN_DOMAIN"

# nodemailer
GMAIL_USER = "sanjeevsingh8feb@gmail.com"
GMAIL_PASSWORD = "GMAIL_PASSWORD"

# cloudinary
CLOUDINARY_CLOUD_NAME = "CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY = "CLOUDINARY_API_KEY"
CLOUDINARY_API_SEC = "CLOUDINARY_API_KEY_SEC"

# stripe sec

STRIPE_SEC  = "STRIPE_KEY"
```
