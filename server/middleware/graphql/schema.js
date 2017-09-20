const graphql = require('graphql');
// const axios = require('axios');
// const loopback = require('loopback');
// const server = loopback();

const app = require('../../server');

// server.middleware('auth', loopback.token({
//   model: server.models.accessToken,
//   currentUserLiteral: 'me'
// }));
// var User = server.models.User
// console.log('---User', User);
// console.log('---App', server);

const {
 GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = graphql;



const ChatType = new GraphQLObjectType({
  name: 'Chat',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    chats: {
      type: new GraphQLList(ChatType),
      resolve(parentValue, args, ctx) {
        console.log(parentValue, args, ctx);
        return app.models.Chat.find()
          .then(res => res);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation,
})