# Job Listing App

A full-stack job listing web application built with React, Zustand, and a Node.js/Express backend.  
This app allows users to browse, search, and create job postings with role-based access.

---

## Features

- Browse and search jobs by title or company
- Role-based authentication and authorization
- Employers can create new job listings
- Responsive UI with React and Tailwind CSS
- State management with Zustand
- REST API backend using Express and MongoDB

---

## Tech Stack

- **Frontend:** React, Vite, React Router DOM, Zustand, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** Context API with protected routes
- **API Requests:** Fetch API

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/job-listing-app.git
   cd job-listing-app

2.Install dependencies for both frontend and backend
cd frontend
npm install


cd ../backend
npm install


3.Set up environment variables (for backend):
Create a .env file in the backend folder with:
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key

4.Run the backend server:
cd backend
npm run dev

5.Run the frontend development server with Vite:

cd frontend
npm run dev

6.Open your browser at http://localhost:5173 (default Vite port)

Usage
Register and login as either a job seeker or employer

Job seekers can browse and search jobs

Employers can create and manage job listings

API Endpoints
GET /api/v1/job/getAllJobs?search=keyword - Fetch all jobs with optional search

POST /api/v1/job/postjob - Create a new job (employer only)

Authentication endpoints (login, register) [if implemented]

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

