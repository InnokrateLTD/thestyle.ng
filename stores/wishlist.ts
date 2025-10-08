import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import {
  fetchUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/api-services/wishlist";

interface WishList{
    image: string;
  title: string;
  description: string;
  id: string | number | undefined
  price: number;
  oldPrice?: number;
}
interface WishlistState {
  items: WishList[];
  add: (product: WishList) => void;
  remove: (id: string | number | undefined) => void;
  syncWithBackend: (type: string, id?: string | number) => Promise<void>;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        add: (product) => {
          const exists = get().items.some(
            (item) => item.id === product.id
          );
          if (!exists) {
            const updated = [...get().items, product];
            set({ items: updated });

            // addToWishlist([{ product_id: product.product_id }]).catch((err) =>
            //   console.error("Add wishlist failed", err)
            // );
          }
        },

        remove: (id) => {
          const updated = get().items.filter(
            (item) => item.id !== id
          );
          set({ items: updated });

        //   removeFromWishlist(id).catch((err) =>
        //     console.error("Remove wishlist failed", err)
        //   );
        },

        syncWithBackend: async (type, id) => {
          try {
            const localWishlist = get().items;

            if (type === "add") {
                const x = {
                    wishlist: localWishlist.map((i) => ({ product_id: i.id }))
                }
              await addToWishlist(x);
            } else if (type === "remove" && id) {
              await removeFromWishlist(id);
            }

            const response = await fetchUserWishlist();
            if (response.data?.length) {
              set({ items: response.data });
            }
          } catch (error) {
            console.error("Wishlist sync failed", error);
          }
        },

        clear: () => set({ items: [] }),
      }),
      {
        name: "wishlist-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
