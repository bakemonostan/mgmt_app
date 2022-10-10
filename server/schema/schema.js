// get sample data
const { projects, clients } = require('../sampleData');
// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

// get the types from graphql...read up on these in graphql doc
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

// Steps in creating a schema
// 1. Call the new GraphqlobjectType
// 2. add Schema name
// 3. create Schema fields
// 4. give fields a type(data type. eg strings number etc)

//

//  Projects
// created a projects types here
//  You need to create a project type before creating a query, these are schemas and you know how schema's work right
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.findById(parent.clientId);
      },
    },
  }),
});

// Create a client type schema
// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//
// Create a root query for fetching based on id.
// see steps below for single and for all entries in a 'Type'

//  Root query Object for querying different fields
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //
    // get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    //
    // get single project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    // clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },

    // get single client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
