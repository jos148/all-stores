"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
