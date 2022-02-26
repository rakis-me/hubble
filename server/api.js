import "dotenv"
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";
import { gql } from "graphql_tag";
import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get('HYPER'))

const typeDefs = gql`

type User {
  _id: String
  username: String
  email: String
  avatar: String
  publicKey: String
  privateKey: String
  created: String
  updated: String
}

type Pip {
  _id: String
  user_id: String
  name: String
  description: String
  secure: String
  tags: [String]
  created: String
  updated: String
}

type Result {
  ok: Boolean
}

type Query {
  findPips(criteria: String) : [Pip]
  user(id: String) : User
  getPublicKey(id: String) : String
}

input Nothing {
  foo: String
}

input AvatarInput {
  avatar: String
}

type Mutation {
  upsertPip(name: String, description: String, secure: String, tags: [String]) : Result!
  chgUsername(username: String) : Result!
  chgEmail(email: String) : Result!
  chgAvatar(avatar: AvatarInput) : Result
  generateKeys(input: Nothing) : Result
}
`

const resolvers = {
  Query: {
    findPips(_p, { criteria }) {
      console.log(criteria)
      return Promise.resolve([])
    },
    user(_p, { id }, ctx) {
      return Promise.resolve({})
    },
    getPublicKey(_p, {id}) {
      return Promise.resolve('TODO')
    }
  },
  Mutation: {
    upsertPip(_p, { name, description, secure, tags }, ctx) {
      return Promise.resolve({ok: true})
    },
    chgUsername(_p, {username}, ctx) {
      return Promise.resolve({ok: true})
    },
    chgEmail(_p, { email }, ctx) {
      return Promise.resolve({ok: true})
    },
    chgAvatar(_p, { input }, ctx) {
      return Promise.resolve({ok: true})
    },
    generateKeys(_p, _params, ctx) {
      return Promise.resolve({ok: true})
    }
  }
}

export const graphql = (req) =>
  GraphQLHTTP({
    schema: makeExecutableSchema({ resolvers, typeDefs }),
    graphiql: true,
  })(req);