"use client";
import { CategoriesTable } from "@/components/categories-table";
import { ProductsTable } from "@/components/products-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const [gettingToken, setGettingToken] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    if (token) {
      setGettingToken(false);
    }
  }, [router]);
  if (gettingToken) {
    return <div className="text-center text-4xl mt-8">Loading...</div>;
  }
  return (
    <main className="flex flex-col items-center gap-5">
      <Button
        className="self-end mt-4"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.push("/login");
        }}
      >
        Logout
      </Button>
      <h1 className="text-4xl">Lista produktów i kategorii</h1>

      <ProductsTable />
      {isAdmin && <CategoriesTable />}
    </main>
  );
}
