//import { redirect } from "next/navigation";
//import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  {/*const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();*/}

  //if (!user) redirect("/login"); // redirect if not logged in

  return (
    <div>
      <h1>Profile</h1>
      {/*<p>Email: {user.email}</p>
      <p>Role: {user.role}</p>*/}
    </div>
  );
}

