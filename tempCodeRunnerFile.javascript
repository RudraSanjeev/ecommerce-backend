const { generateToken } = require("../../../middlewares/jwt/generateToken.js");
const user = {
    _id: "657054df1dab967f6a104e85",
    role: 'admin'
}

const token = generateToken(user);
console.log(token)