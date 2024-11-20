"use client";

import { useBag } from "@/store/bag";

import { formatCurrency } from "@/utils/format-currency";

import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

export function Total() {
  const { reset, total } = useBag();

  const handleSubmit = () => {
    if (total() === 0) {
      alert("Você não tem itens na sacola!");
      return;
    }

    alert("Pedido enviado com sucesso!");
    reset();
  };

  return (
    <div className="flex items-center justify-between border-b last:border-b-0 pb-3">
      <div className="flex items-center gap-2 text-xl font-bold">
        <h2>Total:</h2>
        <p>{formatCurrency(total())}</p>
      </div>
      <Button onClick={handleSubmit}>
        <ShoppingBagIcon className="size-4" /> Finalizar pedido
      </Button>
    </div>
  );
}
