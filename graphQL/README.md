## GraphQL 

notes from the course

https://www.udemy.com/course/graphql-by-example/


## Fundamentals
#### Schema Definition Language

```
npm i apollo-server graphql
```

graphql contains all the graphql functionality

apollo-server makes it possible to serve over HTTP.

**server.js**

The first thing we do is to create our graphql schema, which describes what our api can do.

```
// Type definitions
const typeDefs = `
// Here we use a special syntax called the graphql schema definition language
type Query {
greeting: String
}
`
```

We always have to use the Query type, which lists all the queries that can made from our client.

We can parse the schema using a function from the apollo-server module.

```
import { gql } from 'apollo-server'

const typeDefs = gql`
type Query {
  greeting: String
}
`
```

gql is a tag function. We tag our template literal. The gql function parses the string into a graphql schema object. 

#### Resolver functions

In the previous section we created the interface for our api. Now it is time to implement it, using a resolver and specify exactly how the server returns a greeting value.

The resolver needs to match the structure of our type definitions craeted in the typeDefs variable, just like a class that implements an interface.

```
const resolvers = {
  Query: {
    greeting: () => 'Hello World'
  }
} 
```

This function will be called by the graphql engine every time a client sends a greeting query.
In other words: this function will be called to resolve the value of the greeting field. That is why it is called a resolver function.

To create a server we need to import teh ApolloServer class from the 'apollo-server' module.

```
const server = new ApolloServer({ typeDefs, resolvers })
```

```
const serverInfo = await server.listen({ port: 9000 })
console.log(`Server running at ${serverInfo.url}`)
```

###### Query Language

A visit to localhost:9000 will redirect us to the graphql sandbox.

```
query {
  greeting
}
```

Interestingly, the response is enclosed in another object called "data":

```
{
  "data": {
    "greeting": "Hello World"
  }
}
```

The reason for this is that we could have another json response that does not include data. If we send an invalid query

response:

```
{
  "errors": [
    {
      "message": '...'
    }
  ]
}
```

The default operation is a query, so it could be omitted.

Lets take a moment to understand the relationship between a graphql query and the schema defined in the server.

```
query -> matches the Query Type in the schema { 
  greeting
}
```

This is how it looks:
```
const typeDefs = gql`

schema {
  query: Query
}

type Query {
  greeting: String
}
`
```

But its not visible because it is the default.

###### GraphQL over HTTP

The apollo graphql sandbox is used as a HTTP Client. An application that runs in the browser and sends requests to our graphql server.

inspect:

General
```
Request URL: http://localhost:9000/
Request Method: POST -> different from the typical REST API. With Graphql we always make a post request, even if want to get something.
Status Code: 200 OK
```

Request Headers
```
content-type: application/json

```

The Request Payload (the body of the request) we can see that it is a json object with two properties; query and variables.

The response is also in JSON format.

###### GraphQL client

```
const GRAPHQL_URL = 'http://localhost:9000/';

async function fetchGreeting() {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      query {
        greeting
      }
      `
    })
  })
  const { data } = await response.json();
  return data;
}

const element = document.getElementById('greeting');
element.textContent = 'Loading...'

fetchGreeting().then(({ greeting }) => {
  element.textContent = greeting;
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

#### Authentication

In the previous section we had to hard code the companyId. To ffix this we need to add support for authentication.

context = used to access things that are not part of graphql

```
const Mutation = {
  createJob: (root, { input }, context) => {
    console.log("context", context)
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  }
}
```

_extensionStack:


Login

When we login we get a token, generated by the server.

What we should do with this token is send it back to the server in any other request we make in order to prove that we are authenticated.

The same token is also available in local storage, because the client saves it there after each succesful response.

Http headers
```
{
  "authorization: "Bearer jospsjopsj..."
}
```
The express jwt will now find the token that we sent in the authorization header, validate it, decode it, put it on the request, and from there, we sat it on the context.

```
const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) {
      throw new Error('Unauthorized')
    }
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  }
}
```

```
const context = ({ req }) => ({
  user: req.user
})
```

```
const server = new ApolloServer({ typeDefs, resolvers, context });
```

###### Passing Authentication in HTTP Requests

In the client we need to set the same header to make our user authenticated.

```
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables
    })
  }

  if (isLoggedIn()) {
    request.headers[ 'authorization' ] = 'Bearer ' + getAccessToken()
  }
  const res = await fetch(URL, request)
  const resBody = await res.json()
  if (resBody.errors) {
    const msg = resBody.errors.map((err) => err.message).join('\n')
    throw new Error(msg)
  }
  return resBody.data;
}
```

```
export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function isLoggedIn() {
  return !!localStorage.getItem(accessTokenKey);
}
```

###### Extracting the Company from the Authenticated User

```
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub) })
```

```
const Mutation = {
  createJob: (root, { input }, { user }) => {

    if (!user) {
      throw new Error('Unauthorized')
    }
    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  }
}
```

#### Apollo Client

"Bind GraphQL data to your UI with one function call"

The *problem* we have right now is that every time we display a new component a request will be made.

We can use Apollo Clien for caching.

###### Apollo Client Setup and Making Queries

```
npm i apollo-boost graphql
```

```
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  link: new HttpLink({
    uri: URL,
  }),
  cache: new InMemoryCache()
})

export const loadJobs = async () => {
  const query = gql`
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
      `

  const { data: { jobs } } = await client.query({ query });
  return jobs;
}
```

###### Authentication with ApolloLink

we are now using apollo client for all of our HTTP Requests.

We can use client.query to make queries

and

client.mutate for mutations

We also need to apply the gql function to all our query strings before passing them to the apollo client.

---

The problem we have at this point is when we try and post a new job we get an error saying "unaothorized".

We are not sending an authenticated request. 

```
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    // request.headers[ 'authorization' ] = 'Bearer ' + getAccessToken()
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    })
  }
  return forward(operation)
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: URL })
  ]),
  cache: new InMemoryCache()
})
```

###### Caching and Fetch Policy


const { data: { jobs } } = await client.query({ query, fetchPolicy: 'no-cache' });

#### Updating the Cache after a mutation






































https://graphql.org/
https://www.apollographql.com/docs/apollo-server/migration/
