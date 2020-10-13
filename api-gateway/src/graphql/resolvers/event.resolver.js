import UserService  from "../../services/User.service";

module.exports = {

    Mutation: {

    },

    Query: {

        async findAllEvents() {
            return await UserService.fetchAllEvent();
        }
       
    },

}