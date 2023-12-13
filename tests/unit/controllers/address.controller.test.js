const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAllAddressOfUser,
  // Import other functions and modules as needed
} = require("../../../controllers/address.controller.js");

const Address = require("../../../models/address.model.js");

jest.mock("../../../models/address.model.js");

describe("addAddress function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new address successfully", async () => {
    const req = {
      body: {
        houseNo: "123",
        landmark: "Landmark length must be of 10 char",
        city: "Cityville",
        pincode: "123456",
        state: "State",
        country: "Country",
        // Add other required fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const savedAddressMock = {
      _id: "6577fe296fc2015283194b39",
      houseNo: "123",
      landmark: "Landmark length must be of 10 char",
      city: "Cityville",
      pincode: "123456",
      state: "State",
      country: "Country",
      userId: "6577fe296fc2015283194b39",
      // Add other fields based on your schema
    };

    addAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.mockReturnValue({
      save: jest.fn().mockResolvedValue(savedAddressMock),
      findOne: jest.fn().mockResolvedValue(null), // No existing address
    });

    await addAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith(savedAddressMock);
    // expect(Address).toHaveBeenCalledWith({
    //   ...req.body,
    //   userId: req.user._id,
    // });
  });

  it("should handle addAddress error with validation error", async () => {
    const req = {
      body: {
        // Invalid address data to trigger validation error
        houseNo: "",
        // Add other required fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const addAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    addAddressSchemaMock.validate.mockReturnValue({ error: validationError });

    await addAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      '"houseNo" is not allowed to be empty'
    );
  });

  it("should handle addAddress error with internal server error", async () => {
    const req = {
      body: {
        houseNo: "123",
        landmark: "Landmark must be of 10 char ",
        city: "Cityville",
        pincode: "123456",
        state: "State",
        country: "Country",
        // Add other required fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const addAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const addressSaveError = new Error("Save error");
    addressSaveError.message = "Save error";

    Address.mockReturnValue({
      save: jest.fn().mockRejectedValue(addressSaveError),
      findOne: jest.fn().mockResolvedValue(null),
    });

    addAddressSchemaMock.validate.mockReturnValue({ error: null });

    await addAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Save error");
  });

  it("should handle addAddress error when address already exists", async () => {
    const req = {
      body: {
        houseNo: "123",
        landmark: "Landmark",
        city: "Cityville",
        pincode: "123456",
        state: "State",
        country: "Country",
        // Add other required fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingAddress = {
      _id: "6577fe296fc2015283194b39",
      houseNo: "123",
      landmark: "Landmark must be of 10 char",
      city: "Cityville",
      pincode: "123456",
      state: "State",
      country: "Country",
      userId: "6577fe296fc2015283194b39",
      // Add other fields based on your schema
    };

    Address.mockReturnValue({
      save: jest.fn().mockResolvedValue(null),
      findOne: jest.fn().mockResolvedValue(existingAddress),
    });

    addAddressSchemaMock.validate.mockReturnValue({ error: null });

    await addAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      '"landmark" length must be at least 10 characters long'
    );
  });
});

// upate;

describe("updateAddress function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing address successfully", async () => {
    const addressId = "6577fe296fc2015283194b39";

    const req = {
      params: { addressId },
      body: {
        houseNo: "1234",
        landmark: "Landmark must be of 10 char",
        city: "Cityville",
        pincode: "123456",
        state: "State",
        country: "Country",
        // Add other fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const updatedAddressMock = {
      _id: addressId,
      houseNo: "1234",
      landmark: "Landmark must be of 10 char",
      city: "Cityville",
      pincode: "123456",
      state: "State",
      country: "Country",
      userId: "6577fe296fc2015283194b39",
      // Add other fields based on your schema
    };

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.find.mockResolvedValue([{ _id: addressId }]);
    Address.findByIdAndUpdate.mockResolvedValue(updatedAddressMock);

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(updatedAddressMock);
    // expect(Address.findByIdAndUpdate).toHaveBeenCalledWith(
    //   addressId,
    //   { $set: req.body },
    //   { new: true }
    // );
  });

  it("should handle updateAddress error with validation error", async () => {
    const req = {
      params: {
        addressId: "6577fe296fc2015283194b39",
      },
      body: {
        // Invalid address data to trigger validation error
        houseNo: "",
        // Add other fields based on your schema
      },
      user: {
        _id: "someUserId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      '"houseNo" is not allowed to be empty'
    );
  });

  // it("should handle updateAddress error when address not found", async () => {
  //   const addressId = "6577fe296fc2015283194b39";

  //   const req = {
  //     params: { addressId },
  //     body: {
  //       houseNo: "456",
  //       landmark: "Updated Landmark",
  //       city: "Updated Cityville",
  //       pincode: "654321",
  //       state: "Updated State",
  //       country: "Updated Country",
  //       // Add other fields based on your schema
  //     },
  //     user: {
  //       _id: "6577fe296fc2015283194b39",
  //     },
  //   };

  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };

  //   const updateAddressSchemaMock = {
  //     validate: jest.fn().mockReturnValue({ error: null }),
  //   };

  //   Address.mockReturnValue({
  //     findByIdAndUpdate: jest.fn().mockResolvedValue(null),
  //     find: jest.fn().mockResolvedValue(null),
  //   });

  //   updateAddressSchemaMock.validate.mockReturnValue({ error: null });

  //   await updateAddress(req, res);

  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.json).toHaveBeenCalledWith("address not found !");
  // });

  it("should handle updateAddress error with internal server error", async () => {
    const addressId = "6577fe296fc2015283194b39";
    const req = {
      params: { addressId },
      body: {
        houseNo: "456",
        landmark: "Updated Landmark",
        city: "Updated Cityville",
        pincode: "654321",
        state: "Updated State",
        country: "Updated Country",
        // Add other fields based on your schema
      },
      user: {
        _id: "6577fe296fc2015283194b39",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const addressUpdateError = new Error("Update error");
    addressUpdateError.message = "Update error";

    Address.findByIdAndUpdate.mockRejectedValue(addressUpdateError);
    updateAddressSchemaMock.validate.mockReturnValue({ error: null });

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Update error");
  });
});

// delete
describe("deleteAddress function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete an address successfully", async () => {
    const userId = "1234567890";
    const addressId = "6577fe296fc2015283194b39";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.find.mockResolvedValue([
      {
        /* mock address data */
      },
    ]);
    Address.findByIdAndDelete.mockResolvedValue({});

    await deleteAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Address deleted successfully !");
    expect(Address.findByIdAndDelete).toHaveBeenCalledWith(addressId);
  });

  it("should handle deleteAddress error with no addresses found", async () => {
    const userId = "";
    const addressId = "6577fe296fc2015283194b39";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Address.find.mockResolvedValue(null);

    await deleteAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("No address found with given userId");
  });

  it("should handle deleteAddress error with validation error", async () => {
    const userId = "6577fe296fc2015283194b39";
    const req = {
      user: { _id: userId },
      params: { addressId: "" }, // Invalid addressId to trigger validation error
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await deleteAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith(
    //   '"addressId" is not allowed to be empty'
    // );
  });

  it("should handle deleteAddress error with internal server error", async () => {
    const userId = "1234567890";
    const addressId = "6577fe296fc2015283194b39";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const addressDeleteError = new Error("Delete error");
    addressDeleteError.message = "Delete error";

    Address.find.mockResolvedValue([
      {
        /* mock address data */
      },
    ]);
    Address.findByIdAndDelete.mockRejectedValue(addressDeleteError);

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });

    await deleteAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Delete error");
  });
});

// getAddress
describe("getAddress function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a single address successfully", async () => {
    const userId = "1234567890";
    const addressId = "6572a44fc2634b81adab99cb";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.find.mockResolvedValue([
      {
        /* mock address data */
      },
    ]);

    await getAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        /* mock address data */
      },
    ]);
    expect(Address.find).toHaveBeenCalledWith({ userId });
  });

  it("should handle getAddress error with no addresses found", async () => {
    const userId = "1234567890";
    const addressId = "6572a44fc2634b81adab99cb";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.find.mockResolvedValue(null);

    await getAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("No address found with given ID !");
  });

  it("should handle getAddress error with validation error", async () => {
    const userId = "1234567890";
    const req = {
      user: { _id: userId },
      params: { addressId: "" }, // Invalid addressId to trigger validation error
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await getAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      '"addressId" is not allowed to be empty'
    );
  });

  it("should handle getAddress error with internal server error", async () => {
    const userId = "1234567890";
    const addressId = "6572a44fc2634b81adab99cb";
    const req = {
      user: { _id: userId },
      params: { addressId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const addressFindError = new Error("Find error");
    addressFindError.message = "Find error";

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.find.mockRejectedValue(addressFindError);

    await getAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Find error");
  });
});

//getAllAdress
describe("getAllAddressOfUser function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all addresses of a user successfully", async () => {
    const userId = "1234567890";
    const req = {
      user: { _id: userId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Address.find.mockResolvedValue([
      {
        /* mock address data */
      },
    ]);

    await getAllAddressOfUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        /* mock address data */
      },
    ]);
    expect(Address.find).toHaveBeenCalledWith({ userId });
  });

  it("should handle getAllAddressOfUser error with no addresses found", async () => {
    const userId = "1234567890";
    const req = {
      user: { _id: userId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Address.find.mockResolvedValue([]);

    await getAllAddressOfUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]); // Return an empty array if no addresses found
    expect(Address.find).toHaveBeenCalledWith({ userId });
  });

  it("should handle getAllAddressOfUser error with internal server error", async () => {
    const userId = "1234567890";
    const req = {
      user: { _id: userId },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const addressFindError = new Error("Find error");
    addressFindError.message = "Find error";

    Address.find.mockRejectedValue(addressFindError);

    await getAllAddressOfUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Find error");
  });
});
