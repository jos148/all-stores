"use client";

import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}
