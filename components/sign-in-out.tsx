import Link from "next/link";
//import { getAuthUser } from "@/lib/auth";
import { LogoutButton } from "@/app/components/logout-button";

interface User {
  email: string;
}

export default async function SignInOut() {
  //const user = await getAuthUser();
  const user: User | null = null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/profile">{(user as User).email}</Link>
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
