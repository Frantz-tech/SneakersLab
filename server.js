// server.js
import express from 'express';
import groupe_Routes from './routes/groupe_Route.js';  // Importation des routes avec le ".js"

const app = express();

app.use(groupe_Routes);  // Utilisation des routes définies dans groupeRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
