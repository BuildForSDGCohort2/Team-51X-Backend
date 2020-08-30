// Imports
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'dc76e9f0c0006e8f919e0c515c66dbba3982f785'; //root
const JWT_SIGN_REFRESH_SECRET = 'dc76e9f0c0006e8f919e0c515c66dbba3982f78523'; //root + 23
const JWT_SIGN_TEMPORARY_SECRET = 'dc76e9f0c0006e8f919e0c515c66dbba3982f785224'; //root + 224

// Exported functions
module.exports = {

    generateTokenForUser: function (userData) {
        return jwt.sign({ 
            id: userData.id, 
            nom: userData.nom,
            prenom: userData.prenom,
            role: userData.TypePersonne.id
        }, JWT_SIGN_SECRET, { expiresIn: '24h' }) //900000ms = 15min en ms
    },

    generateRefreshTokenForUser: function (userId, ipAddress) {
        return jwt.sign({ user: userId, createdByIp: ipAddress }, JWT_SIGN_REFRESH_SECRET, { expiresIn: '7d' })
    },

    generateTemporaryTokenForUser: function (email) {
        return jwt.sign({ email: email }, JWT_SIGN_TEMPORARY_SECRET, { expiresIn: '24h' })
    },

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserData: function (authorization) {
        let userData = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userData = jwtToken;
            } catch (err) { }
        }
        return userData;
    },
    getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.id;
            } catch (err) { 
            }
        }
        return userId;
    },
    getVerifyAcountEmail: function (verifyToken) {
        let email = -1;
        let token = verifyToken;
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_TEMPORARY_SECRET);
                if (jwtToken != null)
                    email = jwtToken.email;
            } catch (err) { }
        }
        return email;
    }
}
