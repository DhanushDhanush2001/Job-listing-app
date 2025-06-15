import { Link } from 'react-router-dom';
// import Logo from '../../assets/logo.png';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-neutral-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-4">
            {/* <img src={Logo} alt="JobHub Logo" className="h-10 w-auto" /> */}
            <h1>Job Hub</h1>
            <p className="mt-4 text-neutral-600 dark:text-white text-sm">
              JobHub connects talented professionals with the best companies worldwide. 
              Find your dream job or the perfect candidate with our platform.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-neutral-500  hover:text-primary-500 transition-colors">
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <FaLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Saved Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/employer/post-job" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Recruitment Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-neutral-600 hover:text-primary-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500 dark:text-white text-center">
            &copy; {year} JobHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
