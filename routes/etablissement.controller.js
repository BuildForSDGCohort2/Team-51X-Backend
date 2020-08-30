// Imports
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Routes
module.exports = {
    // Type Etablissement
    newTypeEtablissement: (req, res) => {
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
                models.TypeEtablissement.findOne({
                    where: { title: title }
                }).then((typeFound) => {
                    done(null, typeFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (typeFound, done) => {
                if (!typeFound) {
                    done(null, typeFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Cet type existe déjà'
                    });
                }
            },
            (typeFound, done) => {
                let newType = models.TypeEtablissement.create({
                    title: title,
                    status: 1
                }).then((newType) => {
                    done(newType);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newType) => {
            if (newType) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newType
                });
            } else {
                return res.status(500).json();
            }
        });

    },

    getAllType: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.TypeEtablissement.findAll({
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

    deleteType: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let typeId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.TypeEtablissement.destroy({
            where: { id: typeId }
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

    // Etablissement

    newEtablissement: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        let type = req.body.type;
        let name = req.body.name;
        let description = req.body.description;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let website = req.body.website;
        let adresse = req.body.adresse;
        let expiredAt = req.body.expiredAt;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Etablissement.findOne({
                    where: { name: name, phoneNumber: phoneNumber, email: email }
                }).then((etablissementFound) => {
                    done(null, etablissementFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (etablissementFound, done) => {
                if (!etablissementFound) {
                    done(null, etablissementFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Cette établissement existe déjà'
                    });
                }
            },
            (etablissementFound, done) => {
                let newetablissement = models.Etablissement.create({
                    name: name,
                    description: description,
                    phoneNumber: phoneNumber,
                    email: email,
                    website: website,
                    adresse: adresse,
                    expiredAt: expiredAt,
                    status: 1,
                    TypeEtablissementId: type
                }).then((newetablissement) => {
                    done(newetablissement);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newetablissement) => {
            if (newetablissement) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newetablissement
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

        models.Etablissement.findAll({
            attributes: ['id', 'name', 'description', 'phoneNumber', 'email', 'website', 'logo', 'image', 'adresse', 'expiredAt', 'status', 'createdAt', 'updatedAt'],
            include: [{ model: models.TypeEtablissement, required: true, attributes: ['id', 'title'] }],
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

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Etablissement.findAll({
            where: { status: 1 },
            attributes: ['id', 'name', 'description', 'phoneNumber', 'email', 'website', 'logo', 'image', 'adresse', 'expiredAt', 'status', 'createdAt', 'updatedAt'],
            include: [{ model: models.TypeEtablissement, required: true, attributes: ['id', 'title'] }],
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

    getAllById: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let etablissementId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Etablissement.findOne({
            where: { id: etablissementId },
            attributes: ['id', 'name', 'description', 'phoneNumber', 'email', 'website', 'logo', 'image', 'adresse', 'expiredAt', 'status', 'createdAt', 'updatedAt'],
            include: [{ model: models.TypeEtablissement, required: true, attributes: ['id', 'title'] }]
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
                    'message': 'Etablissement introuvable'
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

        models.Etablissement.findAll({
            where: { typeEtablissementId: type, status: 1 },
            attributes: ['id', 'name', 'description', 'phoneNumber', 'email', 'website', 'logo', 'image', 'adresse', 'expiredAt', 'status', 'createdAt', 'updatedAt'],
            include: [{ model: models.TypeEtablissement, required: true, attributes: ['id', 'title'] }],
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

        let etablissementId = req.body.id;
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
                models.Etablissement.findOne({
                    where: { id: etablissementId }
                })
                    .then((etablissementFound) => {
                        done(null, etablissementFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (etablissementFound, done) => {
                if (etablissementFound) {
                    etablissementFound.update({
                        name: (name ? name : etablissementFound.name),
                        description: (description ? description : etablissementFound.description),
                        phoneNumber: (phoneNumber ? phoneNumber : etablissementFound.phoneNumber),
                        email: (email ? email : etablissementFound.email),
                        website: (website ? website : etablissementFound.website),
                        adresse: (adresse ? adresse : etablissementFound.adresse),
                        expiredAt: (expiredAt ? expiredAt : etablissementFound.expiredAt),
                        TypeEtablissementId: (type ? type : etablissementFound.typeEtablissementId)
                    }, {
                        where: { id: etablissementId }
                    })
                        .then((etablissementUpdated) => {
                            done(etablissementUpdated);
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
        ], (etablissementUpdated) => {
            if (etablissementUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': etablissementUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    remove: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let etablissementId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Etablissement.findOne({
                    where: { id: etablissementId }
                })
                    .then((etablissementFound) => {
                        done(null, etablissementFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            },
            (etablissementFound, done) => {
                if (etablissementFound) {
                    if (etablissementFound.status == 1) {
                        etablissementFound.update({
                            status: 0
                        })
                            .then((etablissementUpdated) => {
                                done(etablissementUpdated);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'status': 'Error',
                                    'code': 500,
                                    'message': err
                                });
                            });
                    } else {
                        etablissementFound.update({
                            status: 1
                        })
                            .then((etablissementUpdated) => {
                                done(etablissementUpdated);
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
        ], (etablissementUpdated) => {
            if (etablissementUpdated) {
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