const { addCart } = require("../../../controllers/cart.controller.js");
const Cart = require("../../../models/cart.model.js");
const Product = require("../../../models/product.model.js");

jest.mock("../../../models/cart.model.js");
jest.mock("../../../models/product.model.js");

describe("addCart function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new item to the cart successfully", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
      body: {
        items: {
          productId: "657306307060b5c8f0ee1bf4",
          quantity: 2,
        },
        totalPrice: 10000,
        // Include all fields based on your product schema
        // Add other fields based on your schema
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addCartSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const productMock = {
      _id: "657306307060b5c8f0ee1bf4",
      title: "Product Title",
      desc: "Product Description",
      img: ["image1.jpg", "image2.jpg"],
      currency: "INR",
      price: 5000,
      quantity: 10,
      category: ["Category1", "Category2"],
      size: ["S", "M", "L"],
      color: ["Red", "Blue"],
      inStock: true,
      // Add other fields based on your schema
    };

    const cartMock = {
      userId: "657306307060b5c8f0ee1bf2",
      items: [{ productId: "657306307060b5c8f0ee1bf4", quantity: 2 }],
      totalPrice: 100000,
      save: jest.fn().mockResolvedValue(),
    };

    addCartSchemaMock.validate.mockReturnValue({ error: null });
    Product.findById.mockResolvedValue(productMock);
    Cart.findOne.mockResolvedValue(null); // Assuming cart doesn't exist initially
    Cart.mockReturnValueOnce(cartMock);

    await addCart(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    // Add more assertions based on the expected behavior of the function
  });

  // Add more test cases for validation errors, product not found, insufficient quantity, etc.
});
