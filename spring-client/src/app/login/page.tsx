"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export default function LoginPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        console.log("Token and role removed after 1 minute");
      }, 600000); // 60000 milliseconds = 1 minute
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      router.push("/");
    },
    onError: () => {
      alert("Invalid username or password");
    },
  });
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
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
        <div className="flex justify-between w-full items-baseline">
          <Button type="submit">Login</Button>
          <Link href="/signup" className="underline self-end">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}
