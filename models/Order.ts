import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    receiptCode: String,
    name: String,
    phone: String,
    location: String,
    items: Array,
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
