const models = require('../../database/models');

const setupRoutes = app => {

    // Type Institutions

    app.post('/type', async (req, res, next) => {
        if (!req.body.title) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Type.findOne({ where: { title: req.body.title } });

        if (exist) return next(new Error('This institution type name already used'));

        try {
            const newType = await models.Type.create({ title: req.body.title });
            return res.json(newType);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/type', async (req, res, next) => {
        const type = await models.Type.findAll();
        return res.json(type);
    });

    // Institutions

    app.post('/institution', async (req, res, next) => {
        if (!req.body.typeId || !req.body.name || !req.body.phoneNumber ||
            !req.body.adress1 || req.body.city || req.body.state || req.body.country) {
            return next(new Error("Missing mandatory information!"));
        }

        const institutionFound = await models.Institution.findOne({
            where: { name: req.body.name, phoneNumber: req.body.phoneNumber }
        });

        if (institutionFound) return next(new Error('This institution name already used'));

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

            const newInstitution = await models.Institution.create({
                typeId: req.body.typeId,
                adresseId: addAdress.id,
                name: req.body.name,
                description: req.body.description,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                website: req.body.website
            });

            return res.json(newInstitution);

        } catch (e) {
            return next(e);
        }
    });

    app.get('/institution', async (req, res, next) => {
        try {
            const hospital = await models.Institution.findAll({
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Type, as: "type" }
                ],
                order: [['name', 'asc']]
            });
            return res.json(hospital);
        } catch (e) {
            return next(e)
        }
    });

    app.get('/institution-by-id', async (req, res, next) => {
        const hospital = await models.Institution.findOne({
            where: { id: req.body.id },
            include: [
                { model: models.Adresse, as: "adresse" },
                { model: models.Type, as: "type" }
            ]
        });;
        return res.json(hospital);
    });

    app.get('/institution-by-type', async (req, res, next) => {
        const hospital = await models.Institution.findAll({
            where: { typeId: req.body.typeId },
            include: [
                { model: models.Adresse, as: "adresse" },
                { model: models.Type, as: "type" }
            ]
        });;
        return res.json(hospital);
    })

    // Departements
    app.post('/departement', async (req, res, next) => {
        if (!req.body.institutionId || !req.body.title) {
            return next(new Error("Missing mandatory information!"));
        }
        const exist = await models.Departement.findOne({ where: { title: req.body.title } });
        if (exist) return next(new Error('This departement name already exist'));
        try {
            const departement = await models.Departement.create({
                institutionId: req.body.institutionId,
                title: req.body.title,
                description: req.body.description
            });
            return res.json(departement);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/departement', async (req, res, next) => {
        const departement = await models.Departement.findAll();
        return res.json(departement);
    });

    // Agents
    app.post('/fonction', async (req, res, next) => {
        if (!req.body.title) {
            return next(new Error("Missing mandatory information!"));
        }
        const exist = await models.Fonction.findOne({ where: { title: req.body.title } });
        if (exist) return next(new Error('This fonction name already exist'));
        try {
            const role = await models.Fonction.create({ title: req.body.title });
            return res.json(role);
        } catch (e) {
            return next(e)
        }
    });

    app.get('/fonction', async (req, res, next) => {
        const roles = await models.Fonction.findAll();
        return res.json(roles);
    });

    // Agents
    app.post('/agent', async (req, res, next) => {
        if (!req.body.fonctionId || !req.body.civilite || !req.body.prenom ||
            req.body.sexe || req.body.phoneNumber || req.body.userId ||
            !req.body.adress1 || req.body.city || req.body.state || req.body.country) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Agent.findOne({
            where: {
                prenom: req.body.prenom,
                nom: req.body.nom,
                phoneNumber: req.body.phoneNumber
            }
        });
        if (exist) return next(new Error('This Agent already exist'));

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
            const newAgent = await models.Agent.create({
                fonctionId: req.body.fonctionId,
                institutionId: req.body.institutionId,
                departementId: req.body.departementId,
                adresseId: addAdress.id,
                userId: req.body.userId,
                matricule: req.body.matricule,
                civilite: req.body.civilite,
                nom: req.body.nom,
                prenom: req.body.prenom,
                sexe: req.body.sexe,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                securiteSocial: req.body.securiteSocial
            });
            return res.json(newAgent);
        } catch (e) {
            return next(e)
        }
    });

    app.get('/agent', async (req, res, next) => {
        try {
            const agents = await models.Agent.findAll({
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Fonction, as: "fonction" },
                    { model: models.Institution, as: "institution" },
                    { model: models.Departement, as: "departement" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(agents);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/agent-by-id/:id', async (req, res, next) => {
        try {
            const agent = await models.Agent.findOne({
                where: { id: req.params.id },
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Fonction, as: "fonction" },
                    { model: models.Institution, as: "institution" },
                    { model: models.Departement, as: "departement" }
                ]
            });
            return res.json(agent);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/agent-by-userid/:userId', async (req, res, next) => {
        try {
            const agent = await models.Agent.findOne({
                where: { userId: req.params.userId },
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Fonction, as: "fonction" },
                    { model: models.Institution, as: "institution" },
                    { model: models.Departement, as: "departement" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(agent);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/agent-by-fonction', async (req, res, next) => {
        try {
            const agent = await models.Agent.findAll({
                where: { fonctionId: req.body.fonctionId },
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Fonction, as: "fonction" },
                    { model: models.Institution, as: "institution" },
                    { model: models.Departement, as: "departement" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(agent);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/agent-by-institution', async (req, res, next) => {
        try {
            const agent = await models.Agent.findAll({
                where: { institutionId: req.body.institutionId },
                include: [
                    { model: models.Adresse, as: "adresse" },
                    { model: models.Fonction, as: "fonction" },
                    { model: models.Institution, as: "institution" },
                    { model: models.Departement, as: "departement" }
                ],
                order: [['prenom', 'asc']]
            });
            return res.json(agent);
        } catch (e) {
            return next(e);
        }
    });

    // Mutuelles
    app.post('/mutuelle', async (req, res, next) => {
        if (!req.body.institutionId || req.body.title) {
            return next(new Error("Missing mandatory information!"));
        }

        const exist = await models.Mutuelle.findOne({
            where: { title: req.body.title, institutionId: req.body.institutionId }
        });
        if (exist) return next(new Error('This mutuelle name already exist'));

        try {
            const newMutuelle = await models.Mutuelle.create({
                institutionId: req.body.institutionId,
                title: req.body.title,
                description: req.body.description,
                garantieEffective: req.body.garantieEffective,
                indicateurTraitement: req.body.indicateurTraitement,
                periodeValidite: req.body.periodeValidite
            });
            return res.json(newMutuelle);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/mutuelle', async (req, res, next) => {
        try {
            const mutuelles = await models.Mutuelle.findAll({
                include: [
                    { model: models.Institution, as: "institution" }
                ],
                order: [['title', 'asc']]
            });
            return res.json(mutuelles);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/mutuelle-by-id', async (req, res, next) => {
        try {
            const mutuelles = await models.Mutuelle.findOne({
                where: { id: req.body.id },
                include: [
                    { model: models.Institution, as: "institution" }
                ]
            });
            return res.json(mutuelles);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/mutuelle-by-institution', async (req, res, next) => {
        try {
            const mutuelles = await models.Mutuelle.findAll({
                where: { institutionId: req.body.institutionId },
                include: [
                    { model: models.Institution, as: "institution" }
                ],
                order: [['title', 'asc']]
            });
            return res.json(mutuelles);
        } catch (e) {
            return next(e);
        }
    });
};

export default setupRoutes;