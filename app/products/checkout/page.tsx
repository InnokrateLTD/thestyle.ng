// app/checkout/page.tsx
"use client";

import { useState, useEffect, useMemo} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/ui/loadingDots";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { formatAmount } from "@/lib/utils";
import { CreateOrderSchema, CreateOrderFormValues } from "@/lib/schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStylengAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/modal";
import { createOrder, initializePayment, addPromoCode, verifyPayment} from "@/api-services/order";
import toast from "react-hot-toast";
export default function CheckoutPage() {
  const router = useRouter();
  const { totalItems, totalPrice, clearCart } = useCartStore();
  const items = useCartStore((state) => state.items);
  const size = useCartStore((state) => state.size);
  const email = useStylengAuthStore((state) => state.stylengUser.email);
  // const [promoCode, setPromoCode] = useState('')
  const { setRef } = useStylengAuthStore();
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [loading, setLoading] = useState<"idle" | "loading">("idle");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [discount, setDiscount]= useState<number | string>(0)
  const [cashback /*,setCashback*/] = useState<number>(0);
  const { openModal } = useModalStore()
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(CreateOrderSchema),
    mode: "onChange",
    defaultValues: {
      save_address: false,
      delivery_method: "STANDARD",
      state: "",
    },
  });
  const deliveryFees: Record<string, number> = {
    STANDARD: 0,
    PREMIUM: 3000,
    PICKUP: 0,
  };
  const finalTotal = useMemo(() => {
    const fee = deliveryMethod ? deliveryFees[deliveryMethod] || 0 : 0;

    const discountValue = Number(discount) || 0;
    const cashbackValue = cashback || 0;

    return totalPrice + fee - discountValue - cashbackValue;
    // eslint-disable-next-line
  }, [totalPrice, deliveryMethod, discount, cashback]);
  const onSubmit = async (data: CreateOrderFormValues) => {
    setStatus("loading");
    const x = {
      address_details: {
        first_name: data.first_name,
        last_name: data.last_name,
        address_line: data.address_line,
        town_city: data.town_city,
        state: data.state,
        phone_number: data.phone_number,
      },
      save_address: data.save_address,
      delivery_type: data.delivery_method,
      delivery_fee: data.delivery_method === "PREMIUM" ? 3000 : 0,
      promo_code: data.promo_code,
      items: items,
    };
    try {
      const response = await createOrder(x);
      if (response.status === 200 || response.status === 201) {
        const data = {
          order_id: response.data.data.id,
          customer_email: email,
          redirect_url: process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URI
        }
        const res = await initializePayment(data)
        if (res.status === 200 || res.status === 201) {

        setRef(res.data.data.reference)
        window.location.href = `${res?.data?.data?.authorization_url}?reference=${res?.data?.data?.reference}`;
      }
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  const validatePromoCode = async () => {
      setLoading("loading")
      const code = getValues("promo_code");
      if (!code) return;
      const x = {
        code: code,
        items: items
      }
      try {
      const response = await addPromoCode(x)
      if (response.status === 200 || response.status === 201) {
        if (response.data.data.valid && response.data.data.message === 'Applicable'){
          setDiscount(response.data.data.discount)
          toast.success(`A discount of  ₦${response.data.data.discount} has been added to your order`)
        }
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading("idle");
    }
      
  }
  const verifyCustomerPayment = async (ref: string) => {
    if (!ref) return
      const res = await verifyPayment(ref)
      if (res && res?.data?.verified === true){
        toast.success('Payment Successful')
        clearCart()
        router.push('/')
      } else {
        toast.error(res?.data?.message)
      }
  }
  // useEffect(() => {
  //     const url = new URL(window.location.href);
  //     const reference = url.searchParams.get("reference");
  //     if (reference) {
  //       verifyCustomerPayment(reference)
  //     } 
  //   // eslint-disable-next-line
  // }, []);
  // useEffect(() => {
  //   const values = getValues()
  //   reset({
  //     first_name: values.first_name, 
  //     last_name: values.last_name, 
  //     phone_number: values.phone_number,
  //     delivery_method: values.delivery_method,
  //     address_line: values.address_line,
  //     save_address: values.save_address,
  //     state: values.state,
  //     town_city: values.town_city,
  //   })
  // }, [getValues, reset])

  useEffect(() => {
  const url = new URL(window.location.href);
  const reference = url.searchParams.get("reference");

  if (reference) {
    verifyCustomerPayment(reference).then(() => {
      const values = getValues();
      reset({
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        delivery_method: values.delivery_method,
        address_line: values.address_line,
        save_address: values.save_address,
        state: values.state,
        town_city: values.town_city,
      });
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    if (items.length === 0){
      router.push('/')
    }
    // eslint-disable-next-line
  }, [items])
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        type="button"
        className="text-sm text-gray-500 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-center text-lg font-semibold">
        CHECKOUT{" "}
        <span className="block text-sm font-normal">
          {totalItems} item(s) ₦{formatAmount(totalPrice)}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="rounded-none shadow-none border-none">
          <CardHeader>
            <CardTitle className="uppercase font-bold leading-6">
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm">{email}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    placeholder="Enter your first name"
                    className="h-11 rounded-none"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Enter your last name"
                    className="h-11 rounded-none"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  placeholder="Enter your address"
                  className="h-11 rounded-none"
                  {...register("address_line")}
                />
                {errors.address_line && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.address_line.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    placeholder="Enter your city"
                    className="h-11 rounded-none"
                    {...register("town_city")}
                  />
                  {errors.town_city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.town_city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Please select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lagos">Lagos</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="Enter your number"
                  className="h-11 rounded-none"
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              <Controller
                name="save_address"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p className="text-sm">
                      Save address and contact information for future orders
                    </p>
                  </div>
                )}
              />

              {/* Delivery Method */}
              <div className="mt-15 space-y-6">
                <Label className="uppercase font-bold">Delivery Method</Label>
                <Controller
                  name="delivery_method"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      onChange={() => setDeliveryMethod(field.value)}
                      className="space-y-3 mt-2"
                    >
                      {/* Standard */}
                      <div className="flex items-start space-x-2 border border-gray-100 p-4">
                        <RadioGroupItem value="STANDARD" id="standard" />
                        <div className="flex flex-col gap-2">
                          <Label
                            htmlFor="standard"
                            className="cursor-pointer text-gray-500 tracking-wide leading-6"
                          >
                            Standard Delivery – Some items are being sourced
                            from a store, allow 3–5 working days
                          </Label>
                          <span className="uppercase font-medium">Free</span>
                        </div>
                      </div>

                      {/* Premium */}
                      <div className="flex items-start space-x-2 border border-gray-100 p-4">
                        <RadioGroupItem value="PREMIUM" id="premium" />
                        <div className="flex flex-col gap-2">
                          <Label
                            htmlFor="premium"
                            className="cursor-pointer text-gray-500 tracking-wide leading-6"
                          >
                            Premium Delivery – allow 1–2 working days for orders
                            made before 2pm
                          </Label>
                          <span className="uppercase font-medium">
                            ₦3,000.00
                          </span>
                        </div>
                      </div>

                      {/* Pickup */}
                      <div className="flex items-start space-x-2 border border-gray-100 p-4">
                        <RadioGroupItem value="PICKUP" id="pickup" />
                        <div className="flex flex-col gap-2">
                          <Label
                            htmlFor="pickup"
                            className="cursor-pointer text-gray-500 tracking-wide leading-6"
                          >
                            Self Pickup – Pick up your order from the pickup
                            point every Thursday (FREE)
                          </Label>
                          <span className="uppercase font-medium">Free</span>
                        </div>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.delivery_method && (
                  <p className="text-red-500 text-sm">
                    {errors.delivery_method.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full text-gray text-white h-11 rounded-none uppercase"
              >
                {status === "loading" ? <LoadingDots /> : "Place order"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Section */}
        <Card className="p-6 border-none shadow-none rounded-none sticky top-0 h-screen flex flex-col justify-start">
          <CardHeader className="flex justify-between">
            <div className="uppercase font-bold leading-6">Your Bag</div>
            <Button
              onClick={() => openModal('cart')}
              type="button"
              variant={"link"}
              className="text-sm text-gray-500 underline"
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 h-screen overflow-scroll">
            {/* Product */}
            {items.map((item) => (
              <div key={item.product_id} className="flex gap-4 items-center">
                <div className="w-[100px] h-[100px] relative border rounded overflow-hidden">
                  <Image
                    src={item.main_image}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold tracking-wide leading-6">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">Size: {size}</p>
                  <p className="text-xs text-gray-500">QTY: {item.quantity}</p>
                  <p className="font-semibold">
                    ₦{formatAmount(item.discounted_price)} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* Cashback */}
            <div>
              <Label className="uppercase font-semibold leading-5 text-sm">
                Use Cash-Back
              </Label>
              <div className="flex mt-2 justify-between">
                <div className="flex gap-2">
                  <Switch />
                  <p className="text-sm">Available cash-back</p>
                </div>
                <span className="font-semibold leading-5 text-sm">₦0.00</span>
              </div>
            </div>
            {/* Promo */}
            <div>
              <Label className="uppercase font-semibold leading-5 text-sm">
                Promo Code
              </Label>
              <div className="flex mt-2">
                <Input
                  placeholder="Enter code"
                  {...register('promo_code')}
                  className="rounded-none h-11 w-[347px]"
                />
                <Button
                  onClick={validatePromoCode}
                  type="button"
                  variant="default"
                  className="ml-2 w-[159px] h-11 rounded-none uppercase"
                >
                 {loading === "loading" ? <LoadingDots /> : "apply"}
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="text-sm space-y-2  pt-4">
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  Item(s)
                </span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  {totalItems}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  Subtotal
                </span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  ₦{formatAmount(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  Cash-back Deduction
                </span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                 ₦{cashback ? formatAmount(Number(cashback)) : '0.00'} 
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  Coupon Discount
                </span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                 ₦{discount ? formatAmount(Number(discount)) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  Delivery
                </span>
                <span className="font-semibold leading-6 tracking-wide text-gray-600">
                  {deliveryMethod && deliveryMethod === "PREMIUM"
                    ? "₦3,000"
                    : "₦0.00"}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-5">
                <span className="font-bold leading-6 bg-grey-900 uppercase">
                  Total
                </span>
                <span className="font-bold leading-6 bg-grey-900">
                  ₦{formatAmount(finalTotal)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
