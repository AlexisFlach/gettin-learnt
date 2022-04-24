import axios from 'axios'

const URL = 'http://localhost:9000/graphql'

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

export const loadCompany = async (id) => {
  const query = `query CompanyQuery($id: ID!){
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
  const { company } = await graphqlRequest(query, { id })
  return company
}

export const loadJobs = async () => {
  const query = `
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
  const { jobs } = await graphqlRequest(query);
  return jobs;

}
export const loadJob = async (id) => {
  console.log(id)
  const query = `query JobQuery($id: ID!){
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
  `
  const { job } = await graphqlRequest(query, { id })
  return job

}
