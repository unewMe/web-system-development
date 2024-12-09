import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

const CategoriesTable = () => {
  const queryClient = useQueryClient();
  const getProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
    return response.json();
  };
  const addCategory = async () => {
    const name = prompt("Enter category name:");
    const code = prompt("Enter category code:");
    if (!name || !code || !/^[A-Z]\d$/.test(code)) {
      alert("Invalid name or code");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, code }),
    });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };
  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };
  const {
    isPending,
    error,
    data: categories,
    isFetching,
  } = useQuery<Category[]>({ queryKey: ["categories"], queryFn: getProducts });

  if (isPending || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex gap-4 self-start items-center">
        <h2 className="text-2xl">Categories table</h2>
        <Button onClick={addCategory}>Add category</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.code}</TableCell>
              <TableCell>
                <Button onClick={() => deleteCategory(category.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { CategoriesTable };
