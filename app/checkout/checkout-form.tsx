"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ user }: { user: null }) {
  const { items, clear } = useCartStore();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !location) {
      toast.error("Please fill all fields");
      return;
    }

    console.log("Order:", { user, name, phone, location, items });

    toast.success("Order placed!");
    clear();
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 dark:bg-black">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <Label>Full Name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <Label>Phone</Label>
      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />

      <Label>Location</Label>
      <Input value={location} onChange={(e) => setLocation(e.target.value)} />

      <Button className="w-full mt-4" onClick={handleSubmit}>
        Place Order
      </Button>
    </div>
  );
}
