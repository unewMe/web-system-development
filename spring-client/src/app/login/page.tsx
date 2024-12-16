"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const login = async ({ username, password }: { username: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include", // To handle cookies
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json(); // Or `response.text()` depending on the response type
};

export default function LoginPage() {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Error during login:", error);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    console.log(username, password);
    mutation.mutate({ username, password });
  };
  return (
    <div className="flex flex-col mt-16 items-center">
      <h1 className="font-bold text-3xl">Login</h1>
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
      <Link href="/signup">signup</Link>
    </div>
  );
}
