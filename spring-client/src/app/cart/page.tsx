"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Cart() {
  const [gettingToken, setGettingToken] = React.useState(true);
  const [cookies, setCookie] = useCookies(["products"]);
  const router = useRouter();
  console.log(cookies.products);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || localStorage.getItem("role") === "ADMIN") {
      router.push("/login");
    }
    if (token) {
      setGettingToken(false);
    }
  }, [router]);
  const changeProductAmount = (id: number, amount: number) => {
    const updatedCart = cookies.products.map((product: { product: Product; amount: number }) => {
      if (product.product.id === id) {
        return { ...product, amount };
      }
      return product;
    });
    setCookie("products", JSON.stringify(updatedCart));
  };
  const onProductDelete = (id: number) => {
    const updatedCart = cookies.products.filter(
      (product: { product: Product; amount: number }) => product.product.id !== id
    );
    setCookie("products", JSON.stringify(updatedCart));
  };
  if (gettingToken) {
    return <div className="text-center text-4xl mt-8">Loading...</div>;
  }
  return (
    <div className="flex flex-col mt-8 items-center">
      <Link href="/" className="text-2xl self-start">
        Go back
      </Link>
      <h2 className="text-3xl font-bold mb-8">
        Total price:{" "}
        {cookies.products?.reduce((acc: number, p: { product: Product; amount: number }) => {
          return acc + p.product.price * p.amount;
        }, 0)}
      </h2>
      <div className="flex flex-wrap gap-8">
        {cookies.products?.map((product: { product: Product; amount: number }) => (
          <ProductCard
            key={product.product.id}
            product={product.product}
            amount={product.amount}
            setAmount={changeProductAmount}
            onDelete={onProductDelete}
          />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({
  product,
  setAmount,
  onDelete,
  amount,
}: {
  product: Product;
  setAmount: (id: number, number: number) => void;
  onDelete: (id: number) => void;
  amount: number;
}) => {
  return (
    <div className="flex flex-col gap-4 items-center rounded-xl shadow-xl p-5">
      <div className="flex flex-col items-start gap-2">
        <h2>Name: {product.name}</h2>
        <p>Index: {product.index}</p>
        <p>Price: {product.price}</p>
      </div>
      <div>
        <div className="flex gap-2 items-baseline">
          <span>Amount: </span>
          <Input
            type="number"
            step={1}
            min={1}
            value={amount}
            onChange={(e) => setAmount(product.id, Number(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={() => onDelete(product.id)}>Delete</Button>
    </div>
  );
};
