import userRoutes from "./userRoutes.js";

export const routes = (app) => {
  // routes de l'utilisateur
  app.use(userRoutes);
};
