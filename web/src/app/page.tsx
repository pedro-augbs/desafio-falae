"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchIcon } from "lucide-react";

import { Products } from "@/components/products";
import { Bag } from "@/components/bag";
import { Total } from "@/components/total";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Restaurante Falaê</h1>

      <div className="flex flex-col gap-4 p-4 ring-1 ring-muted-foreground rounded-lg">
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Pesquisar produtos
          </Label>
          <SearchIcon className="absolute -z-10 left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Pesquisar produtos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
            autoComplete="off"
          />
        </div>
        <h2 className="text-2xl font-bold">Produtos</h2>
        <Products value={value} />
      </div>

      <div className="flex flex-col gap-4 p-4 ring-1 ring-muted-foreground rounded-lg">
        <h2 className="text-2xl font-bold">Sacola</h2>
        <Bag />
        <Total />
      </div>
    </main>
  );
}
