import React from 'react';
import { Headline } from '../types';
import { selectArticle } from '../store/news';
import store from '../store';
import { Link } from 'react-router-dom';

interface Props {
  headline: Headline;
}

const Card: React.FC<Props> = ({headline}) => {


  return (
    <div className="mx-auto lg:max-w-7xl mt-3">
      <div className="max-w-7xl mx-auto px-5 mb-3">
        <div className="mt-6  gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="flex max-w-[70rem] grid grid-cols-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className='w-full h-full col-span-2'>
              <img className="w-full h-full object-cover rounded-t-lg px-5 py-2" src={headline.urlToImage} alt={headline.title} />
            </a>
            <div className="p-5 col-span-3">
              <Link to={`article/${headline.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{headline.title}</h5>
              </Link>
              <div className="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">{headline.author}</div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{headline.description}</p>
              <Link to={`article/${headline.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3. 293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
