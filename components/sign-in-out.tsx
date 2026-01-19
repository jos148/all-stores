import Link from "next/link";
import { getAuthUser } from "@/lib/auth";
import { LogoutButton } from "@/app/components/logout-button";

export default async function SignInOut() {
  const user = await getAuthUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/profile">{user.email}</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
