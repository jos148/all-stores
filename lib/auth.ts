import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getAuthUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    await dbConnect();
    const user = await User.findById(decoded.userId).lean();

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  } catch {
    return null;
  }
}
