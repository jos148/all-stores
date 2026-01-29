"use client";

import { Button } from "@/components/ui/button";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";
import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";
import { useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";



const AppNav = () => {
  const supabase = getSupabaseClient();

  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState<string | null>(null);
  const totalItems = useCartStore((state) => state.items?.length || 0);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });

    // Listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setEmail(session?.user.email ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full dark:bg-amber-950 flex items-center justify-between p-2 border-b border-b-amber-200 dark:border-b-amber-700 sticky top-0 z-50 bg-white">
      <div className="p-4 font-bold">ALL STORES</div>

      <div className="flex gap-4">
        <Link href="/" className="p-4">
          Home
        </Link>
        <Link href="/products" className="p-4">
          Products
        </Link>
        <Link href="/cart" className="p-4">
          Cart
        </Link>

        {email && (
          <Link href="/profile" className="p-4">
            Profile
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div>
        {totalItems > 0 && (
          <span className="relative -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            +{totalItems}
          </span>
        )}
        <ShoppingCart />

        </div>

        {email ? (
          <>
            <span className="text-sm">{email}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
        </Button>
      </div>
    </div>
  );
};

export default AppNav;
