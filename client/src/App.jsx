import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateJob from './pages/CreateJob';
import Login from './pages/Login'
import './index.css';
import Register from './pages/Register';
import Footer from './components/Footer';


function App() {
  const [theme, setTheme] = useState('light');

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <Router>
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/create" element={<CreateJob />} />
          </Routes>
        </main>
        <Footer/>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </Router>
    </div>
  );
}

export default App;