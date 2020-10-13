import UserService  from "../../services/User.service";

module.exports = {

    Query: {

        async findAllModules() {
            return await UserService.fetchAllModule();
        }
       
    },


}