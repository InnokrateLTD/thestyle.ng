"use client";
import { useStylengAuthStore } from "@/app-stores/auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app-components/ui/tabs";
import ProfileDetails from "@/app-components/profile/profile-details";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { stylengUser } = useStylengAuthStore();

  return (
    <main className="w-full">
      <section className="w-[85%] mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-bold text-xl leading-6 uppercase">
            Account Overview
          </h1>
          <p className="max-w-4xl text-center">{stylengUser.first_name}</p>
          <p className="text-sm font-medium leading-5 text-gray-500 bg-grey-light py-2 px-4 rounded-2xl">
            Point Balance: 850 Points
          </p>
        </div>

        {/* Tabs + Action Button */}
        <div className="flex-1 mt-10">
          <Tabs defaultValue="details" className="w-full space-y-8">
            <TabsList className="flex justify-between items-center gap-2 w-full">
              {/* Tabs on the left */}
              <div className="flex gap-2">
                {[
                  { value: "details", label: "My Details" },
                  { value: "orders", label: "Orders" },
                  { value: "address", label: "Addresses" },
                  { value: "payment", label: "Payments" },
                  { value: "password", label: "Reset Password" },
                  { value: "logout", label: "Log out" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "uppercase text-gray-500 border border-transparent px-3 py-2 text-sm font-medium transition-colors",
                      "data-[state=active]:text-black data-[state=active]:border-gray-300 data-[state=active]:border"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </div>

              {/* Delete Account button at far right */}
              <button
                type="button"
                className={cn(
                  "uppercase text-red-700 border-2 border-red-700 px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-red-700 hover:text-white"
                )}
                onClick={() => {
                  console.log("Delete Account clicked");
                }}
              >
                Delete Account
              </button>
            </TabsList>

            <TabsContent value="details" className="w-full">
              <div className="flex justify-between w-full">
                <h1 className="uppercase font-bold leading-6 w-1/2">
                  My details
                </h1>
                <div className="w-1/2 flex justify-end">
                  <ProfileDetails />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              Your orders will appear here.
            </TabsContent>
            <TabsContent value="address">
              Manage your addresses here.
            </TabsContent>
            <TabsContent value="payment">
              Your payment methods go here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="logout">You have been logged out.</TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Profile;
