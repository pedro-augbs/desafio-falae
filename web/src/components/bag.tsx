"use client";

import { useBag } from "@/store/bag";

import { formatCurrency } from "@/utils/format-currency";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export function Bag() {
  const { items, updateQuantity, remove } = useBag();

  if (items.length > 0) {
    return items.map((item) => {
      const handleInc = () => {
        updateQuantity({ id: item.id, quantity: item.quantity + 1 });
      };
      const handleDec = () => {
        if (item.quantity === 1) {
          confirm("Deseja realmente remover este item da sacola?") &&
            remove({ id: item.id });
          return;
        }

        updateQuantity({ id: item.id, quantity: item.quantity - 1 });
      };

      return (
        <div
          key={item.id}
          className="flex items-center justify-between border-b last:border-b-0 pb-3"
        >
          <div>
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>{formatCurrency(item.price)}</p>
          </div>
          <div className="space-x-4">
            <Button size={"icon"} onClick={handleDec}>
              <MinusIcon className="size-4" />
            </Button>
            <span className="font-bold text-xl">{item.quantity}</span>
            <Button size={"icon"} onClick={handleInc}>
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </div>
      );
    });
  }

  return (
    <p className="text-muted-foreground text-center">Sua sacola está vazia!</p>
  );
}
