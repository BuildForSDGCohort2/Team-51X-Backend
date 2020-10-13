import UserService from "../../services/User.service";
import InstitutionService from "../../services/Institution.service";
import HealthService from "../../services/Health.service";

const USER_TYPE_PATIENT = "";
const USER_TYPE_AGENT = "";

module.exports = {

    Mutation: {

        async createAgent(obj, { roleId, email, prenom, nom, password, phoneNumber }) {
            return await InstitutionService.createAgent({ roleId, email, prenom, nom, password, phoneNumber });
        },

    },

    Query: {

        async findAllAgent() {
            return await InstitutionService.fetchAllAgents();
        },

        async findAgentById(obj, { id }) {
            return await InstitutionService.fetchAllAgents({ id });
        },

        async findAgentByUserId(obj, { userId }) {
            return await InstitutionService.fetchAllAgents({ userId });
        }

    },

};