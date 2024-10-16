import React from 'react';

export default function Footer() {
  return (
    <footer className="text-gray-600 py-12 shadow-inner" style={{backgroundColor : "#F4F2EE"}} >
      <div className="w-5/6 mx-auto flex flex-col md:flex-row justify-between items-start">
        
        <div className="mb-8 md:mb-0 max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-sm mb-6">
          Feel free to reach out with any questions, feedback, or just to say hello. We're always here to help!
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-500"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="hover:text-yellow-500"><i className="fab fa-linkedin fa-lg"></i></a>
            <a href="#" className="hover:text-yellow-500"><i className="fab fa-pinterest fa-lg"></i></a>
            <a href="#" className="hover:text-yellow-500"><i className="fab fa-twitter fa-lg"></i></a>
          </div>
        </div>

        <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8">
          <div className=" p-6 rounded-lg text-center shadow-lg" style={{backgroundColor : "#F4F2EE"}}>
            <i className="fas fa-basketball-ball text-gray-500 text-2xl mb-4"></i>
            <p>shefo.com</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg" style={{backgroundColor : "#F4F2EE"}}>
            <i className="fas fa-envelope text-gray-500 text-2xl mb-4"></i>
            <p>shefo@gmail.com</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
