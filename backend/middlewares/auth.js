const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: " Unauthorized , jwt token is required",
    });
  }
  try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
  } catch (error) {
    return res.status(403)
    .json({
        message : " Unauthorized , invalid jwt token"
    })
  }
};
module.exports = ensureAuth;