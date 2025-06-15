import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useJobStore from '../store/job';
import { useNavigate } from 'react-router-dom';

const jobTitles = [
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Web Developer",
  "Mobile App Developer",
  "QA Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "Database Administrator",
  "UI/UX Designer",
  "Product Manager",
  "Game Developer",
  "Blockchain Developer",
  "Network Administrator",
  "Data Analyst",
  "Business Intelligence Analyst",
  "Data Engineer",
  "Statistician",
  "Data Architect",
  "Quantitative Analyst",
  "Research Analyst",
  "Business Analyst",
  "Project Manager",
  "Operations Manager",
  "Program Manager",
  "Chief Executive Officer",
  "Chief Operating Officer",
  "Chief Technology Officer",
  "Chief Marketing Officer",
  "Office Manager",
  "Administrative Assistant",
  "Graphic Designer",
  "Motion Designer",
  "Animator",
  "Video Editor",
  "Art Director",
  "Creative Director",
  "Illustrator",
  "Photographer",
];

const jobLocations = [
  "New York, USA",
  "San Francisco, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Seattle, USA",
  "Austin, USA",
  "Boston, USA",
  "Atlanta, USA",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Calgary, Canada",
  "Ottawa, Canada",
  "London, UK",
  "Manchester, UK",
  "Birmingham, UK",
  "Edinburgh, UK",
  "Bristol, UK",
  "Berlin, Germany",
  "Munich, Germany",
  "Frankfurt, Germany",
  "Hamburg, Germany",
  "Paris, France",
  "Lyon, France",
  "Marseille, France",
  "Toulouse, France",
  "Bangalore, India",
  "Hyderabad, India",
  "Mumbai, India",
  "Coimbatore, India",
  "Chennai, India",
  "Delhi, India",
  "Pune, India",
  "Kolkata, India",
  "Ahmedabad, India",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Brisbane, Australia",
  "Perth, Australia",
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Singapore",
  "Tokyo, Japan",
  "Osaka, Japan",
  "Beijing, China",
  "Shanghai, China",
  "Shenzhen, China",
  "Seoul, South Korea",
  "Johannesburg, South Africa",
  "Cape Town, South Africa",
  "Amsterdam, Netherlands",
  "Rotterdam, Netherlands",
  "Dublin, Ireland",
  "São Paulo, Brazil",
  "Rio de Janeiro, Brazil",
  "Mexico City, Mexico",
];

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Freelance",
  "Temporary",
  "Volunteer",
  "Apprenticeship",
  "Seasonal",
  "Hybrid",
  "On-Site",
  "Rotational",
];

const inclusiveTypesOptions = [
  'Careers Break',
  'Different Abilities',
  'Neurodiversity',
  'Gender Diversity',
  'Cultural Diversity',
  'Age Diversity',
  'Veterans',
  'Mental Health Support',
  'Flexible Working',
  'Accessibility',
  'Skills Development',
];

const CreateJob = () => {
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    inclusiveTags: '',
    skills: '',
    inclusiveTypes: [],
  });

  const navigate = useNavigate();
  const { postJob } = useJobStore();

  const handleInclusiveTypesChange = (type) => {
    setNewJob(prev => ({
      ...prev,
      inclusiveTypes: prev.inclusiveTypes.includes(type)
        ? prev.inclusiveTypes.filter(t => t !== type)
        : [...prev.inclusiveTypes, type]
    }));
  };

  const handleAddJob = async (jobData) => {
    // Required field validation
    if (
      !jobData.title ||
      !jobData.company ||
      !jobData.location ||
      !jobData.type ||
      !jobData.description
    ) {
      toast.error('Please fill all required fields', {
        position: 'top-right',
      });
      return;
    }

    // Prepare payload converting comma-separated strings to arrays
    const payload = {
      ...jobData,
      inclusiveTags: jobData.inclusiveTags
        ? jobData.inclusiveTags.split(',').map((tag) => tag.trim())
        : [],
      skills: jobData.skills
        ? jobData.skills.split(',').map((skill) => skill.trim())
        : [],
      inclusiveTypes: jobData.inclusiveTypes || [],
    };

    const res = await postJob(payload);
    if (!res?.success) {
      toast.error(res?.message || 'Something went wrong', {
        position: 'top-right',
      });
    } else {
      toast.success(res?.message || 'Job posted successfully!', {
        position: 'top-right',
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Job Listing</h1>
          <p className="text-gray-600 dark:text-gray-400">Fill out the form below to post a new job opportunity</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              required
            >
              <option value="" disabled>Choose a job title</option>
              {jobTitles.map((title, i) => (
                <option value={title} key={i}>{title}</option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter company name"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              required
            >
              <option value="" disabled>Choose a location</option>
              {jobLocations.map((location, i) => (
                <option value={location} key={i}>{location}</option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field"
              value={newJob.type}
              onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
              required
            >
              <option value="" disabled>Choose job type</option>
              {jobTypes.map((type, i) => (
                <option value={type} key={i}>{type}</option>
              ))}
            </select>
          </div>

          {/* Inclusive Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inclusive Types
            </label>
            <div className="grid grid-cols-2 gap-3">
              {inclusiveTypesOptions.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={newJob.inclusiveTypes.includes(type)}
                    onChange={() => handleInclusiveTypesChange(type)}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Inclusive Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inclusive Tags
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter tags separated by commas (e.g., remote-friendly, flexible-hours)"
              value={newJob.inclusiveTags}
              onChange={(e) => setNewJob({ ...newJob, inclusiveTags: e.target.value })}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple tags with commas</p>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Skills
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
              value={newJob.skills}
              onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple skills with commas</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="input-field resize-none"
              rows={6}
              placeholder="Describe the job role, responsibilities, and requirements..."
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleAddJob(newJob)}
              className="flex-1 btn-primary hover:scale-105 transform transition-all duration-200"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;