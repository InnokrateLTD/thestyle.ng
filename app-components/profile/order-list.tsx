"use client";
import { Button } from "@/app-components/ui/button";
import { useGetOrder } from "@/api-services/profile";
import { useRouter } from "next/navigation";
import { OrderResponse, FlattenedOrderItem} from "@/interfaces-and-types/order";
import { Card } from "@/app-components/ui/card";
import { Badge } from "@/app-components/ui/badge"
import Image from "next/image";
const OrderList = () => {
  const { result: orders} = useGetOrder()
const result = useGetOrder()
  console.log(result, 'order')
  const router = useRouter()
  const flattenOrders = (orders: OrderResponse): FlattenedOrderItem[] => {
    if (!orders.results) return [];
  return orders?.results?.flatMap((order) =>
    order.items.map((item) => ({
      ...item, 
      orderId: order.id,
      status: order.status,
      created_at: order.created_at,
      total: order.total,
      currency_code: order.currency_code,
    }))
  );
}
    const merged = orders ? flattenOrders(orders) : [];
    console.log(merged, 'merged')
  return (
  <>
  {merged.length === 0 ? (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="font-bold text-lg text-gray-700">
        YOU HAVEN’T PLACED ANY ORDER YET
      </h1>
      <Button
        onClick={() => router.push("/")}
        type="button"
        variant="link"
        className="text-sm text-gray-500 underline mt-2"
      >
        Go Shopping
      </Button>
    </div>
  ) : (
    <div className="space-y-4">
      {merged.map((entry) => (
        <Card
          key={`${entry.orderId}-${entry.product_id}`}
          className="flex justify-between items-center p-4"
        >
          <div className="flex gap-4 items-center">
            {entry.main_image ? (
              <Image
                src={entry.main_image}
                alt={entry.main_image}
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
              <h3 className="font-medium text-gray-800">
                {entry.name}
              </h3>
              <p className="text-sm text-gray-500">Order {entry.orderId}</p>
              <div className="flex gap-2 items-center mt-1">
                <Badge className="bg-green-600">{entry.status}</Badge>
                <span className="text-sm text-gray-600">
                  On {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium">
                {entry.currency_code} {entry.total}
              </p>
            </div>
          </div>

          <Button variant="link" className="text-orange-500">
            See details
          </Button>
        </Card>
      ))}
    </div>
  )}
</>




  );
};
export default OrderList;
