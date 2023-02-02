const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../users/userSchema");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.TOKEN);

      // get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401).send("Not authorized, no token");
  }
});



module.exports = { verifyToken };
