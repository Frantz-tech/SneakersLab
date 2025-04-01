import userRoutes from "./userRoutes.js";
import badgeRoutes from "./badgeRoutes.js";

// differents routes de l'app
export const routes = (app) => {
  // routes de l'utilisateur
  app.use(userRoutes);
  app.use(badgeRoutes);
};
