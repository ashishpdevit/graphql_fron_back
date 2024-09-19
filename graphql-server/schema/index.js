const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    role_id: ID
    username: String!
    email: String!
    password: String!
    deleted: String!
    deleted_by: ID
  }

  type Role {
    id: ID!
    name: String!
    rights: String
    status: String!
    deleted: String!
    deleted_by: ID
    created_by: ID!
    updated_by: ID
  }

  type Right {
    id: ID!
    name: String!
    slug: String!
    module_id: ID!
    status: String!
    deleted: String!
    deleted_by: ID
    created_by: ID!
    updated_by: ID
    module_name: String
  }

  type Module {
    id: ID!
    name: String!
    slug: String!
    description: String
    status: String!
    deleted: String!
    deleted_by: ID
    created_by: ID!
    updated_by: ID
  }


  type AuditLog {
    id: ID!
    timestamp: String!
    eventType: String!
    description: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    auditLogs: [AuditLog]
    getRoles: [Role]
    getModules: [Module]
    getModule(id: ID!):Module
    getRights:[Right]
    getRight(id: ID!):Right
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    signUp(username:String!, email: String!, password: String!): AuthPayload
    createRole(name:String!, status: String!, right: String!): Role
    deleteRole(id: ID!): Boolean    
    login(email: String!, password: String!): AuthPayload
    createUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String!, email: String!): User
    deleteUser(id: ID!, deletedById:ID): Boolean
    addAuditLog(eventType: String!, description: String!): AuditLog
    createModule(name: String!, description: String): Module
    updateModule(id: ID!, name: String!, description: String): Module
    deleteModule(id: ID!, deletedById:ID): Boolean
    createRight(name: String!, module_id: ID!, module_name: String!): Right
    updateRight(id: ID!, name: String!, module_id:  ID!): Right
    deleteRight(id: ID!): Boolean    
  }
`;

module.exports = typeDefs;