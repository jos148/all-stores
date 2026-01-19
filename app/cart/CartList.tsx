"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CartList() {
  const { items, increase, decrease, remove } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const checkoutLink = "/checkout";


  if (items.length === 0) return <p>Your cart is empty 🛒</p>;

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-4 rounded-lg"
        >
          <div className="flex gap-4 items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="object-cover rounded"
            />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>${item.price}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Button size="sm" onClick={() => decrease(item.id)}>
              -
            </Button>
            <span>{item.quantity}</span>
            <Button size="sm" onClick={() => increase(item.id)}>
              +
            </Button>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => remove(item.id)}
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 border-t">
        <h2 className="text-xl font-bold">Total: ${total}</h2>
        <Link href={checkoutLink}>
          <Button>Proceed to Checkout</Button>
        </Link>
      </div>
    </>
  );
}
