"use client";
import Image from "next/image";
import { Button } from "@/app-components/ui/button";
import { formatAmount } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app-components/ui/select";
import { useCartStore } from "@/app-stores/cart";
import { useModalStore } from "@/app-stores/modal";

const Cart = () => {
  const router = useRouter()
  const { closeModal } = useModalStore()
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
    setSize,
    syncWithBackend
  } = useCartStore();
  const items = useCartStore((state) => state.items);
  const size = useCartStore((state) => state.size)

  const removeProductFromCart = (id: string | number) =>{
    removeFromCart(id)
    syncWithBackend()
  }
  return (
    <div className="w-full">
      <div className="space-y-4 flex flex-col">
        <div>
          <h2 className="text-sm font-bold mb-1 uppercase">Your Bag</h2>
        </div>

        <div>{items.length === 0 && <p>No items in cart</p>}</div>
        <div className="space-y-30">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product_id} className="flex gap-3">
                <Image
                  src={item?.main_image}
                  alt="product-image"
                  className="object-fit w-1/3"
                  width={219}
                  height={100}
                ></Image>

                <div className="space-y-1 w-2/3">
                  <h1 className="text-sm font-semibold">{item.name}</h1>
                  <div>
                    <span className="font-semibold text-xs text-gray-700">
                      Size:
                    </span>
                    <Select onValueChange={setSize} value={size}>
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue placeholder="Please select a size" />
                      </SelectTrigger>
                      <SelectContent>
                        {item?.available_sizes && item?.available_sizes?.map((size, index) => (
                          <SelectItem key={index + 1} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-gray-700">
                      Qty:
                    </span>
                    <div className="flex items-center gap-4 mt-2">
                      <Button onClick={() => increaseQuantity(item.product_id)}>
                        +
                      </Button>
                      <p>{item.quantity}</p>
                      <Button onClick={() => decreaseQuantity(item.product_id)}>
                        -
                      </Button>
                    </div>
                  </div>
                  <div className="text-gray-900 font-medium text-sm mt-3">
                    ₦{formatAmount(item.discounted_price)} x {item.quantity}
                  </div>
                  <div onClick={() => removeProductFromCart(item.product_id)} className="text-gray-500 font-normal text-sm underline text-end cursor-pointer">
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>

        {items.length > 0 &&  <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <p className="text-gray-900 font-semibold">Items</p>
                <p className="text-gray-900 font-semibold">{totalItems}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-900 font-semibold">Subtotal</p>
                <p className="text-gray-900 font-semibold">₦{formatAmount(totalPrice)}</p>
              </div>
            </div>
            <Button onClick={() => {
              router.push('/products/checkout')
              closeModal()
              }} className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
              Checkout
            </Button>
          </div>} 
        </div>
      </div>
    </div>
  );
};

export default Cart;
