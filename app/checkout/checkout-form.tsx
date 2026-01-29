"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";

export const dynamic = "force-dynamic";


function generateReceiptCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function CheckoutPage() {
  const { items, clear } = useCartStore();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCheckoutData = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      setEmail(data.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, phone, location")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setName(profile.name ?? "");
        setPhone(profile.phone ?? "");
        setLocation(profile.location ?? "");
      }

      setLoading(false);
    };

    loadCheckoutData();
  }, []);

  const handlePlaceOrder = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return toast.error("Not logged in");

    if (items.length === 0) return toast.error("Your cart is empty");

    // Save updated profile info
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      phone,
      location,
    });

    if (profileError) return toast.error("Failed to update profile");

    // Insert order
    const receiptCode = generateReceiptCode();
    const { error: orderError } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        receipt_code: receiptCode,
        items: items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      },
    ]);

    if (orderError) return toast.error("Failed to place order");

    toast.success("Order placed!");

    // Clear cart
    clear();

    // Redirect to receipt page
    window.location.href = `/receipt/${receiptCode}`;
  };

  if (loading) return <p>Loading checkout...</p>;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Profile Form */}
      <div className="space-y-2 border p-4 rounded-md">
        <h2 className="font-semibold">Your Info</h2>
        <Label>Email</Label>
        <Input value={email} disabled />

        <Label>Full Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Label>Phone</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      {/* Cart Summary */}
      <div className="space-y-2 border p-4 rounded-md">
        <h2 className="font-semibold">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      <Button onClick={handlePlaceOrder}>Place Order</Button>
    </div>
  );
}
