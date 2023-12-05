const request = require("supertest");
const app = require("../app"); // Import your Express app instance

const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAllAddressOfUser,
} = require("../../controllers/address.controller"); // Adjust the path as needed

describe("Address Controller", () => {
  let userId; // store the user ID for testing

  beforeAll(() => {
    // You might want to set up a test user before running the tests
    // and store the user ID for testing
    // This could be done using a testing database or mocking the user creation process
    // For simplicity, let's assume userId is set here
    userId = "some-test-user-id";
  });

  describe("addAddress", () => {
    test("should add a new address", async () => {
      const req = {
        user: { _id: userId },
        body: {
          // provide valid address data for testing
          houseNo: "phase 5 1551",
          landmark: "near afil tower",
          city: "mohali",
          pincode: "802352",
          state: "punjab",
          country: "India",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await addAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    test("should handle validation errors", async () => {
      const req = {
        user: { _id: userId },
        body: {
          // provide invalid address data for testing
          houseNo: "12",
          landmark: "n23",
          city: "mohali",
          pincode: "802352",
          state: "punjab",
          country: "India",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await addAddress(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    // Add more tests as needed
  });

  // Repeat the pattern for other controller functions
});
