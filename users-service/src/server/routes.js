import Nexmo from 'nexmo';
import sgTransport from 'nodemailer-sendgrid-transport';
import nodemailer from 'nodemailer';

import models from '../../database/models';
import hashPassword from '#root/helpers/hashPassword';
import passwordCompareSync from '#root/helpers/passwordCompareSync';
import generateSessionToken from '#root/helpers/generateSessionToken';
import mailTemplate from '#root/helpers/mailTemplate';
import getUserIdOnToken from '../helpers/getUserIdOnToken';

const setupRoutes = app => {

    // Users

    const nexmo = new Nexmo({ apiKey: 'df5fdcc0', apiSecret: 'oLfLXCcdrAzLf8QU' });

    app.post('/activation', async (req, res, next) => {
        let token = req.body.token;
        let userId = getUserIdOnToken(token);

        if (userId < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'The activation link has expired'
            });
        
        const user = await models.User.findOne({
            where: { id: userId },
            include: [{ model: models.Role, as: "role" }],
        });

        if (!user) return res.status(403).json({
            status: 'User not found',
            code: 403
        });

        await user.update({status: 1, verified: true});

        return res.status(200).json(user);
    });

    app.get('/sendSms/:phone', async (req, res, next) => {

        if (!req.params.phone) {
            return next(new Error("Missing mandatory information!"));
        }

        const smsCode = Math.floor(Math.random() * Math.floor(987654));
        const from = 'AFIAMED';
        const to = req.body.phoneNumber;
        const text = 'AFIAMED : Thank you for your registration, your verification code is ' + smsCode;

        const users = await models.User.findOne({ where: { phoneNumber: req.body.phoneNumber } });

        if (users) return next(new Error("This username already used"));

        try {
            nexmo.message.sendSms(from, to, text, (err, responseData) => {
                if (err) return err;
                if (responseData.messages[0]['status'] === "0") {
                    const smsResponse = {
                        phoneNumber: to,
                        smsCode: smsCode
                    };
                    return res.json(smsResponse);
                } else {
                    return next(new Error(`Message failed with error: ${responseData.messages[0]['error-text']}`))
                }
            })
        } catch (e) {
            return next(e);
        }
    })

    app.post('/session', async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return next(new Error("Missing mandatory information!"));
        }
        try {
            const userFound = await models.User.findOne({
                attributes: {},
                where: { email: req.body.email }
            });

            if (!userFound) return next(new Error("Incorect email adress or password !"));

            if (!passwordCompareSync(req.body.password, userFound.password)) {
                return next(new Error("Incorect email adress or password !"));
            }

            if (userFound.status != 1) return next(new Error('Your account is not activated, please activate it !'));

            const jwtToken = await generateSessionToken(userFound);

            await userFound.update({
                sessionAt: new Date(),
                refreshToken: jwtToken
            });

            const userRole = await models.Role.findOne({ where: { id: userFound.roleId } });

            const userSession = {
                id: userFound.id,
                roleId: userFound.roleId,
                nom: userFound.nom,
                prenom: userFound.prenom,
                email: userFound.email,
                role: userRole,
                status: userFound.status,
                verified: userFound.verified,
                expiresAt: userFound.expiresAt,
                createdAt: userFound.createdAt,
                avatar: userFound.avatar,
                updatedAt: userFound.updatedAt,
                jwtToken: generateSessionToken(userFound),
            }

            return res.json(userSession);

        } catch (e) {
            return next(e);
        }
    })

    app.post('/users', async (req, res, next) => {
        if (!req.body.email || !req.body.password || !req.body.prenom ||
            !req.body.nom || !req.body.roleId) {
            return next(new Error("Missing mandatory information!"));
        }

        const userExist = await models.User.findOne({
            where: { email: req.body.email }
        });

        if (userExist) return next(new Error('This email already used'));

        const phoneExist = await models.User.findOne({
            where: { phoneNumber: req.body.phoneNumber }
        });

        if (phoneExist) return next(new Error('This phone number already used'));

        let expireAt = new Date();
        expireAt.setDate(expireAt.getDate() + 365);

        try {
            const newUser = await models.User.create({
                roleId: req.body.roleId,
                prenom: req.body.prenom,
                nom: req.body.nom,
                email: req.body.email,
                password: hashPassword(req.body.password),
                phoneNumber: req.body.phoneNumber,
                expiresAt: expireAt
            });

            let options = {
                auth: {
                    api_user: 'dev@astechcongo.com',
                    api_key: 'AstechDev@2020'
                }
            }
    
            let client = nodemailer.createTransport(sgTransport(options));
    
            let email = {
                from: 'Afiamed <noreply@afiamed.com>',
                to: newUser.email,
                subject: 'AfiaMed account creation',
                html: mailTemplate(newUser.prenom, generateSessionToken(newUser))
            };
    
            await client.sendMail(email, function (err, info) {
                if (err) {
                    return next(err);
                }
                else {
                    console.log('Success !');
                }
            });
            return res.json(newUser);
        } catch (e) {
            return next(e);
        }
    });

    // Roles
    app.post('/roles', async (req, res, next) => {
        if (!req.body.title) {
            return next(new Error("Missing mandatory information"));
        }
        try {
            const exist = await models.Role.findOne({
                where: { title: req.body.title }
            });

            if (!exist) {
                const newRole = await models.Role.create({
                    title: req.body.title
                });
                return res.json(newRole);
            }
            return next(new Error("Exist information"));
        } catch (e) {
            return next(e);
        }
    });

    // Modules

    app.post('/modules', async (req, res, next) => {
        if (!req.body.title) {
            return next(new Error("Missing mandatory information"));
        }
        try {
            const newModule = await models.Module.create({
                title: req.body.title,
                description: req.body.description
            });
            return res.json(newModule);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/users', async (req, res, next) => {
        try {
            const users = await models.User.findAll({
                include: [{ model: models.Role, as: "role" }],
                order: [['prenom', 'asc']]
            });
            return res.json(users);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/users/:id', async (req, res, next) => {
        try {
            const users = await models.User.findOne({
                where: { id: req.params.id, status: 1 },
                include: [{ model: models.Role, as: "role" }],
                order: [['prenom', 'asc']]
            });
            return res.json(users);
        } catch (e) {
            return next(e);
        }
    });

    app.get('/roles', async (req, res, next) => {
        const roles = await models.Role.findAll();
        return res.json(roles);
    });

    app.get('/events', async (req, res, next) => {
        const events = await models.Event.findAll();
        return res.json(events);
    });

    app.get('/modules', async (req, res, next) => {
        const modules = await models.Module.findAll();
        return res.json(modules);
    })

};

export default setupRoutes;