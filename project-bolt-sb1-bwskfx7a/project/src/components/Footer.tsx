import React from 'react';
import { Link } from 'react-router-dom';
import { Shuffle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shuffle className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">FileSwap</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              A random file exchange platform. Upload a file, get a random one in return from somewhere in the world.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-gray-400 hover:text-white text-sm">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@fileswap.example.com"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FileSwap. All rights reserved.
          </p>
          
          <p className="text-gray-400 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by FileSwap Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;