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
    // Type User
    newRole: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let title = req.body.title;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Role.findOne({
                    where: { title: title }
                }).then((roleFound) => {
                    done(null, roleFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (roleFound, done) => {
                if (!roleFound) {
                    done(null, roleFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Cet type existe déjà'
                    });
                }
            },
            (roleFound, done) => {
                let newRole = models.Role.create({
                    title: title,
                    status: 1
                }).then((newRole) => {
                    done(newRole);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newRole) => {
            if (newRole) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newRole
                });
            } else {
                return res.status(500).json();
            }
        });

    },

    getAllRole: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Role.findAll({
            where: { status: 1 },
            order: [['title', 'asc']]
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
                    'message': 'Impossible de trouver un ou plusieurs types établissements'
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

    deleteRole: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let roleId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Role.destroy({
            where: { id: roleId }
        }).then((result) => {
            return res.status(201).json({
                'status': 'Success',
                'code': 201,
            });
        }).catch((err) => {
            return res.status(500).json({
                'status': 'Error',
                'code': 500,
                'message': err
            });
        })
    },

    // User

    addNew: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

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
                    'message': 'Impossible de trouver un ou plusieurs établissements'
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
                    'message': 'Impossible de trouver un ou plusieurs établissements'
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
        let UserId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.User.findOne({
            where: { id: UserId },
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

    getAllByType: (req, res) => {
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
            where: { RoleId: type, status: 1 },
            attributes: ['id', 'name', 'description', 'phoneNumber', 'email', 'website', 'logo', 'image', 'adresse', 'expiredAt', 'status', 'createdAt', 'updatedAt'],
            include: [{ model: models.Role, required: true, attributes: ['id', 'title'] }],
            order: [['name', 'asc']]
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
                    'message': 'Impossible de trouver un ou plusieurs établissements de ce type'
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

    update: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let UserId = req.body.id;
        let type = req.body.type;
        let name = req.body.name;
        let description = req.body.description;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let website = req.body.website;
        let adresse = req.body.adresse;
        let expiredAt = req.body.expiredAt;

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: UserId }
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
                        name: (name ? name : userFound.name),
                        description: (description ? description : userFound.description),
                        phoneNumber: (phoneNumber ? phoneNumber : userFound.phoneNumber),
                        email: (email ? email : userFound.email),
                        website: (website ? website : userFound.website),
                        adresse: (adresse ? adresse : userFound.adresse),
                        expiredAt: (expiredAt ? expiredAt : userFound.expiredAt),
                        RoleId: (type ? type : userFound.RoleId)
                    }, {
                        where: { id: UserId }
                    })
                        .then((UserUpdated) => {
                            done(UserUpdated);
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
        ], (UserUpdated) => {
            if (UserUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': UserUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    remove: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let UserId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                    where: { id: UserId }
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
                    if (userFound.status == 1) {
                        userFound.update({
                            status: 0
                        })
                            .then((UserUpdated) => {
                                done(UserUpdated);
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
                            .then((UserUpdated) => {
                                done(UserUpdated);
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
        ], (UserUpdated) => {
            if (UserUpdated) {
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