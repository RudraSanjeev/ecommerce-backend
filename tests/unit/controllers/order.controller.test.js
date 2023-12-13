const dotenv = require("dotenv");
dotenv.config();
const { addOrder } = require("../../../controllers/order.controller.js");
const Order = require("../../../models/order.model.js");
const User = require("../../../models/user.model.js");
const Cart = require("../../../models/cart.model.js");
const Address = require("../../../models/address.model.js");
const Product = require("../../../models/product.model.js");
const stripe = require("stripe")(process.env.STRIPE_SEC);
// console.log(process.env.STRIPE_SEC);
const {
  sendNotification,
} = require("../../../middlewares/nodemailer/sendMail.js");

jest.mock("../../../models/order.model.js");
jest.mock("../../../models/user.model.js");
jest.mock("../../../models/cart.model.js");
jest.mock("../../../models/address.model.js");
jest.mock("../../../models/product.model.js");
jest.mock("stripe")(process.env.STRIPE_SEC);
jest.mock("../../../middlewares/nodemailer/sendMail.js");

describe("addOrder function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new order successfully", async () => {
    const req = {
      body: {
        // Add valid order data here
        paymentMode: "Cash on delivery",
      },
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addOrderSchemaMock = {
      validate: jest.fn().mockReturnValue({
        error: null,
      }),
    };

    const userMock = {
      _id: "6570d8a32fe8748211793a2f",
      email: "user@example.com",
      // Add other user fields based on your schema
    };

    const cartMock = {
      _id: "6570d8a32fe8748211793a2f",
      userId: "6570d8a32fe8748211793a2f",
      items: [
        {
          productId: {
            _id: "6570d8a32fe8748211793a2f",
            currency: "USD",
            // Add other product fields based on your schema
          },
          quantity: 2,
        },
      ],
      totalPrice: 100,
      // Add other cart fields based on your schema
    };

    const addressMock = {
      userId: "6570d8a32fe8748211793a2f",
      // Add other address fields based on your schema
    };

    const paymentIntentMock = {
      id: "6570d8a32fe8748211793a2f",
      client_secret: "6570d8a32fe8748211793a2f",
      // Add other paymentIntent fields based on your schema
    };

    const savedOrderMock = {
      _id: "6570d8a32fe8748211793a2f",
      userId: "6570d8a32fe8748211793a2f",
      cart: "6570d8a32fe8748211793a2f",
      total: 100,
      paymentToken: "6570d8a32fe8748211793a2f",
      paymentStatus: "success",
      // Add other order fields based on your schema
    };

    addOrderSchemaMock.validate.mockReturnValue({
      error: null,
    });
    User.findById.mockResolvedValue(userMock);
    Cart.findOne.mockResolvedValue(cartMock);
    Address.findOne.mockResolvedValue(addressMock);
    stripe.paymentIntents.create.mockResolvedValue(paymentIntentMock);
    Order.mockReturnValue({
      save: jest.fn().mockResolvedValue(savedOrderMock),
    });

    await addOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      newOrder: savedOrderMock,
      cart: cartMock,
      clientSecret: "clientSecret",
    });
    expect(Order).toHaveBeenCalledWith({
      ...req.body,
      userId: "userId",
      cart: "cartId",
      total: 100,
      paymentToken: "6570d8a32fe8748211793a2f",
      paymentStatus: "success",
    });
    expect(Product.findById).toHaveBeenCalledWith("6570d8a32fe8748211793a2f");
    expect(Product.save).toHaveBeenCalled();
    expect(Cart.findByIdAndDelete).toHaveBeenCalledWith(
      "6570d8a32fe8748211793a2f"
    );
    expect(sendNotification).toHaveBeenCalledWith(
      process.env.GMAIL_USER,
      userMock.email,
      "Order confirmed !",
      "You have successfully placed an order !"
    );
  });
  it("should add a new order successfully", async () => {
    const req = {
      body: {
        // Add valid order data here
        paymentMode: "Cash on delivery",
      },
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addOrderSchemaMock = {
      validate: jest.fn().mockReturnValue({
        error: null,
      }),
    };

    const userMock = {
      _id: "6570d8a32fe8748211793a2f",
      email: "user@example.com",
      // Add other user fields based on your schema
    };

    const cartMock = {
      _id: "6570d8a32fe8748211793a2f",
      userId: "6570d8a32fe8748211793a2f",
      items: [
        {
          productId: {
            _id: "6570d8a32fe8748211793a2f",
            currency: "USD",
            // Add other product fields based on your schema
          },
          quantity: 2,
        },
      ],
      totalPrice: 100,
      // Add other cart fields based on your schema
    };

    const addressMock = {
      userId: "6570d8a32fe8748211793a2f",
      // Add other address fields based on your schema
    };

    const paymentIntentMock = {
      id: "6570d8a32fe8748211793a2f",
      client_secret: "6570d8a32fe8748211793a2f",
      // Add other paymentIntent fields based on your schema
    };

    const savedOrderMock = {
      _id: "6570d8a32fe8748211793a2f",
      userId: "6570d8a32fe8748211793a2f",
      cart: "6570d8a32fe8748211793a2f",
      total: 200,
      paymentToken: "6570d8a32fe8748211793a2f",
      paymentStatus: "success",
      // Add other order fields based on your schema
    };

    // Mock the 'stripe' module and 'paymentIntents' property
    jest.mock("stripe");
    const stripe = require("stripe");
    stripe.paymentIntents = {
      create: jest.fn().mockResolvedValue(paymentIntentMock),
    };

    // Mock other dependencies
    addOrderSchemaMock.validate.mockReturnValue({
      error: null,
    });
    User.findById.mockResolvedValue(userMock);
    Cart.findOne.mockResolvedValue(cartMock);
    Address.findOne.mockResolvedValue(addressMock);
    Order.mockReturnValue({
      save: jest.fn().mockResolvedValue(savedOrderMock),
    });

    await addOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      // newOrder: savedOrderMock,
      // cart: cartMock,
      // clientSecret:
      //   "pk_test_51N8gzOSIpaoty1me02OgdOgBMW2jXp90HiPuosxjmubXif4eLV7ptSSFxUQy5diqJ2rC7kHNo7GpYBKc09wPCkW300d2rfKo1S", // Use the actual client_secret value
      cart: {
        _id: "6570d8a32fe8748211793a2f",
        items: [
          {
            productId: { _id: "6570d8a32fe8748211793a2f", currency: "USD" },
            quantity: 2,
          },
        ],
        totalPrice: 200,
        userId: "6570d8a32fe8748211793a2f",
      },
      clientSecret:
        "pk_test_51N8gzOSIpaoty1me02OgdOgBMW2jXp90HiPuosxjmubXif4eLV7ptSSFxUQy5diqJ2rC7kHNo7GpYBKc09wPCkW300d2rfKo1S",
      newOrder: {
        _id: "6570d8a32fe8748211793a2f",
        cart: "6570d8a32fe8748211793a2f",
        paymentStatus: "success",
        paymentToken: "6570d8a32fe8748211793a2f",
        total: 200,
        userId: "6570d8a32fe8748211793a2f",
      },
    });
    expect(Order).toHaveBeenCalledWith({
      ...req.body,
      userId: "userId",
      cart: "cartId",
      total: 100,
      paymentToken: "6570d8a32fe8748211793a2f",
      paymentStatus: "success",
    });
    expect(Product.findById).toHaveBeenCalledWith("6570d8a32fe8748211793a2f");
    expect(Product.save).toHaveBeenCalled();
    expect(Cart.findByIdAndDelete).toHaveBeenCalledWith(
      "6570d8a32fe8748211793a2f"
    );
    expect(sendNotification).toHaveBeenCalledWith(
      process.env.GMAIL_USER,
      userMock.email,
      "Order confirmed !",
      "You have successfully placed an order !"
    );
  });

  it("should handle addOrder error with validation error", async () => {
    const req = {
      body: {
        // Invalid order data to trigger validation error
      },
      user: {
        _id: "userId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const addOrderSchemaMock = {
      validate: jest.fn().mockReturnValue({
        error: validationError,
      }),
    };

    addOrderSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await addOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"paymentMode" is required');
  });

  it("should handle addOrder error with internal server error", async () => {
    const req = {
      body: {
        // Add valid order data here
        paymentMode: "Cash on delivery",
      },
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const addOrderSchemaMock = {
      validate: jest.fn().mockReturnValue({
        error: null,
      }),
    };

    const addOrderError = new Error("Internal server error !");
    addOrderError.message = "Internal server error !";

    Order.mockReturnValue({
      save: jest.fn().mockRejectedValue(addOrderError),
    });

    addOrderSchemaMock.validate.mockReturnValue({
      error: null,
    });

    await addOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error !");
  });

  // Add other test cases for error scenarios (e.g., cart not found, address not found, paymentIntent not created)
});
