import got from "got";

import accessEnv from '#root/helpers/accessEnv';

const HEALTH_SERVICES_URI = accessEnv(HEALTH_SERVICES_URI);

export default class HealthService {

    static async createPatient({ userId, mutuelleId, prenom, nom, sexe, dateNaissance,
        lieuNaissance, securiteSocial, situationFamiliale, profession, groupeSanguin, phoneNumber,
        email, createdBy, adress1, adress2, city, state, zip, country }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/patient`, {
            json: {
                userId, mutuelleId, prenom, nom, sexe, dateNaissance,
                lieuNaissance, securiteSocial, situationFamiliale, profession, groupeSanguin, phoneNumber,
                email, createdBy, adress1, adress2, city, state, zip, country
            }
        }).json();
        return body;
    }

    static async fetchAllPatients() {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient`).json();
        return body;
    }

    static async fetchPatientById(id) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient-by-id/${id}`).json();
        return body;
    }

    static async fetchPatientByAfiaId(afiaId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient-by-afiaid/${afiaId}`).json();
        return body;
    }

    static async fetchPatientByUserId(userId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient-by-userid/${userId}`).json();
        return body;
    }

    static async fetchAllPatientByAgentCreate(agentId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient-by-agent/${agentId}`).json();
        return body;
    }

    static async searchPatient(search) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/patient-search/${search}`).json();
        return body;
    }

    static async createMesure({ key, value, patientId, createdBy }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/mesure`, {
            json: { key, value, patientId, createdBy }
        }).json();
        return body;
    }

    static async fetchAllMesureByPatient(patientId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/mesure/${patientId}`).json();
        return body;
    }

    static async createAntecedent({ key, value, isSecure, patientId, createdBy }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/antecedent`, {
            json: { key, value, isSecure, patientId, createdBy }
        }).json();
        return body;
    }

    static async fetchAllAntecedentByPatient(patientId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/antecedent/${patientId}`).json();
        return body;
    }

    static async createVaccin({ vaccinAt, categorie, intitule, patientId,
        lot, rappelAt, commentaire, createdBy }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/vaccin`, {
            json: {
                vaccinAt, categorie, intitule, patientId,
                lot, rappelAt, commentaire, createdBy
            }
        }).json();
        return body;
    }

    static async fetchAllVaccinByPatient(patientId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/vaccin/${patientId}`).json();
        return body;
    }

    static async createContact({ nomComplet, phoneNumber, email, patientId,
        adresse, medecinTraitant, medecinReferent, correspodant, lienFamiliaux }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/contact`, {
            json: {
                omComplet, phoneNumber, email, patientId, adresse, medecinTraitant,
                medecinReferent, correspodant, lienFamiliaux
            }
        }).json();
        return body;
    }

    static async fetchAllContactByPatient(patientId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/contact/${patientId}`).json();
        return body;
    }

    static async createTraitement({ patientId, debutAt, finAt, intitule, commentaire, createdBy }) {
        const body = await got.post(`${HEALTH_SERVICES_URI}/traitement`, {
            json: { patientId, debutAt, finAt, intitule, commentaire, createdBy }
        }).json();
        return body;
    }

    static async fetchAllTraitementByPatient(patientId) {
        const body = await got.get(`${HEALTH_SERVICES_URI}/traitement/${patientId}`).json();
        return body;
    }


}