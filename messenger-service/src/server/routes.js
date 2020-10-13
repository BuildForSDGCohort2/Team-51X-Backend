const models = require('../../database/models');

const setupRoutes = app =>  {

    app.get('/users', async (req, res, next) => {
        // const users = await models.User.findAll();
        // return res.json(users);
    });

};

export default setupRoutes;