import { Router } from 'express';
import userServices from '../services/user.services.js'

const router = Router();

// user routes:

// Récuperation de tous les utilisateurs
router.get('/users', async (req, res) => {
    const users = await userServices.getUsers();
    console.log("userController",users)
    res.send(users); 
});

// Récuperation d'un utilisateur par son id
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;    
    const user = await userServices.getUsersById(id);
    res.send(user);  
});

// insertion d'un utilisateur dans la base de données
router.post('/users/', async (req, res) => {
    const createdUser = await userServices.createUser(req);
    res.send(createdUser);     
});

// Suppresion d'un utilisateur de la base de données
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;    
    const deletedUser = await userServices.deleteUser(id);
    res.send(deletedUser);     
});

// Modification d'un utilisateur dans la base de données
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;    
    const updatedUser = await userServices.updateUser(id, req);
    res.send(updatedUser);     
});


export default router;