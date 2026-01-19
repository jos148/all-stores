//import { createSupabaseServerClient } from "@/lib/supabase/server";
//import { redirect } from "next/navigation";
import CheckoutForm from "./checkout-form";

export default async function CheckoutPage() {
  //const supabase = createSupabaseServerClient();
//const {
  //data: { user },
//} = await supabase.auth.getUser()
const user = null;

  //return <CheckoutForm user={user} />;
  return <CheckoutForm user={user} />;
}
