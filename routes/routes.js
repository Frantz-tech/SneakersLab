import userRoutes from '../controllers/user.controller.js'

// differents routes de l'app
export const routes = (app) => {
    // routes de l'utilisateur
    app.use(userRoutes);
    
}


