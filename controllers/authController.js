import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

// Generation d'un JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Inscription

export const register = async (req, res) => {
  const {
    userName,
    firstName,
    dateNaissance,
    email,
    password,
    pseudo,
    profilPic,
    expertise,
    bio,
  } = req.body;
  try {
    // Vérifier si l'utilisateur existe :
    const userExist = await prisma.user.findUnique({
      where: { email },
    });
    if (userExist) {
      return res.status(400).json({ message: "Email or pseudo already exist" });
    }
    // Hasher le mot de passe pour le sécuriser
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        userName,
        firstName,
        dateNaissance,
        email,
        password: hashedPassword,
        pseudo,
        profilPic,
        expertise,
        bio,
      },
    });
    res.status(201).json({
      id: newUser.id,
      userName: newUser.userName,
      firstName: newUser.firstName,
      dateNaissance: newUser.dateNaissance,
      email: newUser.email,
      profilPic: newUser.profilPic,
      expertise: newUser.expertise,
      bio: newUser.bio,
      token: generateToken(newUser.id), // Génère un token JWT pour le nouvel user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // vérif si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        email: email, // vérifie l'email de l'utilisateur
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Vérification du password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Générer un token JWT
    const token = generateToken(user.id);

    res.status(200).json({
      message: "login successful",
      token: token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
