const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../schemas/userSchema');
const Admin = require('../schemas/adminUserSchema');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(decoded.id).select('-password');

      if (!user) {
        user = await Admin.findById(decoded.id).select('-password');
      }

      if (!user) {
        res.status(401);
        throw new Error('Not Authorized, User Not Found!');
      }

      req.user = user;
      return next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, Token Failed!');
    }
  }

  res.status(401);
  throw new Error('Not Authorized, No Token!');
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized As Admin!');
  }
});

module.exports = { protect, admin };
