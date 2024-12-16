import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { NewProductDialog } from "./new-product.dialog";
import { EditProductDialog } from "./edit-product-dialog";
import { ProductDetailsDialog } from "./product-details-dialog";
import { useCookies } from "react-cookie";
import React from "react";
import Link from "next/link";

const ProductsTable = () => {
  const [cookies, setCookie] = useCookies(["products"]);
  const [productsInCart, setProductsInCart] = React.useState<
    { id: number; product: Product; amount: number }[]
  >(cookies.products || []);
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const queryClient = useQueryClient();
  const addProductToCart = (product: Product) => {
    const updatedCart = [...productsInCart];
    const productInCart = updatedCart.find((p) => p.id === product.id);
    if (productInCart) {
      productInCart.amount++;
    } else {
      updatedCart.push({ id: product.id, product, amount: 1 });
    }
    setProductsInCart(updatedCart);
    setCookie("products", JSON.stringify(updatedCart));
  };
  console.log(cookies);
  const getProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response);
    return response.json();
  };
  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const {
    isPending,
    error,
    data: products,
    isFetching,
  } = useQuery<Product[]>({ queryKey: ["products"], queryFn: getProducts });

  if (isPending || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex gap-4 self-start items-center">
        <h2 className="text-2xl">Products table</h2>
        {isAdmin && <NewProductDialog />}
        {!isAdmin && <Link href={"/cart"}>Go to cart</Link>}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Weight[kg]</TableHead>
            <TableHead>Price[PLN]</TableHead>
            <TableHead>Category</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
            {!isAdmin && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.weight}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              {isAdmin && (
                <TableCell className="flex gap-2">
                  <ProductDetailsDialog
                    name={product.name}
                    index={product.index}
                    weight={product.weight}
                    price={product.price}
                    categoryName={product.categoryName}
                  />
                  <Button onClick={() => deleteProduct(product.id)}>Delete product</Button>
                  <EditProductDialog
                    id={product.id}
                    name={product.name}
                    index={product.index}
                    weight={product.weight}
                    price={product.price}
                    categoryId={product.categoryId}
                  />
                </TableCell>
              )}
              {!isAdmin && (
                <TableCell>
                  <Button onClick={() => addProductToCart(product)}>Add to cart</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { ProductsTable };
