import "dotenv"
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";
import { gql } from "graphql_tag";
import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get('HYPER'))

const typeDefs = gql`

type Pip {
  _id: String,
  name: String,
  description: String,
  secure: String,
  tags: [String]
}

type Result {
  ok: Boolean
}

type Query {
  findPips(criteria: String) : [Pip]
}

type Mutation {
  upsertPip(name: String, description: String, secure: String, tags: [String]) : Result!
}
`

const resolvers = {
  Query: {
    findPips(_p, { criteria }) {
      console.log(criteria)
      return Promise.resolve([])
    }
  },
  Mutation: {
    upsertPip(_p, { name, description, secure, tags }) {
      return Promise.resolve({ok: true})
    }
  }
}

export const graphql = (req) =>
  GraphQLHTTP({
    schema: makeExecutableSchema({ resolvers, typeDefs }),
    graphiql: true,
  })(req);