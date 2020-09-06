// Imports
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Routes
module.exports = {

    addNew: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        let code = req.body.code;
        let title = req.body.title;
        let montant = req.body.montant;
        let devise = req.body.devise;
        let etablissement = req.body.etablissement;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Prestation.findOne({
                    where: {
                        code: code
                    }
                }).then((prestationFound) => {
                    done(null, prestationFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (prestationFound, done) => {
                if (!prestationFound) {
                    done(null, prestationFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Cette mutuelle existe déjà'
                    });
                }
            },
            (prestationFound, done) => {
                let newMutuelle = models.Prestation.create({
                    title: title,
                    description: description,
                    garantieEffective: garantieEffective,
                    indicateurTraitement: indicateurTraitement,
                    periodeValidite: periodeValidite,
                    status: 1,
                    EtablissementId: etablissement
                }).then((newMutuelle) => {
                    done(newMutuelle);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newMutuelle) => {
            if (newMutuelle) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newMutuelle
                });
            } else {
                return res.status(500).json();
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

        models.Prestation.findAll({
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

    update: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let mutuelleId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let title = req.body.title;
        let description = req.body.description;
        let garantieEffective = req.body.garantieEffective;
        let indicateurTraitement = req.body.indicateurTraitement;
        let periodeValidite = req.body.periodeValidite;
        let etablissement = req.body.etablissement;

        asyncLib.waterfall([
            (done) => {
                models.Prestation.findOne({
                    where: { id: mutuelleId }
                })
                    .then((prestationFound) => {
                        done(null, prestationFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (prestationFound, done) => {
                if (prestationFound) {
                    prestationFound.update({
                        title: (title ? title : prestationFound.title),
                        description: (description ? description : prestationFound.description),
                        garantieEffective: (garantieEffective ? garantieEffective : prestationFound.garantieEffective),
                        indicateurTraitement: (indicateurTraitement ? indicateurTraitement : prestationFound.indicateurTraitement),
                        periodeValidite: (periodeValidite ? periodeValidite : prestationFound.periodeValidite),
                        etablissement: (etablissement ? etablissement : prestationFound.etablissement)
                    }, {
                        where: { id: mutuelleId }
                    })
                        .then((mutuelleUpdated) => {
                            done(mutuelleUpdated);
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
        ], (mutuelleUpdated) => {
            if (mutuelleUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': mutuelleUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    delete: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let mutuelleId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Prestation.findOne({
                    where: { id: mutuelleId }
                })
                    .then((prestationFound) => {
                        done(null, prestationFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            },
            (prestationFound, done) => {
                if (prestationFound) {
                    if (prestationFound.status === 1) {
                        prestationFound.update({
                            status: 0
                        })
                            .then((mutuelleUpdated) => {
                                done(mutuelleUpdated);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'status': 'Error',
                                    'code': 500,
                                    'message': err
                                });
                            });
                    } else {
                        prestationFound.update({
                            status: 1
                        })
                            .then((mutuelleUpdated) => {
                                done(mutuelleUpdated);
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
        ], (mutuelleUpdated) => {
            if (mutuelleUpdated) {
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