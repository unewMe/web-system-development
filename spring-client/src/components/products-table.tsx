import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { NewProductDialog } from "./new-product.dialog";
import { EditProductDialog } from "./edit-product-dialog";
import { ProductDetailsDialog } from "./product-details-dialog";

const ProductsTable = () => {
  const queryClient = useQueryClient();
  const getProducts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
    );
    return response.json();
  };
  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
      method: "DELETE",
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
        <NewProductDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Weight[kg]</TableHead>
            <TableHead>Price[PLN]</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.weight}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell className="flex gap-2">
                <ProductDetailsDialog
                  name={product.name}
                  index={product.index}
                  weight={product.weight}
                  price={product.price}
                  categoryName={product.categoryName}
                />
                <Button onClick={() => deleteProduct(product.id)}>
                  Delete product
                </Button>
                <EditProductDialog
                  id={product.id}
                  name={product.name}
                  index={product.index}
                  weight={product.weight}
                  price={product.price}
                  categoryId={product.categoryId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { ProductsTable };
