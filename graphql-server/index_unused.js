// server.js

// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema');
// const resolvers = require('./resolvers');
// const database = require('./database');

// const app = express();

// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: resolvers,
//   graphiql: true, // Enable GraphQL's web interface for testing
// }));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql2');

// const db  = require('./database');\
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String!, email: String!): User
    deleteUser(id: ID!): Boolean
  }
`;

const db = mysql.createConnection({
  host: '10.10.0.42',
  user: 'developer',
  password: 'D#v#l0p#r',
  database: 'graphql_demo2'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// const typeDefs = require('./schema')
// const resolvers = require('./resolvers')



const resolvers = {
  Query: {
    getUsers: async () => {
      // Query user from MySQL database
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
          console.log(err, results);
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    getUser: async (_, { id }) => {
      // Query user from MySQL database
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      });
    }
  },


  Mutation: {
    createUser: async (_, { username, email }) => {
      // Insert user into MySQL database
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, email, createdAt, updatedAt) VALUES (?, ?, now(), now())', [username, email], (err, result) => {
          if (err) {
            reject(err);
          } else {
            const insertedId = result.insertId;
            // Return the newly created user
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
    updateUser: async(_, { id, username, email }) =>{
    // Update user in MySQL database
      const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
      const values = [username, email, id];

      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Error updating user:', error);
          throw new Error('Error updating user');
        }
        console.log('User updated successfully:', results);
      });

        // Return the updated user details
      return { id, username, email };
    },
    deleteUser: async(_, { id}) =>{
      // Delete user from MySQL database
      const query = 'DELETE FROM users WHERE id = ?';
      
      connection.query(query, [id], (error, results) => {
        if (error) {
          console.error('Error deleting user:', error);
          throw new Error('Error deleting user');
        }
        console.log('User deleted successfully:', results);
      });

      // Return true if deletion was successful
      return true;
    }
  }  
};

const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  // Start the server
  server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
  });