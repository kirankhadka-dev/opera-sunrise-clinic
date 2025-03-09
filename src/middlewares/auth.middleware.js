import jwt from "jsonwebtoken";
import UserModal from "../models/User.model.js";

const authentication = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

      req.user = await UserModal.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ message: "User not found" });

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { authentication };
