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

#### Queries - Job Board Application

git clone https://github.com/uptoskill/graphql-job-board.git job-board

###### Configuring Apollo Server with express

First step is to add GraphQL support to our server.

```
npm install apollo-server-express graphql
```

**from**

```
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), express.urlencoded({ extended: false }), express.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
```

**to**

```
const { ApolloServer, gql } = require('apollo-server-express')
const fs = require('fs')
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), express.urlencoded({ extended: false }), express.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }))
const resolvers = require('./resolvers.js')

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });

  })

  app.listen(port, () => console.info(`Server started on port ${port}`));
}

startApolloServer(typeDefs, resolvers);
```

**schema.graphql**

```
type Query {
  greeting: String
}
```

**resolvers.js**

```
const Query = {
  greeting: () => 'Hello World!'
}

module.exports = { Query }
```

###### Returning an array of jobs

**schema.graphql**
```
type Query {
  jobs: [Job]
}

type Job {
  id: ID! # GrapghQL provides a built-in ID, ! = can't be null
  title: String
  description: String
}
```
**resolvers.js**

const db = require('./db')

const Query = {
  jobs: () => db.jobs.list() // fech from db

}

module.exports = { Query }

###### Nested objects in GraphQL Queries

We need to explicity list all the fiels we want. This is used to prevent over-fetching.

```
query {
  jobs {
    id,
    title,
    description,
  }
}
```

###### Object Associations: Job/company

**schema.graphql**

```
type Query {
  jobs: [Job]
}

type Company {
  id: ID!
  name: String
  description: String
}

type Job {
  id: ID! # GrapghQL provides a built-in ID, ! = can't be null
  title: String
  company: Company
  description: String
}
```

**graphql playground**

```
{
  jobs {
    id,
    title,
    description,
    company {
      id,
      name,
      description
    }
  }
}
```

**resolvers.js**

```
const Job = {
  company: (job) => db.companies.get(job.companyId)
}
```

###### Fetching Jobs in the Client

```javascript
export const loadJobs = async () => {

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `
      {
        jobs {
          id,
          title,
          description,
          test
          company {
            id,
            name,
            description
          }
        }
      }
      `
    })
  })
  const resBody = await res.json()
  return resBody.data.jobs;
}
```

###### Returning a job by ID

```
type Query {
  job(id: ID!): Job
  jobs: [Job]
}
```

```
const Query = {
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list() // fetch from db
}
```

###### Query Variables: Fetching a job

```
query JobQuery($id: ID!){
job(id:$id) {
  id,
  title,
  
  company {
    id,
    name,
  }
  description
}
}
```

```
export const loadJob = async (id) => {

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `
      query JobQuery($id: ID!){
          job(id:$id) {
            id,
            title,
            company {
              id,
              name,
            }
            description
          }
        }
      `,
      variables: {
        id
      }
    })
  })
  const resBody = await res.json()
  return resBody.data.job;
}
```

###### Handling GraphQL Error Responses

DRY and handle errors

```
async function graphqlRequest(query, variables = {}) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables
    })
  })
  const resBody = await res.json()
  if (resBody.errors) {
    const msg = resBody.errors.map((err) => err.message).join('\n')
    throw new Error(msg)
  }
  return resBody.data;
}
```

###### Fetching a company by ID

Same thing as with Jobs.

###### Returning jobs for a company

```
type Company {
  id: ID!
  name: String
  description: String
  jobs: [job]
}
```

```
const Company = {
  jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
}
```

#### Mutations

How to modify data.

Mutation is a root type, just like Query.

**Schema**

```
type Mutation {
  createJob(companyId: ID, title: String, description: String): ID
}
```

**Resolvers**

```
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    return db.jobs.create({ companyId, title, description });
  }
}
```

**/graphql**

```
mutation($companyId: ID, $title: String, $description: String) {
  createJob(companyId: $companyId, title: $title, description: $description)
}
```

The Mutation root type contains all operations that have side effects, modify the data.

The query root type contains all operations that read data, without modifying it.


###### Best practises for Mutations

Improve our existing mutations so that it is easier to work with from a clients perspective.

**schema**

```
type Mutation {
  createJob(companyId: ID, title: String, description: String): Job
}
```

**resolvers**

```
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  }
}
```

**/graphql**

```
mutation($companyId: ID, $title: String, $description: String) {
  job: createJob(companyId: $companyId, title: $title, description: $description) {
    title,
    description
  }
}
```

Even better:

**schema**

```
type Mutation {
  createJob(input: createJobInput): Job
}
```

```
input createJobInput {
  companyId: ID
  title: String
  description: String
}
```

**resolvers**

```
const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  }
}
```

**/graphql**

```
mutation CreateJob($input: createJobInput) {
  job: createJob(input: $input) {
    id,
    title, 
    description
  }
}
```

###### Calling a Mutation from the Client

```
export async function createJob(input) {
  const mutation = `
  mutation CreateJob($input: createJobInput) {
    job: createJob(input: $input) {
      id,
      title, 
      description
    }
  }
  `
  const { job } = await graphqlRequest(mutation, { input })
  return job;
}
```












https://graphql.org/
https://www.apollographql.com/docs/apollo-server/migration/