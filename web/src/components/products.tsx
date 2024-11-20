"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

import { useBag } from "@/store/bag";

import { api } from "@/lib/axios";

import { formatCurrency } from "@/utils/format-currency";

import { Loading } from "@/components/loading";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function Products({ value }: { value: string }) {
  const { add, items } = useBag();

  const { data, isLoading } = useQuery({
    queryKey: ["products", value],
    queryFn: async (): Promise<Product[]> => {
      return await api
        .get("/api/products", { params: { search: value } })
        .then((res) => res.data);
    },
  });

  const [imageStates, setImageStates] = useState<Record<string, string>>({});

  if (isLoading) return <Loading />;

  const handleImageError = (id: string) => {
    setImageStates((prev) => ({
      ...prev,
      [id]: "/fallback.webp",
    }));
  };

  if (data && data.length > 0) {
    return data.map((product) => {
      const handleAdd = () => {
        if (items.find((item) => item.id === product.id)) {
          alert("Esse produto já está na sacola!");
          return;
        }

        add({
          name: product.name,
          price: product.price,
          id: product.id,
          quantity: 1,
        });
      };

      const imageSrc = imageStates[product.id];

      return (
        <div
          key={product.id}
          className="flex items-center justify-between border-b last:border-b-0 pb-3"
        >
          <div className="flex items-center gap-2">
            {product.imageUrl && (
              <Image
                src={imageSrc || product.imageUrl}
                alt={"Imagem do produto"}
                width={100}
                height={100}
                className="rounded-lg aspect-square"
                onError={() => handleImageError(product.id)}
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p>{formatCurrency(product.price)}</p>
            </div>
          </div>
          <Button onClick={handleAdd}>
            <PlusIcon className="size-4" /> Adicionar
          </Button>
        </div>
      );
    });
  }

  return (
    <p className="text-muted-foreground text-center">
      Nenhum produto encontrado!
    </p>
  );
}
