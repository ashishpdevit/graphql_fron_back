const db = require("../database");
// const {getRoles} = require("./Role/RoleQuery");
const Query = {
    getUsers: async (_,__,context) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE deleted = 0', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getUser: async (_, { id }) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE deleted = 0 AND id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    auditLogs: async () => {
        //     try {
        //       await sql.connect(config);
        //       const result = await sql.query('SELECT * FROM AuditLog');
        //       return result.recordset;
        //     } catch (err) {
        //       throw new Error('Error fetching audit logs');
        //     } finally {
        //       await sql.close();
        //     }
        //   }
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM AuditLog', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
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
    getModules: async (_,__,context) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM modules WHERE deleted = 0', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getRight: async (_, { id }) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM rights WHERE deleted = 0 AND id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    getRights: async (_,__,context) => {
        const query = 'SELECT rights.*, modules.name AS module_name FROM rights JOIN modules ON rights.module_id = modules.id WHERE rights.deleted = 0 ORDER BY rights.module_id ASC'
        //'SELECT * FROM rights WHERE deleted = 0'
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getModule: async (_, { id }) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM modules WHERE deleted = 0 AND id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
}
module.exports = Query;