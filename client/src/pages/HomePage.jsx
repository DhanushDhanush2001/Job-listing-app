import React, { useEffect, useState,useContext} from "react";
import { Link,Navigate } from "react-router-dom";
import useJobStore from "../store/job";
import { Context } from "../main";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { jobs, getAllJobs } = useJobStore();
  const { isAuthorized, user } = useContext(Context);

    useEffect(() => {
    getAllJobs(search);
  }, [getAllJobs, search,isAuthorized]);

    if (!isAuthorized) {
  return <Navigate to="/login" replace />;
   }


  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white racking-wide">
          Job Listings
        </h1>
        {isAuthorized && user?.role === "employer" && (
        <Link 
          to="/create"
          className="inline-flex items-center gap-2 btn-p2 hover:scale-105 transform transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Job
        </Link>
        )}
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title or company..."
            className="input-field pl-10 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or create a new job listing.</p>
          </div>
        ) : (
          jobs.map((job, index) => (
            <div 
              key={job._id || index} 
              className="card p-6 hover:shadow-md transition-all duration-200 animate-slide-up border-l-4 border-l-primary-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium">{job.company}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Skills and Tags */}
                  {(job.skills?.length > 0 || job.inclusiveTags?.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills?.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                      {job.inclusiveTags?.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 text-sm rounded-full font-medium">
                    {job.type}
                  </span>
                  
                  {job.inclusiveTypes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {job.inclusiveTypes.map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;