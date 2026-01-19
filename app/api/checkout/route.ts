import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { generateReceiptCode } from "@/lib/receipt";

export async function POST(req: Request) {
  await connectDB(); // 🔥 REQUIRED

  const body = await req.json();

  const order = await Order.create({
    receiptCode: generateReceiptCode(),
    name: body.name,
    phone: body.phone,
    location: body.location,
    items: body.items,
  });

  return NextResponse.json(order);
}
