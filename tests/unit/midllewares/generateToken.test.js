// import generateToken from './path/to/generateToken.js';
const { generateToken } = require("../../../middlewares/jwt/generateToken");
const jwt = require("jsonwebtoken");

// Mock process.env variables
process.env.JWT_TOKEN_SEC = "secret_key";
process.env.JWT_TOKEN_EXP = "1h";

const generateToken = (user) => {
  if (!user) {
    throw new Error("Missing user object");
  }
  if (!user._id) {
    throw new Error("Missing user._id");
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_TOKEN_SEC,
    { expiresIn: process.env.JWT_TOKEN_EXP }
  );

  return token;
};

describe("generateToken function", () => {
  it("should generate a valid JWT token", () => {
    const mockJwtSign = jest.fn(() => "mocked_token");
    jwt.sign = mockJwtSign;

    const user = { _id: "123", role: "admin" };
    const token = generateToken(user);

    expect(mockJwtSign).toHaveBeenCalledWith(
      { _id: user._id, role: user.role },
      process.env.JWT_TOKEN_SEC,
      { expiresIn: process.env.JWT_TOKEN_EXP }
    );

    expect(typeof token).toBe("string");
  });

  it("should throw an error if user object is missing", () => {
    expect(() => generateToken(undefined)).toThrowError("Missing user object");
  });

  it("should throw an error if user._id is missing", () => {
    const user = { role: "admin" };
    expect(() => generateToken(user)).toThrowError("Missing user._id");
  });
});
