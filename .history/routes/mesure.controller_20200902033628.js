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

        let key = req.body.key;
        let value = req.body.value;
        let createdBy = req.body.createdBy;
        let patient = req.body.patientId;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: {
                        key: key,
                        value: value,
                        patientId: patient
                    }
                }).then((mesureFound) => {
                    done(null, mesureFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (mesureFound, done) => {
                if (!mesureFound) {
                    done(null, mesureFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Ce mesure existe déjà'
                    });
                }
            },
            (mesureFound, done) => {
                let newMesure = models.Mesure.create({
                    key: key,
                    value: value,
                    createdBy: createdBy,
                    PatientId: patient
                }).then((newMesure) => {
                    done(newMesure);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newMesure) => {
            if (newMesure) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newMesure
                });
            } else {
                return res.status(500).json();
            }
        });

    },

    getAllByPatient: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let patient = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Mesure.findAll({
            where: { patientId: patient },
            order: [['updatedAt', 'desc']]
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
                    'message': 'Impossible de trouver un ou plusieurs mesures'
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
        let patient = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let key = req.body.key;
        let title = req.body.title;
        let montant = req.body.montant;
        let devise = req.body.devise;
        let etablissement = req.body.etablissement;

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: { id: patient }
                })
                    .then((mesureFound) => {
                        done(null, mesureFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (mesureFound, done) => {
                if (mesureFound) {
                    mesureFound.update({
                        code: (code ? code : mesureFound.code),
                        title: (title ? title : mesureFound.title),
                        montant: (montant ? montant : mesureFound.montant),
                        devise: (devise ? devise : mesureFound.devise),
                        etablissement: (etablissement ? etablissement : mesureFound.etablissement)
                    }, {
                        where: { id: prestationId }
                    })
                        .then((prestationUpdated) => {
                            done(prestationUpdated);
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
        ], (prestationUpdated) => {
            if (prestationUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': prestationUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    delete: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let prestationId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: { id: prestationId }
                })
                    .then((mesureFound) => {
                        done(null, mesureFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    });
            },
            (mesureFound, done) => {
                if (mesureFound) {
                    if (mesureFound.status === 1) {
                        mesureFound.update({
                            status: 0
                        })
                            .then((prestationUpdated) => {
                                done(prestationUpdated);
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'status': 'Error',
                                    'code': 500,
                                    'message': err
                                });
                            });
                    } else {
                        mesureFound.update({
                            status: 1
                        })
                            .then((prestationUpdated) => {
                                done(prestationUpdated);
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
        ], (prestationUpdated) => {
            if (prestationUpdated) {
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