import React from 'react'
import Hero from './components/hero';
import Categories from './components/categories';

const Home = () => {

  return (
    <div className="p-8 bg-gray-100 dark:bg-black h-full">
      {/*<Card>
        <video
          src="/All Stores.mp4"
          autoPlay
          loop
          muted
          className="w-56 h-56 object-cover"
        />
      </Card>*/}
      <Hero />
      <Categories />
      {/*<Card>
        <CardHeader>
          <CardTitle>Discover the Best Deals, Every Day!</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Shop from thousands of products across all categories – fast
            delivery and secure checkout guaranteed.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/profile" className="text-amber-600 underline">
            Go to Profile
          </Link>
        </CardFooter>
      </Card>*/}
    </div>
  );
}

export default Home;