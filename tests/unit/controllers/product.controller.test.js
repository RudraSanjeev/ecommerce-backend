const { addProduct } = require("../../../controllers/product.controller.js");
const Product = require("../../../models/product.model.js");
const path = require("path");

jest.mock("../../../models/product.model.js");
jest.mock("../../../utils/storage.js");

describe("Add Product Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully add a product", async () => {
    const req = {
      body: {
        title: "Nike Shoes",
        desc: "All new air collection of fade slim jeans limited edition",
        currency: "INR",
        price: 6000,
        quantity: 3,
        inStock: false,
        img: ["jclsjfjs"],
        // Add other required fields as needed
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    // const imagePath = "someImagePath";
    // const imageUrlMock = jest.fn().mockResolvedValue("someImageUrl");

    Product.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "someProductId",
        title: "Nike Shoes",
        desc: "All new air collection of fade slim jeans limited edition",
        currency: "INR",
        price: 6000,
        quantity: 3,
        inStock: false,
        img: ["jclsjfjs"],
      }),
    }));

    addProductSchemaMock.validate.mockReturnValue({ error: null });
    // imageUrl.__Rewire__("imageUrl", imageUrlMock);

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: "someProductId",
      title: "Nike Shoes",
      desc: "All new air collection of fade slim jeans limited edition",
      currency: "INR",
      price: 6000,
      quantity: 3,
      inStock: false,
      img: ["jclsjfjs"],
    });
    expect(Product).toHaveBeenCalledWith({
      title: "Nike Shoes",
      desc: "All new air collection of fade slim jeans limited edition",
      currency: "INR",
      price: 6000,
      quantity: 3,
      inStock: false,
      img: ["jclsjfjs"],
    });
    // expect(imageUrlMock).toHaveBeenCalledWith(imagePath);
  });

  it("should handle add product error with invalid request body", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const addProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    addProductSchemaMock.validate.mockReturnValue({ error: validationError });

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"title" is required');
    expect(Product).not.toHaveBeenCalled();
    // expect(imageUrl.__get__("imageUrl")).not.toHaveBeenCalled();
  });

  it("should handle add product error with internal server error", async () => {
    const req = {
      body: {
        title: "Nike Shoes",
        desc: "All new air collection of fade slim jeans limited edition",
        currency: "INR",
        price: 6000,
        quantity: 3,
        inStock: false,
        img: ["jclsjfjs"],
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const addProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const saveMock = jest.fn(() => {
      throw new Error("Simulated error");
    });
    Product.mockImplementation(() => ({ save: saveMock }));

    addProductSchemaMock.validate.mockReturnValue({ error: null });

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Simulated error");
    // expect(imageUrl.__get__("imageUrl")).not.toHaveBeenCalled();
  });
});
