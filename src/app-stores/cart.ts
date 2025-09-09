import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type CartItem = {
  product_id: string;
  slug_id: string;
  name: string;
  available_sizes: string[];
  price: number;
  discounted_price: number;
  discount_value: number;
  main_image: string;
  total_stock: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  size: string;
  setSize: (size: string) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => {
        // 🔹 helper to recalc totals whenever items change
        const updateTotals = (items: CartItem[]) => {
          const totalItems = items.reduce(
            (acc, item) => acc + item.quantity,
            0
          );

          const totalPrice = items.reduce((acc, item) => {
            const effectivePrice = item.discounted_price
            //   item.discounted_price && item.discounted_price > 0
            //     ? item.discounted_price
            //     : item.price;
            return acc + effectivePrice * item.quantity;
          }, 0);

          return { items, totalItems, totalPrice };
        };

        return {
          items: [],
          totalItems: 0,
          totalPrice: 0,
          size: '',
          setSize: (size) => set({ size }),
          addToCart: (item) => {
            const { items } = get();
            const existing = items.find((i) => i.product_id === item.product_id);

            if (existing) {
              if (existing.quantity < existing.total_stock) {
                const updated = items.map((i) =>
                  i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
                );
                set(updateTotals(updated));
              }
            } else {
              if (item.total_stock > 0) {
                const updated = [...items, { ...item, quantity: 1 }];
                set(updateTotals(updated));
              }
            }
          },

          removeFromCart: (id) => {
            const updated = get().items.filter((i) => i.product_id !== id);
            set(updateTotals(updated));
          },

          increaseQuantity: (id) => {
            const updated = get().items.map((i) => {
              if (i.product_id === id && i.quantity < i.total_stock) {
                return { ...i, quantity: i.quantity + 1 };
              }
              return i;
            });
            set(updateTotals(updated));
          },

          decreaseQuantity: (id) => {
            const updated = get().items.map((i) => {
              if (i.product_id === id) {
                // Don't let it go below 1
                return { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 };
              }
              return i;
            });

            set(updateTotals(updated));
          },

          clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
        };
      },
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
