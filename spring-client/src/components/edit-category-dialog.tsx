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
import { useQueryClient } from "@tanstack/react-query";

const EditCategoryDialog = ({ id, name, code }: { id: number; name: string; code: string }) => {
  const queryClient = useQueryClient();
  const updateCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    console.log(name, code);
    if (!name || !code || !/^[A-Z]\d$/.test(code)) {
      alert("Invalid name or code");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, code }),
    });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit category</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={updateCategory}>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>Edit category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input name="name" className="col-span-3" defaultValue={name} required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input name="code" className="col-span-3" defaultValue={code} required pattern="[A-Z][0-9]" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { EditCategoryDialog };
