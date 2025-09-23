import Search from "@/app-components/search";
import { Button } from "@/app-components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/app-components/ui/badge";
const Order = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="">
        <h2 className="text-lg font-bold uppercase">Orders</h2>
        <p className="text-sm">
          Track, manage and forecast your customers and orders.
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Search placeholder="Search" />
          
        </div>
        <div className="flex gap-4">
            <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="outline"
          >
            <Plus /> Filter
          </Button>
          <Button
            className="rounded-none border border-gray-500 uppercase h-11"
            variant="default"
          >
            <Plus /> Export CSV
          </Button>
        </div>
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
                <tr className="border-b">
                  <td className="py-10 px-6 text-gray-900 text-sm flex items-center gap-1">
                    ORD-1562792773536
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">01</td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    ₦ 25,000.00
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    22 Sep, 2025
                  </td>

                  <td className="py-10 px-6 text-sm">
                    <Badge
                      variant="default"
                      className="bg-green-200 text-green-700"
                    >
                      Approved
                    </Badge>
                  </td>
                  <td className="py-10 px-6  text-sm">
                    <Badge
                      variant="default"
                      className="bg-gray-100 text-gray-700"
                    >
                      Approved
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-10 px-6 text-gray-900 text-sm flex items-center gap-1">
                    ORD-1562792773536
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">01</td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    ₦ 25,000.00
                  </td>
                  <td className="py-10 px-6 text-gray-500 text-sm">
                    22 Sep, 2025
                  </td>

                  <td className="py-10 px-6 text-sm">
                    <Badge
                      variant="default"
                      className="bg-green-200 text-green-700"
                    >
                      Approved
                    </Badge>
                  </td>
                  <td className="py-10 px-6 text-sm">
                    <Badge
                      variant="default"
                      className="bg-gray-100 text-gray-700"
                    >
                      Approved
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
    </div>
  );
};
export default Order;
