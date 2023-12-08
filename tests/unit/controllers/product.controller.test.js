const path = require("path");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  searchAllMatchingProduct,
} = require("../../../controllers/product.controller.js");
const Product = require("../../../models/product.model.js");
const imageUrl = require("../../../utils/storage.js");

jest.mock("../../../models/product.model.js");
jest.mock("../../../utils/storage.js");

describe("addProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new product successfully", async () => {
    const req = {
      body: {
        title: "Nike shoes",
        desc: "All new Nike shoes air collections limited edition",
        currency: "INR",
        price: 5000,
        quantity: 5,
        // Add other required fields based on your schema
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const savedProductMock = {
      _id: "someProductId",
      title: "Nike shoes",
      desc: "All new Nike shoes air collections limited edition",
      currency: "INR",
      price: 5000,
      quantity: 5,
      // Add other fields based on your schema
    };

    const imagePath = path.join(__dirname, "../utils/assets/nikeShoes.webp");
    const imagesMock = ["http://example.com/nikeShoes.webp"];

    addProductSchemaMock.validate.mockReturnValue({ error: null });
    Product.mockReturnValue({
      save: jest
        .fn()
        .mockResolvedValue({ ...savedProductMock, img: imagesMock }),
    });
    imageUrl.mockResolvedValue(imagesMock);

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith({
    //   ...savedProductMock,
    //   img: imagesMock,
    // });
    // expect(Product).toHaveBeenCalledWith({
    //   title: "Nike shoes",
    //   desc: "All new Nike shoes air collections limited edition",
    //   currency: "INR",
    //   price: 5000,
    //   quantity: 5,
    //   img: imagesMock,
    //   // Add other fields based on your schema
    // });
  });

  it("should handle addProduct error with validation error", async () => {
    const req = {
      body: {
        // Invalid product data to trigger validation error
        title: "",
        price: "invalid_price",
        // Add other required fields based on your schema
      },
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
    expect(res.json).toHaveBeenCalledWith('"title" is not allowed to be empty');
  });

  it("should handle addProduct error with internal server error", async () => {
    const req = {
      body: {
        title: "Nike shoes",
        desc: "All new Nike shoes air collections limited edition",
        currency: "INR",
        price: 5000,
        quantity: 5,
        // Add other required fields based on your schema
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

    const productSaveError = new Error("Save error");
    productSaveError.message = "Save error";

    Product.mockReturnValue({
      save: jest.fn().mockRejectedValue(productSaveError),
    });

    addProductSchemaMock.validate.mockReturnValue({ error: null });

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Save error");
  });
});

//update

describe("updateProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a product successfully", async () => {
    const req = {
      body: {
        // Updated product data
        title: "Updated Nike shoes",
        price: 5500,
        // Add other updated fields based on your schema
      },
      params: {
        productId: "someProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const updatedProductMock = {
      _id: "someProductId",
      title: "Updated Nike shoes",
      price: 5500,
      // Add other fields based on your schema
    };

    updateProductSchemaMock.validate.mockReturnValue({ error: null });
    Product.findByIdAndUpdate.mockResolvedValue(updatedProductMock);

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(updatedProductMock);
    // expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
    //   "someProductId",
    //   { $set: req.body },
    //   { new: true }
    // );
  });

  it("should handle updateProduct error with validation error", async () => {
    const req = {
      body: {
        // Invalid updated product data to trigger validation error
        title: "",
        price: "invalid_price",
        // Add other updated fields based on your schema
      },
      params: {
        productId: "someProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const updateProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    updateProductSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"title" is not allowed to be empty');
  });

  it("should handle updateProduct error with internal server error", async () => {
    const req = {
      body: {
        title: "Updated Nike shoes",
        price: 5500,
        // Add other updated fields based on your schema
      },
      params: {
        productId: "someProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const updateProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const updateProductError = new Error("Update error");
    updateProductError.message = "Update error";

    Product.findByIdAndUpdate.mockRejectedValue(updateProductError);

    updateProductSchemaMock.validate.mockReturnValue({ error: null });

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Update error");
  });
});

// delete
describe("deleteProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a product successfully", async () => {
    const req = {
      params: {
        productId: "6572a44fc2634b81adab99cb",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const deleteProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    deleteProductSchemaMock.validate.mockReturnValue({ error: null });
    Product.findByIdAndDelete.mockResolvedValue();

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(
    //   "Product has been deleted successfully !"
    // );
    // expect(Product.findByIdAndDelete).toHaveBeenCalledWith("someProductId");
  });

  it("should handle deleteProduct error with validation error", async () => {
    const req = {
      params: {
        productId: "6572a44fc2634b81ad",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const deleteProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    deleteProductSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith(
    //   "\"productId\" must be a valid ObjectId"
    // );
  });

  it("should handle deleteProduct error with internal server error", async () => {
    const req = {
      params: {
        productId: "6572a44fc2634b81adab99cb",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const deleteProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const deleteProductError = new Error("Internal server error!");
    deleteProductError.message = "Internal server error!";

    // Correct way to mock findByIdAndDelete rejection
    Product.findByIdAndDelete.mockRejectedValue(deleteProductError);

    deleteProductSchemaMock.validate.mockReturnValue({ error: null });

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    // Ensure the specific error message is checked
    expect(res.json).toHaveBeenCalledWith("Internal server error!");
  });
});

// find a product

describe("getProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a product successfully", async () => {
    const req = {
      params: {
        productId: "6572a44fc2634b81adab99cb",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const productMock = {
      _id: "6572a44fc2634b81adab99cb",
      title: "Nike shoes",
      desc: "All new Nike shoes air collections limited edition",
      currency: "INR",
      price: 5000,
      quantity: 5,
      // Add other fields based on your schema
    };

    getProductSchemaMock.validate.mockReturnValue({ error: null });
    Product.findById.mockResolvedValue(productMock);

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productMock);
    expect(Product.findById).toHaveBeenCalledWith("6572a44fc2634b81adab99cb");
  });

  it("should handle getProduct error with validation error", async () => {
    const req = {
      params: {
        productId: "6572a44fc2634b81a",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const getProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    getProductSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      "Product ID should be exactly 24 characters long!"
    );
  });
});

it("should handle getProduct error with product not found", async () => {
  const req = {
    params: {
      productId: "6572a44fc2634b81adab99cb",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const getProductSchemaMock = {
    validate: jest.fn().mockReturnValue({ error: null }),
  };

  getProductSchemaMock.validate.mockReturnValue({ error: null });
  Product.findById.mockResolvedValue(null);

  await getProduct(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith("Product not found !");
});

it("should handle getProduct error with internal server error", async () => {
  const req = {
    params: {
      productId: "6572a44fc2634b81adab99cb",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const validationError = new Error("Validation error");
  validationError.message = "Validation error";

  const getProductSchemaMock = {
    validate: jest.fn().mockReturnValue({ error: null }),
  };

  const getProductError = new Error("Internal server error !");
  getProductError.message = "Internal server error !";

  // Correct way to mock findById rejection
  Product.findById.mockRejectedValue(getProductError);

  getProductSchemaMock.validate.mockReturnValue({ error: null });

  await getProduct(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith("Internal server error !");
});

// find all
describe("getAllProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all products successfully", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const productsMock = [
      {
        _id: "6572a44fc2634b81adab99cb",
        title: "Nike shoes",
        desc: "All new Nike shoes air collections limited edition",
        currency: "INR",
        price: 5000,
        quantity: 5,
        // Add other fields based on your schema
      },
      // Add more product objects as needed
    ];

    Product.find.mockResolvedValue(productsMock);

    await getAllProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(Product.find).toHaveBeenCalled();
  });

  it("should handle getAllProduct 404 error", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const productsMock = [];

    Product.find.mockResolvedValue(productsMock);

    await getAllProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith(productsMock);
    // expect(Product.find).toHaveBeenCalled();
  });
  it("should handle getAllProduct error with internal server error", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const getAllProductError = new Error("Internal server error !");
    getAllProductError.message = "Internal server error !";

    // Correct way to mock find rejection
    Product.find.mockRejectedValue(getAllProductError);

    await getAllProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error !");
  });
});

// findAllMatchingProduct

describe("searchAllMatchingProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should search for matching products successfully", async () => {
    const req = {
      query: {
        keyword: "Nike",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const searchAllMatchingProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const productsMock = [
      {
        _id: "6572a44fc2634b81adab99cb",
        title: "Nike shoes",
        desc: "All new Nike shoes air collections limited edition",
        currency: "INR",
        price: 5000,
        quantity: 5,
        // Add other fields based on your schema
      },
      // Add more product objects as needed
    ];

    searchAllMatchingProductSchemaMock.validate.mockReturnValue({
      error: null,
    });
    Product.find.mockResolvedValue(productsMock);

    await searchAllMatchingProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(Product.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: "Nike", $options: "i" } },
        { desc: { $regex: "Nike", $options: "i" } },
      ],
    });
  });

  it("should handle searchAllMatchingProduct error with validation error", async () => {
    const req = {
      query: {
        keyword: 123, // Invalid keyword to trigger validation error
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const searchAllMatchingProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    searchAllMatchingProductSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await searchAllMatchingProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith("Bad request !");
  });

  it("should handle searchAllMatchingProduct error with internal server error", async () => {
    const req = {
      query: {
        keyword: "Nike",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const searchAllMatchingProductSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const searchError = new Error("Internal server error!");
    searchError.message = "Internal server error!";

    // Correct way to mock find rejection
    Product.find.mockRejectedValue(searchError);

    searchAllMatchingProductSchemaMock.validate.mockReturnValue({
      error: null,
    });

    await searchAllMatchingProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "Server error Error: Internal server error!"
    );
  });
});
