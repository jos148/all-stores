"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function ReceiptPage() {
  const { receiptCode } = useParams<{ receiptCode: string }>();

  const [order, setOrder] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!receiptCode) return;

    const loadReceipt = async () => {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch order (locked to user)
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("receipt_code", receiptCode)
        .eq("user_id", user.id)
        .single();

      if (orderError || !orderData) {
        setLoading(false);
        return;
      }

      setOrder(orderData);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, email, phone, location")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    loadReceipt();
  }, [receiptCode]);

  if (loading) return <p>Loading receipt...</p>;
  if (!order) return <p className="text-red-600">Receipt not found</p>;

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Order Receipt</h1>

      {profile && (
        <div className="border p-4 rounded-md space-y-1">
          <h2 className="font-semibold">Customer Info</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Location:</strong> {profile.location}</p>
        </div>
      )}

      <div className="border p-4 rounded-md space-y-2">
        <h2 className="font-semibold">Order</h2>
        <p><strong>Receipt:</strong> {order.receipt_code}</p>

        <ul className="list-disc pl-5">
          {order.items.map((item: any, i: number) => (
            <li key={i}>
              {item.name} × {item.quantity} — $
              {item.price * item.quantity}
            </li>
          ))}
        </ul>

        <p className="font-bold pt-2">Total: ${order.total}</p>
      </div>
    </div>
  );
}
