// app/cart/page.tsx
//import { createSupabaseServerClient } from "@/lib/supabase/server";
import CartList from "./CartList";

export default async function CartPage() {
  //const supabase = createSupabaseServerClient();
//const {
  //data: { user },
//} = await supabase.auth.getUser();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {/*<CartList user={user} />*/}
      <CartList />
    </div>
  );
}
