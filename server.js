import cors from "cors";
import express from "express";
import connectDb from "./config/db.js";
import { routes } from "./routes/routes.js";

const app = express();
app.use(cors());
routes(app);
// Connecter à la base de données :
connectDb();

// Vérifier le corp de la requete
app.use(express.json());

// Route pour créer un post
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
