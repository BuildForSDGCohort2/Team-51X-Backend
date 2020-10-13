import got from "got";
import accessEnv from '#root/helpers/accessEnv';

const INSTITUTION_SERVICES_URI = accessEnv("INSTITUTION_SERVICES_URI");

export default class InstitutionService {

    static async createInstitution({ typeId, name, description, phoneNumber, email, website,
        adress1, adress2, city, state, zip, country }) {
        const body = await got.post(`${INSTITUTION_SERVICES_URI}/institution`, {
            json: {
                typeId, name, description, phoneNumber, email, website,
                adress1, adress2, city, state, zip, country
            }
        }).json();
        return body;
    }

    static async fetchAllInstitutions() {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/institution`).json();
        return body;
    }

    static async createDepartement({ institutionId, title, description }) {
        const body = await got.post(`${INSTITUTION_SERVICES_URI}/departement`, {
            json: { institutionId, title, description }
        }).json();
        return body;
    }

    static async fetchAllDepartements() {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/departement`).json();
        return body;
    }

    static async createFonction({ title }) {
        const body = await got.post(`${INSTITUTION_SERVICES_URI}/fonction`, {
            json: { title }
        }).json();
        return body;
    }

    static async fetchAllFonctions() {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/fonction`).json();
        return body;
    }

    static async createAgent({ fonctionId, institutionId, departementId, userId, matricule,
        civilite, nom, prenom, sexe, phoneNumber, email, securiteSocial, adress1, adress2, city,
        state, zip, country }) {
        const body = await got.post(`${INSTITUTION_SERVICES_URI}/agent`, {
            json: {
                fonctionId, institutionId, departementId, userId, matricule,
                civilite, nom, prenom, sexe, phoneNumber, email, securiteSocial, adress1, adress2, city,
                state, zip, country
            }
        }).json();
        return body;
    }

    static async fetchAllAgents() {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/agent`).json();
        return body;
    }

    static async fetchAllAgentById(agentId) {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/agent-by-id/${agentId}`).json();
        return body;
    }

    static async fetchAllAgentById(userId) {
        const body = await got.get(`${INSTITUTION_SERVICES_URI}/agent-by-userid/${userId}`).json();
        return body;
    }

}