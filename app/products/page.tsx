import Image from "next/image";
import Link from "next/link";
import { products, Category } from "./data";
import AddToCartButton from "@/app/components/add-to-cart-button";


const categories: { label: string; value: Category }[] = [
  { label: "Shoes", value: "shoes" },
  { label: "Suits", value: "suits" },
  { label: "Food", value: "food" },
  { label: "Drinks", value: "drinks" },
];

export default function ProductsPage() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category.value
        );

        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.value} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{category.label}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative w-full h-48 overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <h3 className="mt-2 font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </Link>
                  {/* ✅ Add to cart */}
                  <AddToCartButton
                    item={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
