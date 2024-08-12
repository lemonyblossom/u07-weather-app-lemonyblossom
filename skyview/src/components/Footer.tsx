import React from 'react';

const Footer: React.FC = () => {
   return (
      <footer className="bg-blue-200 dark:bg-blue-950 text-blue-900 dark:text-blue-200 p-4 flex justify-around items-center space-x-6">

         <a href="https://github.com/lemonyblossom" target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-200">
            Emma Jensen
         </a>
         <a href="https://github.com/lemonyblossom/u07-weather-app-lemonyblossom" target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-200">
            <i className="fab fa-github text-2xl"></i>
         </a>

         <a href="https://www.linkedin.com/in/emma-vestlund-jensen-91898496/" target="_blank" rel="noopener noreferrer" className="text-blue-900 dark:text-blue-200">
            <i className="fab fa-linkedin text-2xl"></i>
         </a>
         <a href="mailto:emmath93@hotmail.com" className="text-blue-900 dark:text-blue-200">
            <i className="fas fa-envelope text-2xl"></i>
         </a>
      </footer>
   );
};

export default Footer;
