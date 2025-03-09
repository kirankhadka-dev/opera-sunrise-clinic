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
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });
};

export { authentication };
