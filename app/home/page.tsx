import React from 'react'
import Hero from './components/hero';
import Categories from './components/categories';

const Home = () => {

  return (
    <div className="p-8 bg-gray-100 dark:bg-black h-full">
      <Hero />
      <Categories />
    </div>
  );
}

export default Home;