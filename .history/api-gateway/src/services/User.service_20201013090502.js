import got from "got";
import accessEnv from '#root/helpers/accessEnv';

const USERS_SERVICES_URI = accessEnv("USERS_SERVICES_URI");

export default class UsersService {

    static async verifyPhoneNumber({ phoneNumber }) {
        const body = await got.post(`${USERS_SERVICES_URI}/sendSms`, {
            json: {phoneNumber}
        }).json();
        return body;
    }

    static async accountActivation({token}) {
        const body = await got.post(`${USERS_SERVICES_URI}/activation`, {
            json: {token}
        }).json();
        return body;
    }

    static async createUserSession({ email, password }) {
        const body = await got.post(`${USERS_SERVICES_URI}/session`, {
            json: { email, password }
        }).json();
        return body;
    }

    static async createUser({roleId, email, prenom, nom, password, phoneNumber}) {
        const body = await got.post(`${USERS_SERVICES_URI}/users`, {
            json: {roleId, email, prenom, nom, password, phoneNumber}
        }).json();
        return body;
    }

    static async createRole({ title }) {
        const body = await got.post(`${USERS_SERVICES_URI}/roles`, {
            json: { title }
        }).json();
        return body;
    }

    static async fetchAllUsers() {
        const body = await got.get(`${USERS_SERVICES_URI}/users`).json();
        return body;
    }

    static async fetchAllUserById(userId) {
        const body = await got.get(`${USERS_SERVICES_URI}/users/${userId}`).json();
        return body;
    }

    static async fetchAllRoles() {
        const body = await got.get(`${USERS_SERVICES_URI}/roles`).json();
        return body;
    }

    static async fetchAllModule() {
        const body = await got.get(`${USERS_SERVICES_URI}/modules`).json();
        return body;
    }

    static async fetchAllEvent() {
        const body = await got.get(`${USERS_SERVICES_URI}/events`).json();
        return body;
    }
}

