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
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ProductDetailsDialog = ({
  name,
  index,
  price,
  weight,
  categoryName,
}: {
  name: string;
  index: number;
  price: number;
  weight: number;
  categoryName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>Details of the selected product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name:</Label>
            <div className="col-span-3">{name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Index:</Label>
            <div className="col-span-3">{index}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price:</Label>
            <div className="col-span-3">{price.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Weight:</Label>
            <div className="col-span-3">{weight.toFixed(2)} kg</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category:</Label>
            <div className="col-span-3">{categoryName ?? "None"}</div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={closeDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ProductDetailsDialog };
