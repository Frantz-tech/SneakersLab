import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateToken = (user) => {
  // Crée un payload avec les informations nécessaires
  const payload = {
    id: user.id,
    email: user.email,
    userName: user.userName,
    // Tu peux ajouter d'autres informations si nécessaire
  };

  // Crée le token avec une expiration (par exemple, 1h)
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};
