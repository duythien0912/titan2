import jwt from "jsonwebtoken";
import User from "../models/user";

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: { global: "Invalid token" } });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
        //        req.userEmail = decoded.email;
        //        next();
      }
    });
  } else {
    res.status(401).json({ error: { global: "No token" } });
  }
};
