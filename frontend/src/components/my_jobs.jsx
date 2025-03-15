import React, { useState, useEffect } from 'react';
import CompletedTaskCard from './completed_task_card';
import OngoingTaskCard from './Ongoing_task_card';
import './posted_jobs.css';
import Navbar from './Navbar';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:5000/myjobs?username=${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching my jobs:', error);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="posted-jobs-container">
          <div className="dashboard-jobs-list">
            {jobs.map((job) =>
              job.completed ? (
                <CompletedTaskCard key={job._id} job={job} />
              ) : (
                <OngoingTaskCard key={job._id} job={job} />
              )
            )}
          </div>
      </div>
    </>
  );
};

export default MyJobs;
