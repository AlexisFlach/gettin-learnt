import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadCompany } from './Requests';
import { JobList } from './JobList'


export const CompanyDetail = () => {

  const [ company, setCompany ] = useState(null)
  const params = useParams()

  useEffect(() => {
    async function fetchCompany() {
      const data = await loadCompany(params.companyId)
      setCompany(data)
    }
    fetchCompany()
  }, [])

  if (!company) return "Loading..."
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <JobList jobs={company.jobs} />


    </div>
  );
}

