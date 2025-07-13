import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.admin = decoded;

    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
