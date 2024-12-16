"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const signup = async ({ username, password }: { username: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role: "USER",
    }),
    credentials: "include", // To handle cookies
  });

  if (!response.ok) {
    const errorText = await response.text(); // This will capture the HTML response or error message
    console.error("Error response body:", errorText);
    throw new Error("Signup failed");
  }

  return response.text();
};

export default function LoginPage() {
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
    },
    onError: (error) => {
      console.error("Error during signup:", error);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ username, password });
  };
  return (
    <div className="flex flex-col mt-16 items-center">
      <h1 className="font-bold text-3xl">Signup</h1>
      <form className="flex flex-col items-center gap-4 mt-8" action={handleSubmit}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <Link href="/login">login</Link>
    </div>
  );
}
