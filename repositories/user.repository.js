import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userRepository = {
    async getUsers(){
        try {
            const users = await prisma.user.findMany();
            return ( { success: 1, data: users} );
        }
        catch(error) {
            console.error(error)
            return ( { success: 1, error: "Impossible de récuperer les utilisateurs"} );
        }
    },

    async getUsersById(id) {
        try {
                const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id)
                }
            });        
            return ( { success: 1, data: user} );
        }
        catch(error) {
            return ( { success: 0, error: "Impossible de récuperer l'utilisateur"} );
        }
    },

    async createUser(req){
        try {
                const createdUser = await prisma.user.create({
                data: req.body
            });
            return ( { success: 1, data: createdUser} );
        }
        catch(error) {
            return ( { success: 0, error: "Impossible de créer l'utilisateur"} );
        }
    },

    async deleteUser(id) {
        try {
                const deletedUser = await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return ( { success: 1, data: deletedUser} );
        }
        catch(error) {
            return ( { success: 0, error: "Impossible de supprimer l'utilisateur"} );
        }
    },

    async updatedUser(id, req) {
        try {
                const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: req.body
            });
            return ( { success: 1, data: updatedUser} );
        }
        catch(error) {
            return ( { success: 0, error: "Impossible d'actualiser l'utilisateur"} );
        }
    },
}

export default userRepository;