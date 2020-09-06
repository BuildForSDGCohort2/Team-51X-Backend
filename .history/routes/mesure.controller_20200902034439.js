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
        let mesureId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let key = req.body.key;
        let value = req.body.value;
        let createdBy = req.body.createdBy;
        let patient = req.body.patient;

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: { id: mesureId }
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
                        key: (key ? code : mesureFound.key),
                        value: (value ? value : mesureFound.value),
                        createdBy: (createdBy ? createdBy : mesureFound.createdBy),
                        devise: (devise ? devise : mesureFound.devise),
                        patientId: (patient ? patient : mesureFound.patientId)
                    }, {
                        where: { id: mesureFound.id }
                    })
                        .then((mesureUpdated) => {
                            done(mesureUpdated);
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
        ], (mesureUpdated) => {
            if (mesureUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': mesureUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },

    delete: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let mesureId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: { id: mesureId }
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
                    models.Mesure.destroy({
                        where: {id: mesureFound.id}
                    }).then((mesureDeleted) => {
                        done(mesureDeleted)
                    })
                    if (mesureFound.status === 1) {
                        mesureFound.update({
                            status: 0
                        })
                            .then((mesureUpdated) => {
                                done(mesureUpdated);
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
        ], (mesureUpdated) => {
            if (mesureUpdated) {
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