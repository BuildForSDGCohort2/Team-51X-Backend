const express = require('express');
const etablissementCtrl = require('./routes/etablissement.controller');
const departementCtrl = require('./routes/departement.controller');
const userCtrl = require('./routes/user.controller');
const patientCtrl = require('./routes/patient.controller');

// Router
exports.router = (() => {
    const apiRouter = express.Router();

    // Etablissement Routes
    apiRouter.route('/etablissement/type').post(etablissementCtrl.newTypeEtablissement);
    apiRouter.route('/etablissement/type').get(etablissementCtrl.getAllType);
    apiRouter.route('/etablissement/type/:id').delete(etablissementCtrl.deleteType);

    apiRouter.route('/etablissement').post(etablissementCtrl.newEtablissement);
    apiRouter.route('/etablissement').put(etablissementCtrl.update);
    apiRouter.route('/etablissement').get(etablissementCtrl.getAll);
    apiRouter.route('/etablissement/actif').get(etablissementCtrl.getAllActif);
    apiRouter.route('/etablissement/:id').get(etablissementCtrl.getAllById);
    apiRouter.route('/etablissement-by-type/:type').get(etablissementCtrl.getAllByType);
    apiRouter.route('/etablissement/remove/:id').put(etablissementCtrl.remove);

    // Département Routes
    apiRouter.route('/departement').post(departementCtrl.addNew);
    apiRouter.route('/departement').get(departementCtrl.getAll);
    apiRouter.route('/departement').put(departementCtrl.update);
    apiRouter.route('/departement/:id').delete(departementCtrl.delete);

    // Users Routes
    apiRouter.route('/user/role').post(userCtrl.newRole);
    apiRouter.route('/user/role').get(userCtrl.getAllRole);
    apiRouter.route('/user/role/:id').delete(userCtrl.deleteRole);

    apiRouter.route('/user').post(userCtrl.addNew);
    apiRouter.route('/user').get(userCtrl.getAll);
    apiRouter.route('/user/get-by-id/:id').get(userCtrl.getById);
    apiRouter.route('/user/get-actif').get(userCtrl.getAllActif);
    apiRouter.route('/user/get-by-role/:id').get(userCtrl.getAllByRole);
    apiRouter.route('/user/:id').put(userCtrl.update);
    apiRouter.route('/user/update-profile').put(userCtrl.updateProfile);
    apiRouter.route('/user/update-password').put(userCtrl.updatePassword);
    apiRouter.route('/user/delete/:id').put(userCtrl.remove);

    // Patients Routes
    apiRouter.route('/patient').post(patientCtrl.addNew);
    apiRouter.route('/patient').get(patientCtrl.getAll);
    apiRouter.route('/patient/get-by-mutuelle/:id').get(patientCtrl.getAllByMutuelle);


    return apiRouter;

})();