"use client";
import { useWishlistStore } from "@/app-stores/wishlist";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/app-stores/modal";

const Wishlist = () => {
  const router = useRouter();
  const { closeModal } = useModalStore()
  const { items, remove } = useWishlistStore();
  const addToCart = (id: string | number | undefined) => {
    router.push(`/products/${id}/details`)
    closeModal()
  }
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">Wishlists</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your Favorites in one place
          </p>
        </div>
        {items && items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id} className="flex justify-between p-4 mb-2">
              <div className="flex gap-4 items-center">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">★</span>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  )}

                  <div className="flex gap-2 items-center mt-1">
                    {item.oldPrice && (
                      <span className="line-through text-sm text-gray-400">
                        ₦{item.oldPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm font-bold text-black">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons on the right */}
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => remove(item.id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 text-lg font-medium">
              Your wishlist is empty
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Start adding items you love!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
