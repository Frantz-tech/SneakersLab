import userRoutes from "../routes/userRoutes.js";

// differents routes de l'app
export const routes = (app) => {
  // routes de l'utilisateur
  app.use(userRoutes);
};
