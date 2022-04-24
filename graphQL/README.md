## GraphQL 

notes from the course

https://www.udemy.com/course/graphql-by-example/

#### What is GraphQL?

A query language for your API.

We can say that GrapghQL is comparable to SQL, but used for queuering your api, rather than the database.

There our other ways to call APIs, the most popular being REST, so why GraphQL?

- Ask for what you need, get exactly that
  - The client has full controll of what he wants from the server

With Restful APIs, when you request a resource, you always get all the data for that resource, which can result in "over-fetching".

With GraphQL you can also describe what is possible with a **type system**: you write a schema that fully describes your API.

We can also evolve our API without versioning, meaning add extra features without breaking backwards compatability.

#### Fundamentals

###### Defining a Schema

Writing a schema definition for our first Graphql API.

```graphql
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

```

The client can now call the server and ask for a greeting; the interface for our API.

###### Implementing Resolver Functions

Time to provide an implementation; specify exactly how the server returns a greeting value.

```graphql
// needs to match the structure of our type definitions
const resolvers = {
  Query: {
    greeting: () => 'Hello World'
  }
}
```

###### Start Apollo Server

```javascript
const server = new ApolloServer({ typeDefs, resolvers })
server.listen({ port: 9000 })
  .then((serverInfo) => console.log(`Server running at ${serverInfo.url}`)
```

###### Querying with the Query Language

localhost: 9000 -> GraphQl Playground

```
query {
  greeting
}
```

Response:

```
{
  "data": {
    "greeting": "Hello World"
  }
}
```

Why is the response wrapped in a data object? It is because we can receive another top-level field ie if we make an invalid request, we get "error", with information about the request, instead of "data".

###### Writing a GraphQL Client

**client/app.js**

```javascript
const URL = 'http://localhost:9000/'

async function fetchGreeting() {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query {
          greeting
        }
      `
    })
  })
  const { data } = await response.json()
  return data
}

fetchGreeting().then(({ greeting }) => {
  const title = document.querySelector('h1')
  title.textContent = greeting;
})
```







#### Resources

https://graphql.org/
https://www.apollographql.com/docs/apollo-server/migration/