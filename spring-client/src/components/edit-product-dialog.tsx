import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditProductDialog = ({
  id,
  name,
  index,
  price,
  weight,
  categoryId,
}: {
  id: number;
  name: string;
  index: number;
  price: number;
  weight: number;
  categoryId: number;
}) => {
  const getCategories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
    return response.json();
  };
  const queryClient = useQueryClient();
  const updateProduct = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const index = formData.get("index") as string;
    const price = formData.get("price") as string;
    const weight = formData.get("weight") as string;
    const categoryId = formData.get("category") as string;
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, index, price, weight, categoryId }),
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  const { data: categories } = useQuery<Category[]>({ queryKey: ["categories"], queryFn: getCategories });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit product</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={updateProduct}>
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>Edit product</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input name="name" className="col-span-3" defaultValue={name} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="index" className="text-right">
                Index
              </Label>
              <Input
                name="index"
                className="col-span-3"
                type="number"
                min={1}
                step={1}
                defaultValue={index}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                name="price"
                className="col-span-3"
                type="number"
                step={0.1}
                defaultValue={price}
                min={0.1}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <Input
                name="weight"
                className="col-span-3"
                step={0.1}
                defaultValue={weight}
                required
                min={0.1}
              />
            </div>
            <Select name="category" defaultValue={categoryId?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Update product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { EditProductDialog };
