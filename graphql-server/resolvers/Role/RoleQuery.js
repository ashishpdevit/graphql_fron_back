const db = require("../../database");

const RoleQuery = {
    getRoles: async (_,__,context) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM roles WHERE deleted = 0', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
}

module.exports = RoleQuery;