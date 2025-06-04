import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Shield, Globe, ArrowDownUp } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import FileDownloader from '../components/FileDownloader';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Shuffle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Exchange Files Randomly
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload a file into the pool, and receive a random file from somewhere in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Exchange Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upload a File</h2>
                <FileUploader />
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get a Random File</h2>
                <FileDownloader />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              A secure and private way to exchange files with the world
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ArrowDownUp className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Random Exchange</h3>
              <p className="text-gray-600">
                Upload any file to the pool and in return, get a completely random file that someone else has shared.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Security First</h3>
              <p className="text-gray-600">
                All files are scanned for viruses and malware using VirusTotal's powerful scanning engine before being added to the pool.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Discovery</h3>
              <p className="text-gray-600">
                See the approximate location where your file came from, creating a sense of global connection through random sharing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Exchange?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users sharing and discovering files across the globe.
            </p>
            <a
              href="#top"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:text-lg"
            >
              Upload Your First File
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;