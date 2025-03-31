import usersRepository from '../repositories/user.repository.js'

const userServices = {
    async getUsers() {
        return await usersRepository.getUsers();
    },

    async getUsersById(id) {
        return await usersRepository.getUsersById(id)
    },

    async createUser(req) {
        return await usersRepository.createUser(req);
    },
    
    async deleteUser(id) {
        return await usersRepository.deleteUser(id);
    },

    async updateUser(id, req) {
        return await usersRepository.updatedUser(id, req);
    }
}

export default userServices;