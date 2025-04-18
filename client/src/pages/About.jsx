import { FaCode, FaUserShield, FaRegHandshake, FaLock } from 'react-icons/fa';
import images from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen text-gray-100 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">About Aura</h1>
        <p className="text-xl text-gray-300">Connecting Minds, Sharing Moments</p>
      </header>

      {/* About Aura Section */}
      <section className="mb-12 bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-full mr-3">
            <FaRegHandshake className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold">Welcome to Aura</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Aura is a next-generation social media platform designed to foster meaningful connections 
          and positive interactions. Our mission is to create a safe, inclusive space where users can 
          share experiences, build communities, and express themselves authentically.
        </p>
      </section>

      {/* Developer Section */}
      <section className="mb-12 bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-full mr-3">
            <FaCode className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold">About the Developer</h2>
        </div>
        <div className="flex items-center mb-4">
          <img 
            src={images.heroimgone} 
            alt="Sinthujan" 
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">Sinthujan</h3>
            <p className="text-gray-400">Full Stack Developer & Founder</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          With a passion for creating meaningful digital experiences, I developed Aura to address 
          the growing need for more authentic social interactions online. My expertise in modern 
          web technologies and user-centric design has shaped Aura into a platform that prioritizes 
          user privacy and positive engagement.
        </p>
      </section>

      {/* Terms of Service */}
      <section className="mb-12 bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-full mr-3">
            <FaUserShield className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold">Terms of Service</h2>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>By using Aura, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain respectful communication with all users</li>
            <li>Not share harmful or illegal content</li>
            <li>Respect intellectual property rights</li>
            <li>Be responsible for account security</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">
            We reserve the right to remove content or suspend accounts that violate these terms.
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="mb-12 bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <div className="bg-purple-500 p-3 rounded-full mr-3">
            <FaLock className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>Your privacy is our priority:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We collect minimal necessary data for service operation</li>
            <li>User data is never sold to third parties</li>
            <li>Transparent data usage policies</li>
            <li>Regular security audits</li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">
            Full policy available upon request. Last updated: 2025/04/17
          </p>
        </div>
      </section>

      {/* Contact */}
      <footer className="text-center py-8 border-t border-white">
        <p className="text-white-400 mb-4">Have questions?</p>
        <div className="flex justify-center space-x-6">
          <a href="mailto:contact@aura.social" className="text-green-400 hover:text-purple-300">
            contact@aura.xxx
          </a>
          <a href="https://twitter.com/" className="text-green-400 hover:text-purple-300">
            Twitter
          </a>
          <a href="https://linkedin.com/company/" className="text-green-400 hover:text-purple-300">
            LinkedIn
          </a>
        </div>
        <p className="text-white mt-6 text-sm">
          © {new Date().getFullYear()} Aura. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;