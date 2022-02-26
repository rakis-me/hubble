import { serve } from "std/http/server.ts"
import { graphql } from './api.js'

const GQL = new URLPattern({pathname: '/graphql'})

serve((req) => {
  if (GQL.exec(req.url)) {
    return graphql(req)
  }
  return new Response('Not Found', { status: 404})
})