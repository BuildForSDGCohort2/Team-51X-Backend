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
        let etablissement = req.body.etablissement;

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
                        'message': 'Cette prestation existe déjà'
                    });
                }
            },
            (prestationFound, done) => {
                let newPrestation = models.Mesure.create({
                    code: code,
                    title: title,
                    montant: montant,
                    devise: devise,
                    status: 1,
                    EtablissementId: etablissement
                }).then((newPrestation) => {
                    done(newPrestation);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newPrestation) => {
            if (newPrestation) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newPrestation
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

        models.Mesure.findAll({
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
                    'message': 'Impossible de trouver un ou plusieurs prestations'
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

    getAllByEtablissement: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let etablissementId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Mesure.findAll({
            where: { 
                etablissementId: etablissementId,
                status: 1 
            },
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
                    'message': 'Impossible de trouver un ou plusieurs prestations'
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
        let prestationId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let code = req.body.code;
        let title = req.body.title;
        let montant = req.body.montant;
        let devise = req.body.devise;
        let etablissement = req.body.etablissement;

        asyncLib.waterfall([
            (done) => {
                models.Mesure.findOne({
                    where: { id: prestationId }
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
                        code: (code ? code : prestationFound.code),
                        title: (title ? title : prestationFound.title),
                        montant: (montant ? montant : prestationFound.montant),
                        devise: (devise ? devise : prestationFound.devise),
                        etablissement: (etablissement ? etablissement : prestationFound.etablissement)
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
                        prestationFound.update({
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