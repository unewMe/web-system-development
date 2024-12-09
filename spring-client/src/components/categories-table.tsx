import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { NewCategoryDialog } from "./new-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";

const CategoriesTable = () => {
  const queryClient = useQueryClient();

  const getCategories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
    return response.json();
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  const {
    isPending,
    error,
    data: categories,
    isFetching,
  } = useQuery<Category[]>({ queryKey: ["categories"], queryFn: getCategories });

  if (isPending || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex gap-4 self-start items-center">
        <h2 className="text-2xl">Categories table</h2>
        <NewCategoryDialog />
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
              <TableCell className="flex gap-2">
                <Button onClick={() => deleteCategory(category.id)}>Delete</Button>
                <EditCategoryDialog id={category.id} name={category.name} code={category.code} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { CategoriesTable };
