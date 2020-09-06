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
        let profession = req.body.profession;
        let groupeSanguin = req.body.groupeSanguin;
        let rfid = req.body.rfid;
        let adresse = req.body.adresse;
        let telMobile = req.body.telMobile;
        let telDomicile = req.body.telDomicile;
        let telPro = req.body.telPro;
        let email = req.body.email;
        let mutuelle = req.body.mutuelle;

        let username = prenom.trim().toLowerCase() + '.' + nom.trim().toLowerCase();
        let password = "123456";

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Patient.findOne({
                    where: { username: username }
                }).then((patientFound) => {
                    done(null, patientFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (patientFound, done) => {
                if (!patientFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        done(null, bcryptedPassword);
                    })
                } else {
                    return res.status(409).json({
                        'status': 'failed',
                        'code': 409,
                        'message': 'This username exist'
                    });
                }
            },
            (bcryptedPassword, done) => {
                let newPatient = models.Patient.create({
                    civilite: civilite,
                    nom: nom,
                    prenom: prenom,
                    sexe: sexe,
                    dateNaissance: dateNaissance,
                    lieuNaissance: lieuNaissance,
                    securiteSocial: securiteSocial,
                    situationFamiliale: situationFamiliale,
                    profession: profession,
                    groupeSanguin: groupeSanguin,
                    rfid: rfid,
                    adresse: adresse,
                    username: username,
                    password: bcryptedPassword,
                    telMobile: telMobile,
                    telDomicile: telDomicile,
                    telPro: telPro,
                    email: email,
                    createdBy: user,
                    MutuelleId: mutuelle,
                })
                    .then((newPatient) => {
                        done(newPatient);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            }
        ], (newPatient) => {
            if (newPatient) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newPatient
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

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Patient.findAll({
            attributes: ['id', 'civilite', 'nom', 'prenom', 'sexe', 'phoneNumber', 'email', 'securiteSocial', 'adresse', 'username', 'lastConnexion', 'expireAt', 'status', 'createdAt', 'updatedAt'],
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

        models.Patient.findAll({
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

        models.Patient.findOne({
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

        models.Patient.findAll({
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
                models.Patient.findOne({
                    where: { id: user }
                })
                    .then((patientFound) => {
                        done(null, patientFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (patientFound, done) => {
                if (patientFound) {
                    patientFound.update({
                        nom: (nom ? nom : patientFound.nom),
                        prenom: (prenom ? prenom : patientFound.prenom),
                        phoneNumber: (phoneNumber ? phoneNumber : patientFound.phoneNumber),
                        email: (email ? email : patientFound.email),
                        securiteSocial: (securiteSocial ? securiteSocial : patientFound.securiteSocial),
                        adresse: (adresse ? adresse : patientFound.adresse)
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
                models.Patient.findOne({
                    where: { id: user }
                }).then(function (patientFound) {
                    done(null, patientFound);
                })
                    .catch(function (err) {
                        return res.status(500);
                    });
            },
            (patientFound, done) => {
                if (patientFound) {
                    bcrypt.compare(curenentPassword, patientFound.password, (errBycrypt, resBycrypt) => {
                        done(null, patientFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({
                        'status': 'Not found',
                        'code': 404,
                        'message': 'Utilisateur introuvable'
                    });
                }
            },
            (patientFound, resBycrypt, done) => {
                if (resBycrypt) {
                    bcrypt.hash(newPassword, 5, (err, bcryptedPassword) => {
                        done(patientFound, bcryptedPassword);
                    });
                } else {
                    return res.status(403).json({
                        'status': 'Falled',
                        'code': 403,
                        'message': 'Votre ancien mot de passe est incorrect'
                    });
                }
            },
        ], (patientFound, bcryptedPassword) => {
            if (patientFound && bcryptedPassword) {

                patientFound.update({ password: bcryptedPassword }, {
                    where: { id: patientFound.id }
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
                models.Patient.findOne({
                    where: { id: user }
                })
                    .then((patientFound) => {
                        done(null, patientFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (patientFound, done) => {
                if (patientFound) {
                    patientFound.update({
                        roleId: (role ? role : patientFound.roleId),
                        etablissementId: (etablissement ? etablissement : patientFound.etablissementId),
                        departementId: (departement ? departement : patientFound.departementId),
                        matricule: (matricule ? matricule : patientFound.matricule),
                        civilite: (civilite ? civilite : patientFound.civilite),
                        nom: (nom ? nom : patientFound.nom),
                        prenom: (prenom ? prenom : patientFound.prenom),
                        sexe: (sexe ? sexe : patientFound.sexe),
                        phoneNumber: (phoneNumber ? phoneNumber : patientFound.phoneNumber),
                        email: (email ? email : patientFound.email),
                        securiteSocial: (securiteSocial ? securiteSocial : patientFound.securiteSocial),
                        adresse: (adresse ? adresse : patientFound.adresse),
                        username: (username ? username : patientFound.username),
                        password: (password ? password : patientFound.password),
                        expireAt: (expireAt ? expireAt : patientFound.expireAt)
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
                models.Patient.findOne({
                    where: { id: userId }
                })
                    .then((patientFound) => {
                        done(null, patientFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            },
            (patientFound, done) => {
                if (patientFound) {
                    if (patientFound.status === 1) {
                        patientFound.update({
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
                        patientFound.update({
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