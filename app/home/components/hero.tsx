import { Button } from "@/components/ui/button";
import Link from "next/link";

// components/Hero.js
export default function Hero() {
  return (
    <section className="bg-gray-100 dark:bg-black p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Discover the Best Deals, Every Day!
      </h2>
      <p className="mb-4">
        Shop from thousands of products – fast delivery and secure checkout
        guaranteed.
      </p>
      <Link href="/products">
        <Button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Shop Now
        </Button>
      </Link>
    </section>
  );
}
