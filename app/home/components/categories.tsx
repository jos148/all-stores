import { Card } from "@/components/ui/card";
import Image from "next/image";

const categories = [
  {
    name: "Premium Sports Sneakers",
    description:
      "Stylish and comfortable sneakers designed for everyday wear, workouts, and long-lasting performance.",
    image: "/images/nike.jpg",
  },
  {
    name: "Elegant Men’s Suit",
    description:
      "Tailored for a sharp, professional look. Perfect for business meetings, events, and special occasions.",
    image: "/images/suitblue.jpg",
  },
  {
    name: "Premium Roasted Coffee",
    description:
      "Richly roasted coffee beans delivering a smooth aroma and bold flavor in every cup.",
    image: "/images/coffee.jpg",
  },
  {
    name: "Classic Italian Pizza",
    description:
      "Freshly baked pizza topped with rich sauce, premium cheese, and carefully selected ingredients for great taste.",
    image: "/images/pizza.jpg",
  },
  {
    name: "Instant Classic Noodles",
    description:
      "Quick, tasty, and satisfying noodles made for a fast meal without compromising flavor.",
    image: "/images/nooles.jpg",
  },
];

export default function Categories() {
  return (
    <section className="p-8 bg-gray-100 dark:bg-black my-8">
      <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.name}
            className="bg-black dark:bg-gray-800 overflow-hidden hover:shadow-lg transition"
          >
            {/* Image wrapper */}
            <div className="relative w-full h-48">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Text content */}
            <div className="p-4">
              <h3 className="font-bold text-white">{cat.name}</h3>
              <p className="text-white">{cat.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
