import React from 'react';
import { Shuffle, FileQuestion, Shield, Globe, FileSearch } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Shuffle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About FileSwap</h1>
            <p className="text-xl text-gray-600">
              A unique file sharing platform that connects people through random exchanges
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              FileSwap was born out of a simple question: What if we could create serendipitous connections through file sharing? We wanted to build a platform that brings back the element of surprise and discovery that's often missing in our digital lives.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Unlike traditional file sharing services, FileSwap doesn't just help you store or send files—it creates an experience of exchange and discovery. Every file you upload connects you to someone else in the world who will receive your file, and in return, you'll get something unexpected.
            </p>
            <p className="text-lg text-gray-600">
              We believe in the power of random connections to spark creativity, share knowledge, and create moments of delight. FileSwap is our way of adding a bit of serendipity to the internet.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How FileSwap Works</h2>
            <p className="text-xl text-gray-600">
              A simple process with security at its core
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <FileQuestion className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Upload Any File</h3>
                <p className="text-gray-600">
                  Start by uploading any file to our platform. It could be a photo, a document, music, art, or anything else you'd like to share (within our content guidelines).
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Security Scanning</h3>
                <p className="text-gray-600">
                  We automatically scan your file using VirusTotal's advanced scanning engine to ensure it's safe and free from malware. Only clean files are added to our exchange pool.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <Globe className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Location Tagging</h3>
                <p className="text-gray-600">
                  Your file is tagged with your approximate location (country and city level only) to add context to the exchange, creating a sense of global connection.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-6 rounded-full shadow-sm">
                <FileSearch className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Random Exchange</h3>
                <p className="text-gray-600">
                  In return for your upload, you receive a completely random file from the pool, along with information about where it came from, creating a unique exchange experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guidelines */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Content Guidelines</h2>
            <p className="text-lg text-gray-600 mb-6">
              To ensure FileSwap remains a positive platform for everyone, we have some basic guidelines for the content that can be shared:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>No illegal content of any kind</li>
              <li>No personal or sensitive information</li>
              <li>No malware, viruses, or harmful code</li>
              <li>No hateful, violent, or discriminatory content</li>
              <li>No adult or explicit content</li>
              <li>No content that violates intellectual property rights</li>
            </ul>
            
            <p className="text-lg text-gray-600 mt-6">
              Files that violate these guidelines will be removed, and repeated violations may result in account restrictions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 mb-12">
              The people behind FileSwap
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">JD</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
                <p className="text-gray-500 mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Former software engineer with a passion for creating unique digital experiences.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">JS</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Jane Smith</h3>
                <p className="text-gray-500 mb-4">CTO</p>
                <p className="text-gray-600 text-sm">
                  Security expert ensuring all exchanges on FileSwap are safe and protected.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">MJ</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Mike Johnson</h3>
                <p className="text-gray-500 mb-4">Design Lead</p>
                <p className="text-gray-600 text-sm">
                  UX/UI designer focused on creating delightful user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;