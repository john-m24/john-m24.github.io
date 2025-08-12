import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            john
          </h1>
        </div>
        
        {/* Blog Link */}
        <div className="mb-16">
          <Link
            to="/blog"
            className="text-black underline hover:text-gray-600 transition-colors duration-200"
          >
            read blog
          </Link>
        </div>

        {/* Bottom Links */}
        <div className="absolute bottom-8 left-8 text-left">
          <div className="space-y-1 text-sm text-gray-500">
            <a 
              href="https://instagram.com/john" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
            >
              instagram
            </a>
            <div>
              <a 
                href="mailto:john@lunetscompany.com"
                className="hover:text-black transition-colors duration-200"
              >
                email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
