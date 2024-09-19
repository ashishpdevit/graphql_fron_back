const db = require('../database');

const resolvers = {
  Query: {
    getUsers: async () => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
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
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      });
    },
  },
  // Mutation: {
  //   createUser: async (_, { username, email }) => {
  //     console.log(username, email);
  //     if (!username || !email) {
  //       return {
  //         userErrors: [{
  //           message: "You must enter the value of username and email"
  //         }],
  //       }
  //     }

  //     return new Promise((resolve, reject) => {
  //       db.query('INSERT INTO users (username, email, createdAt, updatedAt) VALUES (?, ?, now(), now())', [username, email], (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           const insertedId = result.insertId;
  //           db.query('SELECT * FROM users WHERE id = ?', [insertedId], (err, results) => {
  //             if (err) {
  //               reject(err);
  //             } else {
  //               resolve(results[0]);
  //             }
  //           });
  //         }
  //       });
  //     });
  //   },
  //   updateUser: async (_, { id, username, email }) => {
  //     console.log(id, username, email);
  //     const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  //     const values = [username, email, id];

  //     db.query(query, values, (error, results) => {
  //       if (error) {
  //         console.error('Error updating user:', error);
  //         throw new Error('Error updating user');
  //       }
  //       console.log('User updated successfully:', results);
  //     });

  //     return { id, username, email };
  //   },
  //   deleteUser: async (_, { id }) => {
  //     const query = 'DELETE FROM users WHERE id = ?';

  //     db.query(query, [id], (error, results) => {
  //       if (error) {
  //         console.error('Error deleting user:', error);
  //         throw new Error('Error deleting user');
  //       }
  //       console.log('User deleted successfully:', results);
  //     });

  //     return true
  //   }
  // },
};

module.exports = resolvers;