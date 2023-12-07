// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const { generateToken } = require("../../../middlewares/jwt/generateToken.js");

describe("generateToken", () => {
  it("should generate a valid token", () => {
    // Mock user object
    const user = {
      _id: "657054df1dab967f6a104e85",
      role: "admin",
    };
    // console.log("user id is " + user);
    const token = generateToken(user);
    expect(token).not.toHaveLength(0);
  });

  it("Missng _id ", () => {
    const user = {
      _id: "",
      role: "admin",
    };
    const token = generateToken(user);
    // expect(() => generateToken(user)).toThrowError(Error);
    // console.log(token);
    // expect(token).toThrowError("_id or role is empty !");
    expect(token).toEqual(Error("_id or role is empty !"));
    // expect(() => {
    //   generateToken(user);
    // }).toThrow("_id or role is empty !");
  });
});
