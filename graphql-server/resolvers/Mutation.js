const db = require("../database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUser } = require("./Query");
const RoleMutation = require("./Role/RoleMutation");

const Mutation = {
  // addaudit_log: async (_, { eventType, description }) => {
  //   try {
  //     // await sql.connect(config);
  //     const result = await db.query(`
  //       INSERT INTO audit_log (eventType, description)
  //       OUTPUT INSERTED.*
  //       VALUES (@eventType, @description)
  //     `, {
  //       eventType,
  //       description
  //     });
  //     return result.recordset[0];
  //   } catch (err) {
  //     throw new Error('Error adding audit log');
  //   } finally {
  //     await sql.close();
  //   }
  // },
  signUp: async (_, { username, email, password }, context) => {

    if (!password && email) {
      throw new Error('You must enter the value of password');
    }

    if (password && !email) {
      throw new Error('You must enter the value of email');
    }

    if (!password && !email && !username) {
      throw new Error('You must enter the value of password and email');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, now(), now())', [username, email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
          // delete user.password;
          // 
          const insertedId = result.insertId;
          db.query('SELECT id, username, email FROM users WHERE id = ?', [insertedId], (err, results) => {
            if (err) {
              reject(err);
            } else {
              const user = results[0]
              const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
              delete results[0].password;
              resolve({ token, user });
            }
          });
        }
      });
    });
  },
  login: async (_, { email, password }) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, username, email, password FROM users WHERE email = ? AND deleted = 0';
      db.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error finding user:', error);
          reject(new Error('Error finding user'));
        } else if (results.length > 0) {
          const user = results[0];
          const hashedPassword = user.password;

          bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              reject(new Error(err.message));
            } else if (result) {
              const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
              delete user.password;
              resolve({ token, user });
            } else {
              console.log('Invalid password');
              reject(new Error("Password doesn't match"));
            }
          });
        } else {
          console.log('User not found');
          reject(new Error('User not found'));
        }
      });
    });
  },
  createUser: async (_, { username, email }, context) => {
    if (!context.userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!username && email) {
      throw new Error('You must enter the value of username');
    }

    if (username && !email) {
      throw new Error('You must enter the value of email');
    }

    if (!username && !email) {
      throw new Error('You must enter the value of username and email');
    }
    const hashedPassword = await bcrypt.hash("test@123", 10)

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, now(), now())', [username, email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const insertedId = result.insertId;
          db.query('SELECT * FROM users WHERE id = ?', [insertedId], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        }
      });
    });
  },
  updateUser: async (_, { id, username, email }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!username && email) {
      throw new Error('You must enter the value of username');
    }

    if (username && !email) {
      throw new Error('You must enter the value of email');
    }

    if (!username && !email) {
      throw new Error('You must enter the value of username and email');
    }
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    const values = [username, email, id];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
      }
      console.log('User updated successfully:', results);
    });

    return { id, username, email };
  },
  deleteUser: async (_, { id }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    db.query('INSERT INTO audit_log (event_type, description, model, timestamp) VALUES (?, ?, ?, now())', ['delete', `User with ID ${id} deleted`, 'users'], (err, result) => {
      if (err) {
        console.error('Error for add log of user:', err);
        throw new Error('Error for add log of user');
      }
    })
    const AuthUserId = userId ?? null
    // const query = 'DELETE FROM users WHERE id = ?';
    const query = 'UPDATE users SET deleted = 1, deleted_by = ? WHERE id = ?';
    db.query(query, [AuthUserId, id], (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
      }
      console.log('User deleted successfully');
    });
    return true
  },
  // RoleMutation
  createRole: async (_, { name, rights }, context) => {

  },
  deleteRole: async (_, { id }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    db.query('INSERT INTO audit_log (event_type, description, model, timestamp) VALUES (?, ?, ?, now())', ['delete', `Role with ID ${id} deleted`, 'roles'], (err, result) => {
      if (err) {
        console.error('Error for add log of Role:', err);
        throw new Error('Error for add log of Role');
      }
    })
    const AuthUserId = userId ?? null
    const query = 'UPDATE roles SET deleted = 1, deleted_by = ? WHERE id = ?';
    db.query(query, [AuthUserId, id], (error, results) => {
      if (error) {
        console.error('Error deleting role:', error);
        throw new Error('Error deleting role');
      }
      console.log('Roles deleted successfully');
    });
    return true
  },
  createModule: async (_, { name, description }, context) => {
    if (!context.userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!name && description) {
      throw new Error('You must enter the value of module name');
    }

    const slug = name.toLowerCase()

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO modules (name, description, slug) VALUES (?, ?, ?)', [name, description, slug], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const insertedId = result.insertId;
          db.query('SELECT * FROM modules WHERE id = ?', [insertedId], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        }
      });
    });
  },
  createRight: async (_, { name, module_id, module_name }, context) => {
    if (!context.userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!name && module_id) {
      throw new Error('You must enter the value of rights name');
    }

    if (name && !module_id) {
      throw new Error('You must select module');
    }

    if (!name && !module_id) {
      throw new Error('You must enter the value of rights name and module');
    }

    const slug =  `${module_name.toLowerCase()}/${name.toLowerCase()}`
    console.log(slug);

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO rights (name, slug, module_id) VALUES (?, ?, ?)', [name, slug, module_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          const insertedId = result.insertId;
          db.query('SELECT * FROM rights WHERE id = ?', [insertedId], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results[0]);
            }
          });
        }
      });
    });
  },
  updateRight: async (_, { id, name, module_id }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!name && module_id) {
      throw new Error('You must enter the value of rights name');
    }

    if (name && !module_id) {
      throw new Error('You must select module');
    }

    if (!name && !module_id) {
      throw new Error('You must enter the value of rights name and module');
    }

    const query = 'UPDATE rights SET name = ?, module_id = ? WHERE id = ?';
    const values = [name, module_id, id];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating right:', error);
        throw new Error('Error updating right');
      }
      console.log('Right updated successfully:', results);
    });

    return { id, name, module_id };
  },
  deleteRight: async (_, { id }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    db.query('INSERT INTO audit_log (event_type, description, model, timestamp) VALUES (?, ?, ?, now())', ['delete', `Right with ID ${id} deleted`, 'rights'], (err, result) => {
      if (err) {
        console.error('Error for add log of Right:', err);
        throw new Error('Error for add log of Right');
      }
    })
    const AuthUserId = userId ?? null
    const query = 'UPDATE rights SET deleted = 1, deleted_by = ? WHERE id = ?';
    db.query(query, [AuthUserId, id], (error, results) => {
      if (error) {
        console.error('Error deleting right:', error);
        throw new Error('Error deleting right');
      }
      console.log('Right deleted successfully');
    });
    return true
  },
  deleteModule: async (_, { id }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    db.query('INSERT INTO audit_log (event_type, description, model, timestamp) VALUES (?, ?, ?, now())', ['delete', `Module with ID ${id} deleted`, 'modules'], (err, result) => {
      if (err) {
        console.error('Error for add log of Module:', err);
        throw new Error('Error for add log of Module');
      }
    })
    const AuthUserId = userId ?? null
    const query = 'UPDATE modules SET deleted = 1, deleted_by = ? WHERE id = ?';
    db.query(query, [AuthUserId, id], (error, results) => {
      if (error) {
        console.error('Error deleting module:', error);
        throw new Error('Error deleting module');
      }
      console.log('Module deleted successfully');
    });
    return true
  },
  updateModule: async (_, { id, name, description }, { userId }) => {
    if (!userId) {
      throw new Error('Forbidden access (unauthentication)');
    }

    if (!name && email) {
      throw new Error('You must enter the value of name');
    }

    const query = 'UPDATE modules SET name = ?, description = ? WHERE id = ?';
    const values = [name, description, id];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating module:', error);
        throw new Error('Error updating module');
      }
      console.log('Module updated successfully:', results);
    });

    return { id, name, description };
  },
}
module.exports = Mutation;