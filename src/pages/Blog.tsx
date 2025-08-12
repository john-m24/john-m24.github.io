import React from 'react'
import { Link } from 'react-router-dom'

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Back Link */}
        <div className="mb-12 text-left">
          <Link
            to="/"
            className="text-gray-500 hover:text-black transition-colors duration-200 underline"
          >
            ← back
          </Link>
        </div>

        {/* Blog Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            blog
          </h1>
          <p className="text-gray-500 text-lg">
            thoughts & writings
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8 text-left">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-medium text-black mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-500 text-sm">
              First post arriving shortly...
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-medium text-black mb-2">
              Stay Tuned
            </h2>
            <p className="text-gray-500 text-sm">
              More content on the way
            </p>
          </div>
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

export default Blog
