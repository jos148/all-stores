import { Metadata } from "next";
import Image from "next/image";
import { products } from "../data";

type Props = {
  params: {
    productId: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find((p) => p.id === params.productId);

  return {
    title: product ? product.name : "Product not found",
  };
}

export default function ProductDetails({ params }: Props) {
  const product = products.find((p) => p.id === params.productId);

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
