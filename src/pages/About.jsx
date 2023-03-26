import React from 'react';

function About() {
  return (
    <div className="md:px-16 tracking-normal leading-3 px-8 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-center text-neutral-600 mb-2">
        AskTales is a storytelling web application designed for readers, travelers, and tourists who are lovers of novel, life story, non-fiction and fiction literacy.
      </p>
      <p className="text-lg text-center text-neutral-600 mb-2">
        Our platform offer users literary contents and true stories from different places and multicultural orientations. 
      </p>
      <p className="text-lg text-center text-neutral-600 mb-2">
        All these services and qualities which we offer are made available by our team of expert authors. This web  application provides a platform for authors or individuals who are willing to share their stories and publish their work.
      </p>
      <p className="text-lg text-center text-neutral-600 mb-2">
        The qualities and services which we offer are core values in our operation and we hoped to keep updating and upgrading our services to meet your future demands.
      </p>
      <div className="flex flex-row items-center justify-center mt-4">
        <img className="w-24 h-24 rounded-full mr-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkrjPgeTsc_U5kkyfmRqtncLVluQ9Y2h0r8HJSzJU&s" alt="profile" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Team management</h2>
          <p className="text-neutral-600">AskTales</p>
          
        </div>
      </div>
    </div>
  );
}

export default About;
