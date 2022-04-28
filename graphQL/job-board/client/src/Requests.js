import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'
import gql from 'graphql-tag'
import { isLoggedIn, getAccessToken } from './auth'

const URL = 'http://localhost:9000/graphql'

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

const jobQuery = gql`
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
`;
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

export const loadCompany = async (id) => {
  const query = gql`query CompanyQuery($id: ID!){
    company(id:$id) {
      id
      name
      description
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }
  }
`
  // const { company } = await graphqlRequest(query, { id })
  const { data: { company } } = client.query({ query, variables: { id } })
  return company
}

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
  // const { jobs } = await graphqlRequest(query)
  const { data: { jobs } } = await client.query({ query, fetchPolicy: 'no-cache' });
  return jobs;
}
export const loadJob = async (id) => {
  // const query = gql`query JobQuery($id: ID!){
  //     job(id:$id) {
  //       id,
  //       title,
  //       company {
  //         id,
  //         name,
  //       }
  //       description
  //     }
  //   }
  // `
  const { data: { job } } = await client.query({ query: jobQuery, variables: { id } });
  return job
}

export async function createJob(input) {
  const mutation = gql`
  mutation CreateJob($input: createJobInput) {
    job: createJob(input: $input) {
      id,
      title, 
      description
    }
  }
  `
  // const { job } = await graphqlRequest(mutation, { input })
  const { data: { job } } = await client.mutate({
    mutation, variables: { input }, update: (cache, { data }) => {
      // console.log(mutationResult)
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data
      })
    }
  })
  return job;
}