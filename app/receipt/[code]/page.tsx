import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export default async function ReceiptPage({
  params,
}: {
  params: { code: string };
}) {
  await dbConnect();

  const order = await Order.findOne({
    receiptCode: params.code,
  }).lean();

  if (!order) return <p>Receipt not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">Payment Receipt</h1>
      <p className="text-sm text-gray-500 mb-4">
        Receipt Code: <b>{order.receiptCode}</b>
      </p>

      <div className="space-y-2">
        {order.items.map((item: any) => (
          <div key={item.productId} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${order.total}</span>
      </div>
    </div>
  );
}
