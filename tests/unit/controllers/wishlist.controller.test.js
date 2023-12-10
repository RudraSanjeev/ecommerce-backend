const {
  addWishList,
  getWishList,
} = require("../../../controllers/wishlist.controller.js");
const Wishlist = require("../../../models/wishlist.model.js");
const Product = require("../../../models/product.model.js");

jest.mock("../../../models/wishlist.model.js");
jest.mock("../../../models/product.model.js");

// add

// get user wishlist
describe("getWishList function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the wishlist successfully when it exists", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const existingWishlistMock = {
      userId: "657306307060b5c8f0ee1bf2",
      items: [
        {
          productId: "657306307060b5c8f0ee1bf4",
        },
      ],
    };

    Wishlist.findOne.mockResolvedValueOnce(existingWishlistMock);

    await getWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(existingWishlistMock);
  });

  it("should handle getWishList error when wishlist is not found", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Wishlist.findOne.mockResolvedValueOnce(null);

    await getWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("wishlist not found !");
  });

  it("should handle getWishList error with internal server error", async () => {
    const req = {
      user: {
        _id: "657306307060b5c8f0ee1bf2",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const internalServerError = new Error("Internal server error!");
    internalServerError.message = "Internal server error!";

    Wishlist.findOne.mockRejectedValueOnce(internalServerError);

    await getWishList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      internalServerError.message || "Internal server error !"
    );
  });
});

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
    expect(res.json).toHaveBeenCalledWith('"items.productId" is required');
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
