"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseClient } from "@/lib/supabase/client";



export const dynamic = "force-dynamic";


export default function ProfilePage() {
  const supabase = getSupabaseClient();

  // Auth fields
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Profile fields
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) return;

      // Auth info
      setEmail(data.user.email ?? null);
      setRole(data.user.role ?? "user");

      // Profile info
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, phone, location")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setName(profile.name ?? "");
        setPhone(profile.phone ?? "");
        setLocation(profile.location ?? "");
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("profiles").upsert({
      id: data.user.id,
      name,
      phone,
      location,
    });

    toast.success("Profile updated");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Details about your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="space-y-2">
          <p>Email: {email ?? "No email"}</p>
          <p>Role: {role ?? "user"}</p>
          </div>

          <hr />
          <div className="mt-4 space-y-2">
          <h2 className="">Personal Info</h2>

          <Label>Full Name</Label>
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label>Phone Number</Label>
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Label>Location</Label>
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Button onClick={saveProfile}>Save Profile</Button>
          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
