const {
  addAddress,
  updateAddress,
} = require("../../../controllers/address.controller.js");
const Address = require("../../../models/address.model.js");

jest.mock("../../../models/address.model.js");

// describe("addAddress function", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should add a new address successfully", async () => {
//     const req = {
//       user: {
//         _id: "6570d8a32fe8748211793a2f",
//       },
//       body: {
//         houseNo: "123456",
//         landmark: "Main landmark",
//         city: "City",
//         state: "State",
//         zipCode: "1234566",
//         country: "Country",
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const addAddressSchemaMock = {
//       validate: jest.fn().mockReturnValue({ error: null }),
//     };

//     const existingAddressMock = null;
//     const newAddressMock = {
//       _id: "6570d8a32fe8748211793a2f",
//       userId: "6570d8a32fe8748211793a2f",
//       houseNo: "123456",
//       landmark: "Main landmark",
//       city: "City",
//       state: "State",
//       zipCode: "1234566",
//       country: "Country",
//     };

//     addAddressSchemaMock.validate.mockReturnValue({ error: null });
//     Address.findOne.mockResolvedValue(existingAddressMock);
//     Address.prototype.save.mockResolvedValue(newAddressMock);

//     await addAddress(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     // expect(res.json).toHaveBeenCalledWith(newAddressMock);
//   });

//   it("should handle validation error", async () => {
//     const req = {
//       user: {
//         _id: "6570d8a32fe8748211793a2f",
//       },
//       body: {
//         houseNo: "123",
//         landmark: "Main landmark",
//         city: "City",
//         // Missing state, zipCode, country
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const validationError = new Error("Validation error");
//     validationError.message = '"pincode" is required';

//     const addAddressSchemaMock = {
//       validate: jest.fn().mockReturnValue({ error: validationError }),
//     };

//     addAddressSchemaMock.validate.mockReturnValue({ error: validationError });

//     await addAddress(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith(validationError.message);
//   });

//   it("should handle existing address", async () => {
//     const req = {
//       user: {
//         _id: "6570d8a32fe8748211793a2f",
//       },
//       body: {
//         houseNo: "123",
//         landmark: "Main landmark",
//         city: "City",
//         state: "State",
//         zipCode: "123456",
//         country: "Country",
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const addAddressSchemaMock = {
//       validate: jest.fn().mockReturnValue({ error: null }),
//     };

//     const existingAddressMock = {
//       _id: "existingAddress123",
//       userId: "6570d8a32fe8748211793a2f",
//       houseNo: "123",
//       landmark: "Main landmark",
//       city: "City",
//       state: "State",
//       zipCode: "123456",
//       country: "Country",
//     };

//     addAddressSchemaMock.validate.mockReturnValue({ error: null });
//     Address.findOne.mockResolvedValue(existingAddressMock);

//     await addAddress(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith('"pincode" is required');
//   });

//   it("should handle internal server error", async () => {
//     const req = {
//       user: {
//         _id: "6570d8a32fe8748211793a2f",
//       },
//       body: {
//         houseNo: "12345",
//         landmark: "Main landmark",
//         city: "City",
//         state: "State",
//         zipCode: "123456",
//         country: "Country",
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const addAddressSchemaMock = {
//       validate: jest.fn().mockReturnValue({ error: null }),
//     };

//     // const internalServerError = new Error("Internal server error");
//     // internalServerError.message = "Internal server error details";

//     // addAddressSchemaMock.validate.mockReturnValue({ error: null });
//     // Address.findOne.mockRejectedValue(internalServerError);

//     await addAddress(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     // expect(res.json).toHaveBeenCalledWith("Internal server error !");
//   });
// });

// update

describe("updateAddress function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the address successfully", async () => {
    const req = {
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
      body: {
        houseNo: "456",
        landmark: "Park",
        city: "New City",
        pincode: "678901", // 6-digit pincode
        state: "New State",
        country: "New Country",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingAddressMock = {
      _id: "address123",
      userId: "6570d8a32fe8748211793a2f",
      houseNo: "123",
      landmark: "Street",
      city: "City",
      pincode: "123456",
      state: "State",
      country: "Country",
    };

    const updatedAddressMock = {
      _id: "address123",
      userId: "6570d8a32fe8748211793a2f",
      houseNo: "456",
      landmark: "Park",
      city: "New City",
      pincode: "678901",
      state: "New State",
      country: "New Country",
    };

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.findOne.mockResolvedValue(existingAddressMock);
    Address.findByIdAndUpdate.mockResolvedValue(updatedAddressMock);

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: "6570d8a32fe8748211793a2f",
      houseNo: "456",
      landmark: "Park",
      city: "New City",
      pincode: "678901",
      state: "New State",
      country: "New Country",
    });
  });

  it("should handle validation error", async () => {
    const req = {
      user: {
        _id: "6570d8a32fe87482117",
      },
      body: {
        // Missing required fields
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = '"pincode" is required';

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    updateAddressSchemaMock.validate.mockReturnValue({
      error: validationError,
    });

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(validationError.message);
  });

  it("should handle address not found", async () => {
    const req = {
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
      body: {
        houseNo: "456",
        landmark: "Park",
        city: "New City",
        pincode: "678901",
        state: "New State",
        country: "New Country",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const existingAddressMock = null;

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.findOne.mockResolvedValue(existingAddressMock);

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("address not found !");
  });

  it("should handle internal server error", async () => {
    const req = {
      user: {
        _id: "6570d8a32fe8748211793a2f",
      },
      body: {
        houseNo: "456",
        landmark: "Park",
        city: "New City",
        pincode: "678901",
        state: "New State",
        country: "New Country",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updateAddressSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const internalServerError = new Error("Internal server error");
    internalServerError.message = "Internal server error details";

    updateAddressSchemaMock.validate.mockReturnValue({ error: null });
    Address.findOne.mockResolvedValue({
      _id: "address123",
      userId: "6570d8a32fe8748211793a2f",
      houseNo: "123",
      landmark: "Street",
      city: "City",
      pincode: "123456",
      state: "State",
      country: "Country",
    });
    Address.findByIdAndUpdate.mockRejectedValue(internalServerError);

    await updateAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error !");
  });
});
