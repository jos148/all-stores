"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    const data: { message: string } = await res.json();

    if (res.ok) {
      toast.success("Account created", {
        description: "Welcome 🎉 Redirecting...",
      });

      // ✅ Redirect to home page
      router.replace("/");
    } else {
      toast.error("Registration failed", {
        description: data.message ?? "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-80 shadow-lg"
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="btn" disabled={loading} type="submit">
            Create Account
          </Button>
          <Link href="/login">
            <Button variant="link" className="mx-auto">
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
