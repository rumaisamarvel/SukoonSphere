import React from 'react';

const ProfileDetail = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br shadow-sm from-white to-blue-50/40 min-h-screen p-4 sm:p-8 rounded-[10px]">
    <div className="mx-auto space-y-12">
      {/* Highlights Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Highlights
        </h2>
        <ul className="space-y-4 text-gray-700">
          {['Harvard Medical School', 'McLean Hospital', 'American Board of Psychiatry and Neurology'].map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="text-green-600 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>
                Assistant professor of psychiatry at{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 border-b border-blue-300">
                  {item}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quote Section */}
      <div className="relative">
        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
        <div className="pl-6">
          <svg className="h-8 w-8 text-green-500 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="italic text-gray-700 text-lg">
            "I am thrilled to be involved with SukoonSphere in their mission to bring accurate and accessible information regarding health issues to
            everyone. This is an especially critical time that the information available to the public in understanding their health is factual,
            clear, and contextually useful."
          </p>
          <p className="mt-4 font-semibold text-right text-gray-800">— STEVEN GANS, MD</p>
        </div>
      </div>

      {/* Experience Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Experience
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Dr. Gans is passionately involved in the practice and teaching of psychotherapy. He is an active supervisor, teacher, and mentor in the
            Massachusetts General Hospital (MGH)/McLean Adult Psychiatry Residency Training Program and in their Program in Psychodynamics (PIP).
          </p>
          <div className="flex flex-wrap gap-2">
            {['Boston Psychoanalytic Society and Institute', 'Laurel Hill Inn eating disorders treatment program', 'Harvard Review of Psychiatry', '"Best Doctors"'].map((item, index) => (
              <a key={index} href="#" className="text-blue-600 hover:text-blue-800 border-b border-blue-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Education
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Dr. Gans received a Bachelor in Science degree from Loyola University of Chicago. He earned his medical degree from Rush University Medical
          College. Dr. Gans did his residency in psychiatry at the Beth Israel Hospital in Boston. He is a graduate of the Boston Psychoanalytic
          Society and Institute.
        </p>
      </div>

      {/* About Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          About SukoonSphere
        </h2>
        <p className="text-gray-700 leading-relaxed">
          SukoonShpere, a{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800 border-b border-blue-300">
            Dotdash Meredith Brand
          </a>
          , is an award-winning, trusted, and compassionate online resource that provides the guidance you need to improve your mental health and find
          balance. We take a human approach to health and wellness content—and reach more than 150 million readers annually.
        </p>
      </div>
    </div>
  </div>
  );
};

export default ProfileDetail;
