module.exports.development = {
    dialect: "mariadb",
    seederStorage: "sequelize",
    url: process.env.DB_URL,
    operatorsAliases: 0,
    define: {
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_general_ci"
        }
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: "+01:00"
}