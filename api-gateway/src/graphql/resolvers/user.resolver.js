import UserService from "../../services/User.service";
import InstitutionService from "../../services/Institution.service";
import HealthService from "../../services/Health.service";

const USER_TYPE_PATIENT = "";
const USER_TYPE_AGENT = "";

module.exports = {

    Mutation: {

        async verifyPhoneNumber(obj, { phoneNumber }) {
            return await UserService.verifyPhoneNumber({ phoneNumber });
        },

        async accountActivation(obj, { token }) {
            return await UserService.accountActivation({ token });
        },

        async createUser(obj, { roleId, email, prenom, nom, password, phoneNumber }) {
            return await UserService.createUser({ roleId, email, prenom, nom, password, phoneNumber });
        },

        async createUserSession(obj, { email, password }, context) {
            const userSession = await UserService.createUserSession({ email, password });
            context.res.cookie("userSessionId", userSession.jwtToken, { httpOnly: true });
            return userSession;
        }

    },

    Query: {

        async findAllUsers() {
            return await UserService.fetchAllUsers();
        }

    },

};