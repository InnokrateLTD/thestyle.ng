"use client";
import CardWrapper from "@/app-components/card-wrapper";
import { Badge } from "@/app-components/ui/badge";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { formatDateToYYYYMMDD } from "@/lib/utils";
const data = [
  { day: 2, sales: 40 },
  { day: 4, sales: 35 },
  { day: 6, sales: 50 },
  { day: 8, sales: 45 },
  { day: 10, sales: 60 },
  { day: 12, sales: 55 },
  { day: 14, sales: 65 },
  { day: 16, sales: 70 },
  { day: 18, sales: 60 },
  { day: 20, sales: 55 },
  { day: 22, sales: 50 },
  { day: 24, sales: 48 },
];

const products = [
  {
    id: "CAT2838",
    name: "Product Name",
    price: "₦25,000.00",
    sold: 50,
    image: "/footwear.jpg",
  },
  {
    id: "CAT2838",
    name: "Product Name",
    price: "₦25,000.00",
    sold: 50,
    image: "/footwear.jpg",
  },
  {
    id: "CAT2838",
    name: "Product Name",
    price: "₦25,000.00",
    sold: 50,
    image: "/footwear.jpg",
  },
  {
    id: "CAT2838",
    name: "Product Name",
    price: "₦25,000.00",
    sold: 50,
    image: "footwear.jpg",
  },
  {
    id: "CAT2838",
    name: "Product Name",
    price: "₦25,000.00",
    sold: 50,
    image: "footwear.jpg",
  },
];

const categories = [
  { name: "Category 1", value: 56635 },
  { name: "Category 2", value: 74779 },
  { name: "Category 3", value: 19027 },
  { name: "Category 4", value: 43887 },
  { name: "Category 5", value: 8142 },
];
import { useGetVendorOrder } from "@/api-services/order";
import { useGetBestSeller } from "@/api-services/product";
import { useStylengAuthStore } from "@/app-stores/auth";
const Dashboard = () => {
  const { resultIsLoading, result: orders} = useGetVendorOrder()
  const {resultIsLoading: loading, result: products} = useGetBestSeller()
  const username = useStylengAuthStore((state) => state.stylengUser.first_name)
  // console.log(product, product)
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold">Welcome back, {username ?? 'User'}</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-4/6">
          <div className="space-y-4 border border-gray-200 p-4">
            <div>
              <h2 className="text-sm font-semibold uppercase">
                Business Overview
              </h2>
              <p className="text-sm text-gray-500">Here is how your business is doing today</p>
            </div>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3">
              <CardWrapper title="Page Visits" unit={10} />
              <CardWrapper title="Product sold" unit={56} />
              <CardWrapper title="Total Sales" amount="25,000" />
              <CardWrapper title="Total Owed" amount="25,000" />
              <CardWrapper title="Total Settled" amount="25,000" />
              <CardWrapper title="Total Customers" unit={42} />
            </div>
          </div>
          <div className="space-y-4 border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase">
                  Sales Overview
                </h2>
                <p className="text-sm text-gray-500">Here is how your business is doing today</p>
              </div>
              <select className="border rounded px-2 py-1 text-sm">
                <option>This month</option>
                <option>Last month</option>
                <option>This year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4 border border-gray-200 p-4">
            <div>
              <h2 className="text-sm font-semibold uppercase">Recent Orders</h2>
              <p className="text-sm text-gray-500">Here is how your business is doing today</p>
            </div>
            <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 shadow">
              <thead className="text-xs text-gray-700 bg-grey-light">
                <tr className="border-b">
                  <th scope="col" className="px-4 py-6 uppercase">
                    Order Id
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    QTY
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Total Price
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Delivery
                  </th>
                  <th scope="col" className="px-4 py-6 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
             <tbody>
                             
                             {resultIsLoading ? (
                         <tr className="border-b">
                           <td
                             colSpan={8}
                             scope="row"
                             className="px-4 py-3 text-xs font-medium text-[#3E3E3E] whitespace-nowrap  text-center"
                           >
                             Loading...
                           </td>
                         </tr>
                       ) : orders && orders?.length > 0 ? (
                         orders?.slice(0, 5).map((order) => (
                             <tr key={order.id} className="border-b">
                               <td className="py-10 px-6 text-gray-900 text-sm gap-1">
                                 {order.id}
                               </td>
                               <td className="py-10 px-6 text-gray-500 text-sm">{order.items.length}</td>
                               <td className="py-10 px-6 text-gray-500 text-sm">
                                 ₦ {order.items.length}
                               </td>
                               <td className="py-10 px-6 text-gray-500 text-sm">
                                 {formatDateToYYYYMMDD(order.created_at)}
                               </td>
                               <td className="py-10 px-6 text-sm">
                                 <Badge
                                   variant="default"
                                   className="bg-green-200 text-green-700"
                                 >
                                   {order.status}
                                 </Badge>
                               </td>
                               <td className="py-10 px-6  text-sm">
                                 <Badge
                                   variant="default"
                                   className="bg-gray-100 text-gray-700"
                                 >
                                   {order.delivery_status_display}
                                 </Badge>
                               </td>
                             </tr>
                         ))
                       ) : (
                         <tr className=" text-center">
                           <td
                             colSpan={8}
                             scope="row"
                             className="px-4 w-full py-3  text-gray-400 text-sm "
                           >
                             <div className="flex flex-col items-center justify-center">
                               <p>No Records Found</p>
                             </div>
                           </td>
                         </tr>
                       )}
                           </tbody>
            </table>
          </div>
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-4">
          <div className="border p-4">
            <div>
              <h2 className="text-sm font-semibold uppercase">TOP 5 PRODUCTS</h2>
              <p className="text-sm text-gray-500">Here is how your business is doing today</p>
            </div>
            <div className="space-y-4 ">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={product.main_image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">ID: {product.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{product.price}</p>
                    <p className="text-xs text-gray-500">{product.total_stock} SOLD</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border p-4">
            <div>
              <h2 className="text-sm font-semibold uppercase">TOP SELLING CATEGORIES</h2>
              <p className="text-sm text-gray-500">Here is how your business is doing today</p>
            </div>
            <div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={categories}
                    margin={{ left: 20, right: 20 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={true}
                      axisLine={false}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
