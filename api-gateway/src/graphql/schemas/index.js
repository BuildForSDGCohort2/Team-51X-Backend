const { gql } = require('apollo-server-express');

const userType = require('./user.graphql');
const roleType = require('./role.graphql');
const moduleType = require('./module.graphql');
const eventType = require('./event.graphql');
const logType = require('./log.graphql');

const rootType = gql`

scalar DateTime
scalar Boolean

    type Query {
        root: String
    }
    
    type Mutation {
        root: String
    }
`;

module.exports = [rootType, userType, roleType, moduleType, eventType, logType];