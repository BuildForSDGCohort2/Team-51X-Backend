const Sequelize = require("sequelize");
const models = require('../../database/models');
import generateAfiaId from '#root/helpers/generateAfiaID';
import generateCode from '#root/helpers/generateCode';

const Op = Sequelize.Op;

const setupRoutes = app => {

    // Patients

    app.post('/patient', async (req, res, next) => {
        if (!req.body.nom || !req.body.prenom ||
            req.body.sexe || req.body.dateNaissance || req.body.lieuNaissance ||
            req.body.phoneNumber || !req.body.adress1 || req.body.city || req.body.state || req.body.country) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Agent.findOne({
            where: {
                prenom: req.body.prenom,
                nom: req.body.nom,
                phoneNumber: req.body.phoneNumber
            }
        });
        if (exist) return next(new Error('This patient already exist'));

        let addAdress = null;
        try {
            addAdress = await models.Adresse.create({
                adress1: req.body.adress1, adress2: req.body.adress2, city: req.body.city,
                state: req.body.state, zip: req.body.zip, country: req.body.country
            });
        } catch (e) {
            return next(e);
        }

        try {
            const newPatient = await models.Patient.create({
                afiaId: generateAfiaId(1),
                userId: req.body.userId,
                mutuelleId: req.body.mutuelleId,
                adresseId: addAdress.id,
                prenom: req.body.prenom,
                nom: req.body.nom,
                sexe: req.body.sexe,
                dateNaissance: req.body.dateNaissance,
                lieuNaissance: req.body.lieuNaissance,
                securiteSocial: req.body.securiteSocial,
                situationFamiliale: req.body.situationFamiliale,
                profession: req.body.profession,
                groupeSanguin: req.body.groupeSanguin,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                createdBy: req.body.createdBy
            });
            return res.json(newPatient);
        } catch (e) {
            return next(e);
        }

    })

    app.get('/patient', async (req, res, next) => {
        try {
            const patients = await models.Patient.findAll({
                include: [
                    { model: models.Adresse, as: "adresse" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(patients);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/patient-by-id/:id', async (req, res, next) => {
        try {
            const patient = await models.Patient.findOne({
                where: { id: req.params.id },
                include: [
                    { model: models.Adresse, as: "adresse" }
                ]
            });
            return res.json(patient);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/patient-by-afiaid/:afiaId', async (req, res, next) => {
        try {
            const patient = await models.Patient.findOne({
                where: { afiaId: req.params.afiaId },
                include: [
                    { model: models.Adresse, as: "adresse" }
                ]
            });
            return res.json(patient);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/patient-by-userid/:userId', async (req, res, next) => {
        try {
            const patient = await models.Patient.findOne({
                where: { userId: req.params.userId },
                include: [
                    { model: models.Adresse, as: "adresse" }
                ]
            });
            return res.json(patient);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/patient-by-agent/:agentId', async (req, res, next) => {
        try {
            const patient = await models.Patient.findAll({
                where: { createdBy: req.params.agentId },
                include: [
                    { model: models.Adresse, as: "adresse" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(patient);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/patient-search/:search', async (req, res, next) => {
        try {
            const patient = await models.Patient.findAll({
                where: {
                    [Op.or]: [{ nom: { [Op.substring]: `${req.params.search}` } },
                    { prenom: { [Op.substring]: `${req.params.search}` } },
                    { afiaId: { [Op.substring]: `${req.params.search}` } },
                    { securiteSocial: { [Op.substring]: `${req.params.search}` } },
                    { phoneNumber: { [Op.substring]: `${req.params.search}` } }]
                },
                include: [
                    { model: models.Adresse, as: "adresse" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(patient);
        } catch (e) {
            return next(e);
        }
    });

    // Mesures

    app.post('/mesure', async (req, res, next) => {
        if (!req.body.key || req.body.value || !req.body.patientId || !req.body.createdBy) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Mesure.findOne({
            where: { key: req.body.key }
        });
        if (exist) return next(new Error('This mesure name already exist'));

        try {
            const newMesure = await models.Mesure.create({
                key: req.body.key,
                value: req.body.value,
                patientId: req.body.patientId,
                createdBy: req.body.createdBy
            });
            return res.json(newMesure);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/mesure/:patientId', async (req, res, next) => {
        try {
            const mesures = await models.Mesure.findAll({
                where: { patientId: req.params.patientId }
            });
            return res.json(mesures);
        } catch (e) {
            return next(e);
        }
    });

    // Antécedents
    app.post('/antecedent', async (req, res, next) => {
        if (!req.body.key || req.body.value || !req.body.patientId || !req.body.createdBy) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Antecedent.findOne({
            where: { key: req.body.key }
        });
        if (exist) return next(new Error('This antecedent already exist'));

        try {
            const newAntecedent = await models.Antecedent.create({
                key: req.body.key,
                value: req.body.value,
                isSecure: req.body.isSecure,
                patientId: req.body.patientId,
                createdBy: req.body.createdBy
            });
            return res.json(newAntecedent);
        } catch (e) {
            return next(e);
        }
    });

    app.get('antecedent/:patientId', async (req, res, next) => {
        try {
            const antecedents = await models.Antecedent.findAll({
                where: { patientId: req.params.patientId }
            });
            return res.json(antecedents);
        } catch (e) {
            return next(e);
        }
    });

    //Vaccins
    app.post('/vaccin', async (req, res, next) => {
        if (!req.body.vaccinAt || req.body.categorie || !req.body.patientId ||
            !req.body.createdBy || !req.body.intitule || !req.body.lot) {
            return next(new Error("Missing mandatory information!"));
        }

        try {
            const newVaccin = await models.Vaccin.create({
                vaccinAt: req.body.vaccinAt,
                categorie: req.body.categorie,
                intitule: req.body.intitule,
                patientId: req.body.patientId,
                lot: req.body.lot,
                rappelAt: req.body.rappelAt,
                commentaire: req.body.commentaire,
                createdBy: req.body.createdBy
            });
            return res.json(newVaccin);
        } catch (e) {
            return next(e);
        }
    });

    app.get('vaccin/:patientId', async (req, res, next) => {
        try {
            const vaccins = await models.Vaccin.findAll({
                where: { patientId: req.params.patientId }
            });
            return res.json(vaccins);
        } catch (e) {
            return next(e);
        }
    });

    // Contacts
    app.post('/contact', async (req, res, next) => {
        if (!req.body.nomComplet || req.body.phoneNumber || !req.body.patientId) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Contact.findOne({
            where: {
                nomComplet: req.body.nomComplet,
                patientId: req.body.patientId, phoneNumber: req.body.phoneNumber
            }
        });
        if (exist) return next(new Error('This contact already exist'));

        try {
            const newContact = await models.Contact.create({
                nomComplet: req.body.nomComplet,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                patientId: req.body.patientId,
                adresse: req.body.adresse,
                medecinTraitant: req.body.medecinTraitant,
                medecinReferent: req.body.medecinReferent,
                correspodant: req.body.correspodant,
                lienFamiliaux: req.body.lienFamiliaux
            });
            return res.json(newContact);
        } catch (e) {
            return next(e);
        }
    });

    app.get('contact/:patientId', async (req, res, next) => {
        try {
            const contacts = await models.Contact.findAll({
                where: { patientId: req.body.patientId }
            });
            return res.json(contacts);
        } catch (e) {
            return next(e);
        }
    });

    // Traitements
    app.post('/traitement', async (req, res, next) => {
        if (!req.body.patientId || req.body.debutAt || !req.body.finAt || !req.body.intitule) {
            return next(new Error("Missing mandatory information!"));
        }

        try {
            const newTraitement = await models.Traitement.create({
                code: generateCode('TR'),
                patientId: req.body.patientId,
                debutAt: req.body.debutAt,
                finAt: req.body.finAt,
                intitule: req.body.intitule,
                commentaire: req.body.commentaire,
                createdBy: req.body.createdBy
            });
            return res.json(newTraitement);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/traitement/:patientId', async (req, res, next) => {
        try {
            const traitements = await models.Traitement.findAll({
                where: { patientId: req.params.patientId },
                order: [['createdAt', 'desc']]
            });
            return res.json(traitements);
        } catch (e) {
            return next(e);
        }
    });

    // Prescriptions
    app.post('/prescription', async (req, res, next) => {
        if (!req.body.consultationId || req.body.debutAt || !req.body.finAt || !req.body.intitule) {
            return next(new Error("Missing mandatory information!"));
        }

    });

};

export default setupRoutes;