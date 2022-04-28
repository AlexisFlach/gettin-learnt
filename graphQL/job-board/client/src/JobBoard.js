import React, { useState, useEffect } from 'react';
import { JobList } from './JobList';

import { loadJobs } from './Requests.js'

export const JobBoard = () => {
  const [ jobs, setJobs ] = useState([])

  useEffect(() => {

    const fetchJobs = async () => {
      const jobs = await loadJobs();
      setJobs(jobs)
    }
    fetchJobs()
  }, [])

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );

}
