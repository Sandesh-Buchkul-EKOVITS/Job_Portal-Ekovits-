// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };











const jwt = require("jsonwebtoken");

/*
  🔐 Auth Middleware
  - Token verify karega
  - req.user me id + role set karega
*/

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing"
    });
  }

  // Format: Bearer TOKEN
 const token = req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }
console.log("JWT SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded contains: { id, role, iat, exp }
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

/*
  🎯 Role Based Access (Optional)
  Example: allow only employer
*/

// exports.requireRole = (role) => {
//   return (req, res, next) => {
//     if (!req.user || req.user.role !== role) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied"
//       });
//     }
//     next();
//   };
// };






exports.requireRole = (roles) => {
  return (req, res, next) => {

    // agar single role hai to array bana do
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    // user role check
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  };
};