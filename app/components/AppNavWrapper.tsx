import AppNav from "@/components/appNav";
//import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AppNavWrapper() {
  //const supabase = createSupabaseServerClient();
  //const {
  //  data: { user },
//} = await supabase.auth.getUser();
//} = await supabase.auth.getUser();

  return <AppNav isAuthenticated={false} email={null} />;
}
