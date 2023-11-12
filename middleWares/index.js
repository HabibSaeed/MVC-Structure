const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  console.log(req.headers["authorization"]);
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ");
      console.log(token[1]);
      const isVerify = jwt.verify(token[1], "Private Key");
      console.log(isVerify, "Is Verify the User");
      if (isVerify) {
        next();
      } else {
        res.json({
          status: false,
          message: "UnAuth user",
        });
      }
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  authMiddleWare,
};
