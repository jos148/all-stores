// app/products/[productId]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { products } from "../data";

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;

  const product = products.find((p) => String(p.id) === productId);

  return {
    title: product ? product.name : "Product not found",
  };
}

// Page
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = products.find((p) => String(p.id) === productId);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="p-6">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="rounded"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">Price: ${product.price}</p>
      <p className="mt-2 text-gray-600">Product ID: {product.id}</p>
    </div>
  );
}
