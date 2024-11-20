import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	items: Item[];
	total: () => number;
	add: ({ name, price, id, quantity }: Item) => void;
	updateQuantity: ({ id, quantity }: { id: string; quantity: number }) => void;
	remove: ({ id }: { id: string }) => void;
	reset: () => void;
}

interface Item {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

export const useBag = create<Props>()(
	persist<Props>(
		(set, get) => ({
			items: [],
			total: () =>
				get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
			add: ({ name, price, id, quantity }) =>
				set((state) => ({
					items: [...state.items, { id, name, price, quantity }],
				})),
			updateQuantity: ({ id, quantity }) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.id === id ? { ...item, quantity } : item,
					),
				})),
			remove: ({ id }) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),
			reset: () => set({ items: [] }),
		}),
		{
			name: "restaurante-falae:bag:store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
