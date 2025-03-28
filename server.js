import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { routes } from "./routes/routes.js";

app.use(express.json());
app.use(cors());
routes(app);
app.listen(PORT);

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
