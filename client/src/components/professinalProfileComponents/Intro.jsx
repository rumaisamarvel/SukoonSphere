import React from 'react';

function Intro({ name, image, fullTitle, role, specialty, expertise }) {
    return (
        <div className=" py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl shadow-xl p-6 sm:p-12 backdrop-blur-sm border border-blue-100/30">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full opacity-20" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full opacity-20" />
            </div>
  
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Image Section */}
              <div className="flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-full shadow-2xl ring-8 ring-white/80"
                />
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
              </div>
  
              {/* Content Container */}
              <div className="flex-1 flex flex-col xl:flex-row gap-8 w-full">
                {/* Primary Info */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-3 text-center lg:text-left">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                      {name}
                    </h2>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <span className="bg-green-100 p-1.5 rounded-full text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <p className="text-blue-600 font-semibold">{role}</p>
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
                    <p className="font-bold text-gray-900 mb-3">Full Title</p>
                    <p className="text-gray-700 leading-relaxed">{fullTitle}</p>
                  </div>
                </div>
  
                {/* Secondary Info */}
                <div className="flex-1 space-y-6">
                  <div className="bg-white/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
                    <p className="font-bold text-gray-900 mb-3">Specialty</p>
                    <p className="text-gray-700 leading-relaxed">{specialty}</p>
                  </div>
                  {expertise && (
                    <div className="bg-white/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
                      <p className="font-bold text-gray-900 mb-3">Expertise</p>
                      <div className="space-y-2">
                        {expertise.map((exp, index) => (
                          <div
                            key={index}
                            className="text-gray-700 italic bg-white/80 p-3 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            "{exp}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Intro;
