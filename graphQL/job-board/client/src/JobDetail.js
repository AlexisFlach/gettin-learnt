import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadJob } from './Requests'

export const JobDetail = () => {

  const param = useParams()
  const [ job, setJob ] = useState(null)
  console.log(param)
  useEffect(() => {
    async function getJob() {
      const j = await loadJob(param.jobId);
      console.log(j)
      setJob(j)
    }
    getJob()
  }, [])

  if (!job) return 'Loading...'
  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );

}
