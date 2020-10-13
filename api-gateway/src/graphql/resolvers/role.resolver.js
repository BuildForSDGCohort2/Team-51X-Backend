import UserService  from "../../services/User.service";

module.exports = {

    Query: {
        async findAllRoles() {
            return await UserService.fetchAllRoles();
        },
    },

    Mutation: {
        async createRole(obj, { title }) {
            return await UserService.createRole({title});
        },
    }


}