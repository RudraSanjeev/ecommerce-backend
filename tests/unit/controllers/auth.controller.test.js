const {
  register,
  login,
  logout,
  resetPassword,
  refresAccessToken,
} = require("../../../controllers/auth.controller.js");
const User = require("../../../models/user.model.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
jest.mock("../../../models/user.model.js");
jest.mock("crypto-js");
jest.mock("jsonwebtoken");
describe("register function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    const req = {
      body: {
        firstName: "sanjeev",
        lastName: "singh ",
        email: "sanjeevsingh8feb@gmail.com",
        password: "Sanjeev@321",
        phoneNumber: "7050100870",
        role: "admin",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const registerSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const encryptedPasswordMock = {
      toString: jest.fn().mockReturnValue("encryptedpassword"),
    };

    const newUserMock = {
      save: jest.fn().mockResolvedValue({
        _id: "someid",
        firstName: "sanjeev",
        lastName: "singh",
        email: "sanjeevsingh8feb@gmail.com",
        password: encryptedPasswordMock,
        phoneNumber: "7050100870",
        role: "admin",
      }),
    };

    CryptoJS.AES.encrypt.mockReturnValue(encryptedPasswordMock);
    User.mockReturnValue(newUserMock);
    registerSchemaMock.validate.mockReturnValue({ error: null });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      "sanjeev, You have registered Successfully !"
    );
  });

  it("should handle registration error with validation error", async () => {
    const req = {
      body: {
        // Invalid user data to trigger validation error
        firstName: "",
        lastName: "",
        email: "invalidemail",
        password: "short",
        phoneNumber: "32432",
        role: "aaaa",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const registerSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    registerSchemaMock.validate.mockReturnValue({ error: validationError });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      '"firstName" is not allowed to be empty'
    );
  });

  it("should handle registration error with internal server error", async () => {
    const req = {
      body: {
        firstName: "sanjeev",
        lastName: "singh ",
        email: "sanjeevsingh8feb@gmail.com",
        password: "Sanjeev@321",
        phoneNumber: "7050100870",
        role: "admin",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const registerSchemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const newUserMock = {
      save: jest.fn().mockRejectedValue(validationError),
    };

    CryptoJS.AES.encrypt.mockReturnValue("encryptedpassword");
    User.mockReturnValue(newUserMock);
    registerSchemaMock.validate.mockReturnValue({ error: null });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Validation error");
  });
});

// login
describe("Login Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in a user", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
        password: "Sanjeev@321",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const userMock = {
      _id: "someid",
      firstName: "sanjeev",
      lastName: "singh",
      email: "sanjeevsingh8feb@gmail.com",
      password: "encryptedpassword",
      phoneNumber: "7050100870",
      role: "admin",
      refreshToken: "someRefreshToken",
      save: jest.fn().mockResolvedValue(),
      _doc: {
        password: "encryptedpassword",
      },
    };

    const decryptedPasswordMock = {
      toString: jest.fn().mockReturnValue("Sanjeev@321"),
    };

    CryptoJS.AES.decrypt.mockReturnValue(decryptedPasswordMock);
    User.findOne.mockResolvedValue(userMock);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json)
    //   .toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       firstName: "sanjeev",
    //       token: expect.any(String),
    //     })
    //   )
    //   .toEqual(objectContaining({ firstName: "sanjeev", token: "hghgfyf" }));
    // expect(res.cookie).toHaveBeenCalledWith("accessToken", expect.any(String), {
    //   httpOnly: true,
    //   maxAge: "3600000",
    // });
  });

  it("should handle login error with invalid request body", async () => {
    const req = {
      body: {
        // Invalid request body to trigger validation error
        email: "invalidemail",
        password: "short",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    const loginschemaMock = {
      validate: jest.fn().mockReturnValue({ error: validationError }),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"email" must be a valid email');
  });

  it("should handle login error with user not found", async () => {
    const req = {
      body: {
        email: "nonexistentuser@example.com",
        password: "Sanjeev@43234",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("User not found !");
  });

  it("should handle login error with incorrect password", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
        password: "Sanjeev@423424",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userMock = {
      _id: "someid",
      firstName: "sanjeev",
      lastName: "singh",
      email: "sanjeevsingh8feb@gmail.com",
      password: "encryptedpassword",
      phoneNumber: "7050100870",
      role: "admin",
      refreshToken: "someRefreshToken",
      save: jest.fn().mockResolvedValue(),
      _doc: {
        password: "encryptedpassword",
      },
    };

    const decryptedPasswordMock = {
      toString: jest.fn().mockReturnValue("CorrectPassword123"),
    };

    CryptoJS.AES.decrypt.mockReturnValue(decryptedPasswordMock);
    User.findOne.mockResolvedValue(userMock);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("password is incorrect !");
  });

  it("should handle login error with internal server error", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
        password: "Sanjeev@321",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    const loginschemaMock = {
      validate: jest.fn().mockReturnValue({ error: null }),
    };

    const userMock = {
      _id: "someid",
      firstName: "sanjeev",
      lastName: "singh",
      email: "sanjeevsingh8feb@gmail.com",
      password: "encryptedpassword",
      phoneNumber: "7050100870",
      role: "admin",
      refreshToken: "someRefreshToken",
      save: jest.fn().mockRejectedValue(validationError),
      _doc: {
        password: "encryptedpassword",
      },
    };

    const decryptedPasswordMock = {
      toString: jest.fn().mockReturnValue("Sanjeev@321"),
    };

    CryptoJS.AES.decrypt.mockReturnValue(decryptedPasswordMock);
    User.findOne.mockResolvedValue(userMock);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Validation error");
  });
});

// logout

describe("Logout Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log out a user", async () => {
    const req = {
      cookies: {
        accessToken: "someAccessToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    };

    const decodedTokenMock = {
      _id: "someUserId",
    };

    jwt.verify.mockReturnValue(decodedTokenMock);

    const userMock = {
      _id: "someUserId",
      refreshToken: "someRefreshToken",
      save: jest.fn().mockResolvedValue(),
    };

    User.findById.mockResolvedValue(userMock);

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      "User has been logged out successfully!"
    );
    expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
    expect(userMock.refreshToken).toBeNull();
    expect(userMock.save).toHaveBeenCalled();
  });

  it("should handle logout error with missing access token", async () => {
    const req = {
      cookies: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("accesstoken is not provided !");
    expect(User.findById).not.toHaveBeenCalled();
  });

  it("should handle logout error with invalid access token", async () => {
    const req = {
      cookies: {
        accessToken: "invalidAccessToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jwt.verify.mockImplementation(() => {
      throw new Error("accesstoken is not provided !");
    });

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("accesstoken is not provided !");
    expect(User.findById).not.toHaveBeenCalled();
  });

  it("should handle logout error with internal server error", async () => {
    const req = {
      cookies: {
        accessToken: "someAccessToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    };

    const decodedTokenMock = {
      _id: "someUserId",
    };

    jwt.verify.mockReturnValue(decodedTokenMock);

    const userMock = {
      _id: "someUserId",
      refreshToken: "someRefreshToken",
      save: jest.fn().mockRejectedValue(new Error("Simulated error")),
    };

    User.findById.mockResolvedValue(userMock);

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Simulated error");
    expect(res.clearCookie).not.toHaveBeenCalled();
  });
});

describe("Reset Password Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully send reset mail", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userMock = {
      _id: "someUserId",
      email: "sanjeevsingh8feb@gmail.com",
    };

    User.findOne.mockResolvedValue(userMock);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      "Reset mail has been sent to your email"
    );
    // You may want to add additional assertions related to email content and sending
  });

  it("should handle reset password error with invalid request body", async () => {
    const req = {
      body: {
        // Invalid request body to trigger validation error
        email: "invalidemail",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"email" must be a valid email');
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it("should handle reset password error with user not found", async () => {
    const req = {
      body: {
        email: "nonexistentuser@example.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("User not found");
    expect(User.findOne).toHaveBeenCalledWith({
      email: "nonexistentuser@example.com",
    });
  });

  it("should handle reset password error with internal server error", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    User.findOne.mockRejectedValue(validationError);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Validation error");
    expect(User.findOne).toHaveBeenCalledWith({
      email: "sanjeevsingh8feb@gmail.com",
    });
  });
});

describe("Reset Password Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully send reset mail", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userMock = {
      _id: "someUserId",
      email: "sanjeevsingh8feb@gmail.com",
    };

    User.findOne.mockResolvedValue(userMock);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      "Reset mail has been sent to your email"
    );
    // You may want to add additional assertions related to email content and sending
  });

  it("should handle reset password error with invalid request body", async () => {
    const req = {
      body: {
        // Invalid request body to trigger validation error
        email: "invalidemail",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error details";

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('"email" must be a valid email');
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it("should handle reset password error with user not found", async () => {
    const req = {
      body: {
        email: "nonexistentuser@example.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("User not found");
    expect(User.findOne).toHaveBeenCalledWith({
      email: "nonexistentuser@example.com",
    });
  });

  it("should handle reset password error with internal server error", async () => {
    const req = {
      body: {
        email: "sanjeevsingh8feb@gmail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const validationError = new Error("Validation error");
    validationError.message = "Validation error";

    User.findOne.mockRejectedValue(validationError);

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Validation error");
    expect(User.findOne).toHaveBeenCalledWith({
      email: "sanjeevsingh8feb@gmail.com",
    });
  });
});

//
describe("Refresh Access Token Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully refresh access token", async () => {
    const req = {
      body: {
        refreshToken: "someRefreshToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const generateRefreshAcessTokenMock = jest
      .fn()
      .mockReturnValue("someAccessToken");

    // refresAccessToken.__Rewire__(
    //   "generateRefreshAcessToken",
    //   generateRefreshAcessTokenMock
    // );

    await refresAccessToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith("someAccessToken");
    // expect(res.cookie).toHaveBeenCalledWith("accessToken", "someAccessToken", {
    //   httpOnly: true,
    //   maxAge: "3600000",
    // });
    // expect(generateRefreshAcessTokenMock).toHaveBeenCalledWith(
    //   "someRefreshToken"
    // );

    // refresAccessToken.__ResetDependency__("generateRefreshAcessToken");
  });

  it("should handle refresh access token error with missing refresh token", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await refresAccessToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("refresh token is missing !");
  });

  // it("should handle refresh access token error with missing access token", async () => {
  //   const req = {
  //     body: {
  //       refreshToken: "someRefreshToken",
  //     },
  //   };

  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };

  //   const generateRefreshAcessTokenMock = jest.fn().mockReturnValue(null);

  //   // refresAccessToken.__Rewire__(
  //   //   "generateRefreshAcessToken",
  //   //   generateRefreshAcessTokenMock
  //   // );

  //   await refresAccessToken(req, res);

  //   expect(res.status).toHaveBeenCalledWith(401);
  //   expect(res.json).toHaveBeenCalledWith("access token is missing !");
  //   expect(res.cookie).not.toHaveBeenCalled();

  //   // refresAccessToken.__ResetDependency__("generateRefreshAcessToken");
  // });
});
