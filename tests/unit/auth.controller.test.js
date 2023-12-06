// Mocking crypto-js
jest.mock("crypto-js", () => ({
  AES: {
    encrypt: jest.fn(() => ({ toString: () => "encryptedPassword" })),
  },
}));
const supertest = require("supertest");

const app = require("../../index.js"); // Ensure this path is correct
const request = supertest(app);
const User = require("../../models/user.model.js"); // Update the path accordingly
const CryptoJS = require("crypto-js");
const { registerSchema } = require("../../validators/auth.validator.js"); // Update the path accordingly

describe("Auth Controller", () => {
  describe("POST /api/register", () => {
    it("should register a new user", async () => {
      // Mock data for the request body
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Test@123",
        phoneNumber: "1234567890",
        role: "buyer",
      };

      // Mocking CryptoJS.AES.encrypt
      CryptoJS.AES.encrypt = jest.fn(() => "encryptedPassword");

      // Mocking User.save
      User.prototype.save = jest.fn().mockResolvedValue({
        _id: "mockedUserId",
        ...userData,
        password: "encryptedPassword",
      });

      const response = await request(server)
        .post("/api/register")
        .send(userData);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toBe("John, You have registered Successfully !");
      expect(User.prototype.save).toHaveBeenCalled();
      expect(CryptoJS.AES.encrypt).toHaveBeenCalledWith(
        userData.password,
        process.env.AES_SEC
      );
    });

    it("should handle validation errors", async () => {
      // Mock data with missing required fields
      const invalidUserData = {};

      const response = await request(app)
        .post("/api/register")
        .send(invalidUserData);

      // Assertions for validation error handling
      expect(response.status).toBe(400);
      expect(response.body).toBe("Internal server error !");
    });

    it("should handle internal server errors", async () => {
      // Mocking User.save to simulate an internal server error
      User.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Mocked error"));

      // Mock data for the request body
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Test@123",
        phoneNumber: "1234567890",
        role: "buyer",
      };

      const response = await request(app).post("/api/register").send(userData);

      // Assertions for internal server error handling
      expect(response.status).toBe(500);
      expect(response.body).toBe("Internal server error !");
    });
  });
});
