const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");

  //Check For Token
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    //Verify Token
    const decoded = jwt.verify(token, "hms_myjwtSecret");

    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Token is Not Valid" });
  }
}

module.exports = auth;
