//import { createSupabaseServerClient } from "@/lib/supabase/server";
//import { redirect } from "next/navigation";
import CheckoutForm from "./checkout-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function BreadcrumbBasic() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Checkout</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default function CheckoutPage() {
  return (
    <div>
      <div className="p-3">
        <BreadcrumbBasic />
      </div>
      <CheckoutForm />
  </div>
  );
}
