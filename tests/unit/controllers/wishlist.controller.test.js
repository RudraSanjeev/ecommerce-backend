const { addWishList } = require("../../../controllers/wishlist.controller.js");
const Wishlist = require("../../../models/wishlist.model.js");
const Product = require("../../../models/product.model.js");

jest.mock("../../../models/wishlist.model.js");
jest.mock("../../../models/product.model.js");

describe("addWishList function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new wishlist successfully", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
      body: {
        items: {
          productId: "657306307060b5c8f0ee1bf4",
        },
        // Add other required fields based on your schema
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addWishListSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingProductMock = {
      _id: "productId",
      // Add other fields based on your schema
    };

    const existingWishlistMock = {
      userId: "userId",
      items: [],
      save: jest.fn(),
    };

    addWishListSchemaMock.validate.mockReturnValue({ error: null });
    Wishlist.findOne.mockResolvedValueOnce(null); // No existing wishlist
    Wishlist.mockReturnValueOnce(existingWishlistMock);
    Product.findById.mockResolvedValueOnce(existingProductMock);

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("wishlist added successfully !");
    expect(existingWishlistMock.save).toHaveBeenCalled();
  });

  it("should handle addWishList error when validation fails", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      body: {
        // Invalid wishlist data to trigger validation error
        items: {},
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const addWishListSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith(validationError.message);
  });

  it("should handle addWishList error when product ID is missing", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      body: {
        items: {},
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith(
    //   "User ID, Or Product ID are required.userId, undefined"
    // );
  });

  it("should handle addWishList error when product is not found", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
      body: {
        items: {
          productId: "657306307060b5c8f0ee1bf4",
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addWishListSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    Product.findById.mockResolvedValueOnce(null);

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith("Product not found with given id !");
  });

  it("should handle addWishList error when product is already in the wishlist", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      body: {
        items: {
          productId: "productId",
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addWishListSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingProductMock = {
      _id: "productId",
    };

    const existingWishlistMock = {
      userId: "userId",
      items: [
        {
          productId: "productId",
        },
      ],
    };

    addWishListSchemaMock.validate.mockReturnValue({ error: null });
    Wishlist.findOne.mockResolvedValueOnce(existingWishlistMock);
    Product.findById.mockResolvedValueOnce(existingProductMock);

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith(
    //   "product already present in the wishlist !"
    // );
  });

  it("should handle addWishList error with internal server error", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
      body: {
        items: {
          productId: "657306307060b5c8f0ee1bf4",
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addWishListSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingProductMock = {
      _id: "657306307060b5c8f0ee1bf4",
    };

    const internalServerError = new Error("Internal server error!");
    internalServerError.message = "Internal server error!";

    addWishListSchemaMock.validate.mockReturnValue({ error: null });
    Wishlist.findOne.mockRejectedValueOnce(internalServerError);
    Product.findById.mockResolvedValueOnce(existingProductMock);

    await addWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "item.productId.equals is not a function"
    );
  });
});

// update
const {
  updateWishlist,
} = require("../../../controllers/wishlist.controller.js");
const Wishlist = require("../../../models/wishlist.model.js");

jest.mock("../../../models/wishlist.model.js");

describe("updateWishlist function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a wishlist successfully", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      params: {
        productId: "productId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateWishlistSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingItemMock = {
      productId: "productId",
    };

    const existingWishlistMock = {
      userId: "userId",
      items: [existingItemMock],
      save: jest.fn(),
    };

    updateWishlistSchemaMock.validate.mockReturnValue({ error: null });
    Wishlist.findOne.mockResolvedValueOnce(existingWishlistMock);

    await updateWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      "Item has been deleted from wishlist ..."
    );
    expect(existingWishlistMock.save).toHaveBeenCalled();
  });

  it("should handle updateWishlist error when validation fails", async () => {
    const req = {
      params: {
        productId: "invalidProductId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const updateWishlistSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    await updateWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith(validationError.message);
  });

  it("should handle updateWishlist error when wishlist is not found", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      params: {
        productId: "productId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateWishlistSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    Wishlist.findOne.mockResolvedValueOnce(null);

    await updateWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith("Wishlist not found !");
  });

  it("should handle updateWishlist error when item is not found in the wishlist", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      params: {
        productId: "productId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateWishlistSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingWishlistMock = {
      userId: "userId",
      items: [],
    };

    Wishlist.findOne.mockResolvedValueOnce(existingWishlistMock);

    await updateWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith("No product found in the wishlist !");
  });

  it("should handle updateWishlist error with internal server error", async () => {
    const req = {
      user: {
        _id: "userId",
      },
      params: {
        productId: "productId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateWishlistSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingItemMock = {
      productId: "productId",
    };

    const existingWishlistMock = {
      userId: "userId",
      items: [existingItemMock],
      save: jest.fn().mockRejectedValue(new Error("Internal server error!")),
    };

    updateWishlistSchemaMock.validate.mockReturnValue({ error: null });
    Wishlist.findOne.mockResolvedValueOnce(existingWishlistMock);

    await updateWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error !");
  });
});
