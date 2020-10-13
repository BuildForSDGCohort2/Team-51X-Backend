const userResolvers = require('./user.resolver');
const roleResolvers = require('./role.resolver');
const moduleResolvers = require('./module.resolver');
const eventResolvers = require('./event.resolver');
const logResolvers = require('./log.resolver');


module.exports = [userResolvers, roleResolvers, moduleResolvers, eventResolvers, logResolvers];