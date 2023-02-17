import React from 'react';
import { Link } from 'react-router-dom';

type NavProps = {
  title: string;
  links: Array<{
    text: string;
    url: string;
  }>;
};

const Nav: React.FC<NavProps> = ({ title, links }) => {
  return (
<div className='border border-b'>
  <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
  <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
    <div className="max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
      <div className="flex flex-row items-center justify-between p-4">
        <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">{title}</Link>

        <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
        {links.map(link => (
            <Link key={link.text}  to={link.url} 
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" 
            > {link.text} </Link>
            ))}
        </nav>
    </div>
  </div>
</div>
  </div>
  </div>
  );
};

export default Nav;