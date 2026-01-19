"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type Props = {
  item: CartItem;
};

export default function AddToCartButton({ item }: Props) {
  const { items, add, increase, decrease, remove } = useCartStore();

  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="flex gap-2 items-center">
      {quantity > 0 && (
        <>
          <Button size="sm" onClick={() => decrease(item.id)}>
            -
          </Button>

          <span>{quantity}</span>

          <Button size="sm" onClick={() => increase(item.id)}>
            +
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => remove(item.id)}
          >
            Remove
          </Button>
        </>
      )}

      {quantity === 0 && (
        <Button size="sm" onClick={() => add({ ...item, quantity: 1 })}>
          Add to Cart
        </Button>
      )}
    </div>
  );
}
