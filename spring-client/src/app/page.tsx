"use client";
import { CategoriesTable } from "@/components/categories-table";
import { ProductsTable } from "@/components/products-table";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-5 mt-10">
      <h1 className="text-4xl">Lista produktów i kategorii</h1>

      <ProductsTable />

      <CategoriesTable />
    </main>
  );
}
