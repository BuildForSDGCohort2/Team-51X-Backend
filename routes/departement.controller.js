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
        let title = req.body.title;
        let description = req.body.description;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        asyncLib.waterfall([
            (done) => {
                models.Departement.findOne({
                    where: { title: title }
                }).then((departementFound) => {
                    done(null, departementFound);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            },
            (departementFound, done) => {
                if (!departementFound) {
                    done(null, departementFound);
                } else {
                    return res.status(409).json({
                        'status': 'Failed',
                        'code': 409,
                        'message': 'Cette département existe déjà'
                    });
                }
            },
            (departementFound, done) => {
                let newDepartement = models.Departement.create({
                    title: title,
                    description: description,
                    status: 1
                }).then((newDepartement) => {
                    done(newDepartement);
                }).catch((err) => {
                    return res.status(500).json({
                        'status': 'Error',
                        'code': 500,
                        'message': err
                    });
                });
            }
        ], (newDepartement) => {
            if (newDepartement) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': newDepartement
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

        models.Departement.findAll({
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

    delete: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);
        let departementId = req.params.id;

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        models.Departement.destroy({
            where: { id: departementId }
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

    update: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let user = jwtUtils.getUserId(headerAuth);

        if (user < 0)
            return res.status(401).json({
                'status': 'Unauthorized',
                'code': 401,
                'message': 'Une authentification complète est nécessaire pour accéder à cette ressource'
            });

        let departementId = req.body.id;
        let title = req.body.title;
        let description = req.body.description;

        asyncLib.waterfall([
            (done) => {
                models.Departement.findOne({
                    where: { id: departementId }
                })
                    .then((departementFound) => {
                        done(null, departementFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'status': 'Error',
                            'code': 500,
                            'message': err
                        });
                    })
            },
            (departementFound, done) => {
                if (departementFound) {
                    departementFound.update({
                        title: (title ? title : departementFound.title),
                        description: (description ? description : departementFound.description),
                    }, {
                        where: { id: departementId }
                    })
                        .then((departementUpdated) => {
                            done(departementUpdated);
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
        ], (departementUpdated) => {
            if (departementUpdated) {
                return res.status(201).json({
                    'status': 'success',
                    'code': 201,
                    'data': departementUpdated
                });
            } else {
                return res.status(500).json();
            }
        });
    },
}