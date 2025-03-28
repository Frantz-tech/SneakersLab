import express from "express";
import connectDb from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Connecter à la base de données :
connectDb();

// Vérifier le corp de la requete
app.use(express.json());

// Route pour créer un post
app.use(postRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
