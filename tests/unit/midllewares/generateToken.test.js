const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const {
  generateToken,
  generateResetToken,
  generateRefreshToken,
  generateRefreshAcessToken,
} = require("../../../middlewares/jwt/generateToken.js");

// describe("generateToken test cases", () => {
// generateToken
describe("generateToken", () => {
  it("generateToken -- should generate a valid token", () => {
    // Mock user object
    const user = {
      _id: "657054df1dab967f6a104e85",
      role: "admin",
    };
    // console.log("user id is " + user);
    const token = generateToken(user);
    expect(token).not.toHaveLength(0);
  });

  it("generateToken -- Missng _id ", () => {
    const user = {
      _id: "",
      role: "isadmin",
    };
    const token = generateToken(user);

    expect(token).toEqual(Error("_id or role is empty !"));
  });
});

//generateResetToken
describe("generateResetToken", () => {
  // Mock user object
  it("generateResetToken --it should return valid token", () => {
    const user = {
      _id: "657054df1dab967f6a104e85",
      role: "admin",
    };
    // console.log("user id is " + user);
    const token = generateResetToken(user);
    expect(token).not.toHaveLength(0);
  });
});

// generateRefreshToken
describe("generateRefreshToken", () => {
  it("generateRefreshToken -- it should return valid token", () => {
    // Mock user object
    const user = {
      _id: "657054df1dab967f6a104e85",
      role: "admin",
    };
    // console.log("user id is " + user);
    const token = generateRefreshToken(user);
    expect(token).not.toHaveLength(0);
  });
});

describe("generateRefreshAcessToken", () => {
  it("generateRefreshAcessToken -- it should return valid token", () => {
    // Mock user object
    const refreshToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcwZDc4YmY1M2FjYzUyNmU1NDhkNjUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDE5NzIwODMsImV4cCI6MTcwMTk3NTY4M30.Yf2Ch6RwP3jnrgbH8-canyipkIymTanrgzBIuoqDGWE";
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SEC);
    const newAccessToken = generateToken(user);
    // return newAccessToken;

    // console.log("user id is " + user);
    const token = generateRefreshAcessToken(user);
    expect(newAccessToken).not.toHaveLength(0);
  });

  it("generateRefreshAcessToken --Missing id or role", () => {
    const user = {
      _id: "",
      role: "isadmin",
    };
    const token = generateToken(user);

    // expect(token).toEqual(Error());
    expect(token).toThrow();
  });
});
