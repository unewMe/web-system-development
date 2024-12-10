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

const NewCategoryDialog = () => {
  const queryClient = useQueryClient();
  const createCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    console.log(name, code);
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create category</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={createCategory}>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>Create new category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input name="code" className="col-span-3" required pattern="[A-Z][0-9]" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create new category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { NewCategoryDialog };
