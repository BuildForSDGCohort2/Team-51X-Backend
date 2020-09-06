// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');
const moment = require('moment');
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require("path");
const Op = Sequelize.Op;

// Routes
module.exports = {

    addNew: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        let civilite = req.body.civilite;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let sexe = req.body.sexe;
        let dateNaissance = req.body.dateNaissance;
        let lieuNaissance = req.body.lieuNaissance;
        let securiteSocial = req.body.securiteSocial;
        let situationFamiliale = req.body.situationFamiliale;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let adresse = req.body.adresse;

        let username = prenom.trim().toLowerCase() + '.' + nom.trim().toLowerCase();
        let password = "123456";

        let expireAt = '2020-08-30';

        // if (user < 0)
        //     return res.status(401).json({
        //         'status': 'Unauthorized',
        //         'code': 401,
        //         'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
        //     });

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { username: username }
                }).then((userFound) => {
                    done(null, userFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (userFound, done) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        done(null, bcryptedPassword);
                    })
                } else {
                    return res.status(409).json({
                        'status': 'failed',
                        'code': 409,
                        'message': 'this username exist'
                    });
                }
            },
            (bcryptedPassword, done) => {
                let newUser = models.User.create({
                    matricule: matricule,
                    civilite: civilite,
                    nom: nom,
                    prenom: prenom,
                    sexe: sexe,
                    phoneNumber: phoneNumber,
                    email: email,
                    securiteSocial: securiteSocial,
                    adresse: adresse,
                    username: username,
                    password: bcryptedPassword,
                    RoleId: role,
                    EtablissementId: etablissement,
                    DepartementId: departement
                })
                    .then((newUser) => {
                        done(newUser);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            }
        ], (newUser) => {
            if (newUser) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newUser
                });
            } else {
                return res.status(500).json({
                    'status': 'Error',
                    'code': 500,
                    'message': err
                });
            }
        });

    },

    getAll: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        // if (user < 0)
        //     return res.status(401).json({
        //         'status': 'Unauthorized',
        //         'code': 401,
        //         'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
        //     });

        models.User.findAll({
            attributes: ['id', 'matricule', 'civilite', 'nom', 'prenom', 'sexe', 'phoneNumber', 'email', 'securiteSocial', 'adresse', 'username', 'lastConnexion', 'expireAt', 'status', 'createdAt', 'updatedAt'],
            include: [
                { model: models.Role, required: true, attributes: ['id', 'title'] },
                { model: models.Etablissement, required: false, attributes: ['id', 'name'] },
                { model: models.Departement, required: false, attributes: ['id', 'title'] }
            ],
            order: [['prenom', 'asc']]
        }).then((result) => {
            if (result) {
                return res.status(201).json({
                    'status': 'Success',
                    'code': 201,
                    'data': result
                });
            } else {
                res.status(404).json({
                    'status': 'Not found',
                    'code': 404,
                    'message': 'Impossible de trouver un ou plusieurs utilisateurs'
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                'status': 'Error',
                'code': 500,
                'message': err
            });
        });
    },

    getAllActif: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        // if (user < 0)
        //     return res.status(401).json({
        //         'status': 'Unauthorized',
        //         'code': 401,
        //         'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
        //     });

        models.User.findAll({
            where: { status: 1 },
            attributes: ['id', 'matricule', 'civilite', 'nom', 'prenom', 'sexe', 'phoneNumber', 'email', 'securiteSocial', 'adresse', 'username', 'lastConnexion', 'expireAt', 'status', 'createdAt', 'updatedAt'],
            include: [
                { model: models.Role, required: true, attributes: ['id', 'title'] },
                { model: models.Etablissement, required: false, attributes: ['id', 'name'] },
                { model: models.Departement, required: false, attributes: ['id', 'title'] }
            ],
            order: [['prenom', 'asc']]
        }).then((result) => {
            if (result) {
                return res.status(201).json({
                    'status': 'Success',
                    'code': 201,
                    'data': result
                });
            } else {
                res.status(404).json({
                    'status': 'Not found',
                    'code': 404,
                    'message': 'Impossible de trouver un ou plusieurs utilisateurs'
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                'status': 'Error',
                'code': 500,
                'message': err
            });
        });
    },

    getById: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        let userId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.User.findOne({
            where: { id: userId },
            attributes: ['id', 'matricule', 'civilite', 'nom', 'prenom', 'sexe', 'phoneNumber', 'email', 'securiteSocial', 'adresse', 'username', 'lastConnexion', 'expireAt', 'status', 'createdAt', 'updatedAt'],
            include: [
                { model: models.Role, required: true, attributes: ['id', 'title'] },
                { model: models.Etablissement, required: false, attributes: ['id', 'name'] },
                { model: models.Departement, required: false, attributes: ['id', 'title'] }
            ]
        }).then((result) => {
            if (result) {
                return res.status(201).json({
                    'status': 'Success',
                    'code': 201,
                    'data': result
                });
            } else {
                res.status(404).json({
                    'status': 'Not found',
                    'code': 404,
                    'message': 'User introuvable'
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                'status': 'Error',
                'code': 500,
                'message': err
            });
        });
    },

    getAllByRole: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let type = req.params.type;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.User.findAll({
            where: { roleId: type, status: 1 },
            attributes: ['id', 'matricule', 'civilite', 'nom', 'prenom', 'sexe', 'phoneNumber', 'email', 'securiteSocial', 'adresse', 'username', 'lastConnexion', 'expireAt', 'status', 'createdAt', 'updatedAt'],
            include: [
                { model: models.Role, required: true, attributes: ['id', 'title'] },
                { model: models.Etablissement, required: false, attributes: ['id', 'name'] },
                { model: models.Departement, required: false, attributes: ['id', 'title'] }
            ],
            order: [['prenom', 'asc']]
        }).then((result) => {
            if (result) {
                return res.status(201).json({
                    'status': 'Success',
                    'code': 201,
                    'data': result
                });
            } else {
                res.status(404).json({
                    'status': 'Not found',
                    'code': 404,
                    'message': 'Impossible de trouver un ou plusieurs utilisateurs'
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                'status': 'Error',
                'code': 500,
                'message': err
            });
        });
    },

    updateProfile: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let securiteSocial = req.body.securiteSocial;
        let adresse = req.body.adresse;

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: user }
                })
                    .then((userFound) => {
                        done(null, userFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (userFound, done) => {
                if (userFound) {
                    userFound.update({
                        nom: (nom ? nom : userFound.nom),
                        prenom: (prenom ? prenom : userFound.prenom),
                        phoneNumber: (phoneNumber ? phoneNumber : userFound.phoneNumber),
                        email: (email ? email : userFound.email),
                        securiteSocial: (securiteSocial ? securiteSocial : userFound.securiteSocial),
                        adresse: (adresse ? adresse : userFound.adresse)
                    }, {
                        where: { id: UserId }
                    })
                        .then((userUpdated) => {
                            done(userUpdated);
                        })
                        .catch((err) => {
                            return res.status(500).json({
                                'status': 'Error',
                                'code': 500,
                                'message': err
                            });
                        })
                }
            }
        ], (userUpdated) => {
            if (userUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': userUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    updatePassword: (req, res) => {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        let curenentPassword = req.body.curenentPassword;
        let newPassword = req.body.newPassword;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: user }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                    .catch(function (err) {
                        return res.status(500);
                    });
            },
            (userFound, done) => {
                if (userFound) {
                    bcrypt.compare(curenentPassword, userFound.password, (errBycrypt, resBycrypt) => {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({
                        'status': 'Not found',
                        'code': 404,
                        'message': 'Utilisateur introuvable'
                    });
                }
            },
            (userFound, resBycrypt, done) => {
                if (resBycrypt) {
                    bcrypt.hash(newPassword, 5, (err, bcryptedPassword) => {
                        done(userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(403).json({
                        'status': 'Falled',
                        'code': 403,
                        'message': 'Votre ancien mot de passe est incorrect'
                    });
                }
            },
        ], (userFound, bcryptedPassword) => {
            if (userFound && bcryptedPassword) {

                userFound.update({ password: bcryptedPassword }, {
                    where: { id: userFound.id }
                });

                return res.status(201).json({
                    'status': 'success',
                    'code': 201
                });
            } else {
                return res.status(500).json({
                    'status': 'error',
                    'code': 500,
                    'message': 'Une erreur interne s\'est produite'
                });
            }
        });
    },

    update: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let userId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let role = req.body.role;
        let etablissement = req.body.etablissement;
        let departement = req.body.departement;
        let matricule = req.body.matricule;
        let civilite = req.body.civilite;
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let sexe = req.body.sexe;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let securiteSocial = req.body.securiteSocial;
        let adresse = req.body.adresse;
        let username = req.body.username;
        let password = req.body.password;
        let expireAt = req.body.expireAt;

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: user }
                })
                    .then((userFound) => {
                        done(null, userFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (userFound, done) => {
                if (userFound) {
                    userFound.update({
                        roleId: (role ? role : userFound.roleId),
                        etablissementId: (etablissement ? etablissement : userFound.etablissementId),
                        departementId: (departement ? departement : userFound.departementId),
                        matricule: (matricule ? matricule : userFound.matricule),
                        civilite: (civilite ? civilite : userFound.civilite),
                        nom: (nom ? nom : userFound.nom),
                        prenom: (prenom ? prenom : userFound.prenom),
                        sexe: (sexe ? sexe : userFound.sexe),
                        phoneNumber: (phoneNumber ? phoneNumber : userFound.phoneNumber),
                        email: (email ? email : userFound.email),
                        securiteSocial: (securiteSocial ? securiteSocial : userFound.securiteSocial),
                        adresse: (adresse ? adresse : userFound.adresse),
                        username: (username ? username : userFound.username),
                        password: (password ? password : userFound.password),
                        expireAt: (expireAt ? expireAt : userFound.expireAt)
                    }, {
                        where: { id: UserId }
                    })
                        .then((userUpdated) => {
                            done(userUpdated);
                        })
                        .catch((err) => {
                            return res.status(500).json({
                                'status': 'Error',
                                'code': 500,
                                'message': err
                            });
                        })
                }
            }
        ], (userUpdated) => {
            if (userUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': userUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    remove: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let userId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then((userFound) => {
                        done(null, userFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            },
            (userFound, done) => {
                if (userFound) {
                    if (userFound.status === 1) {
                        userFound.update({
                            status: 0
                        })
                            .then((userUpdated) => {
                                done(userUpdated);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'status': 'Error',
                                    'code': 500,
                                    'message': err
                                });
                            });
                    } else {
                        userFound.update({
                            status: 1
                        })
                            .then((userUpdated) => {
                                done(userUpdated);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'status': 'Error',
                                    'code': 500,
                                    'message': err
                                });
                            });
                    }
                } else {
                    return res.status(404).json({
                        'status': 'Not found',
                        'code': 404,
                    });
                }
            }
        ], (userUpdated) => {
            if (userUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201
                });
            } else {
                return res.status(500).json();
            }
        })
    }
}