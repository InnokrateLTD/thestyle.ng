"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  HandbagIcon,
  HeartIcon,
} from "lucide-react";
import CategoryImage from "@/assets/category-image.jpg";
import { useRouter } from "next/navigation";
import { useCategory } from "@/api-services/product";
import { useModalStore } from "@/stores/modal";
const NavLinks = () => {
  const router = useRouter();
  const {openModal} = useModalStore()
  const { result: categories } = useCategory();
  return (
    <nav className="w-full bg-white h-[56px] sm:h-[80px]">
      <div className="text-sm font-bold w-[98%] h-full mx-auto text-black hidden sm:flex justify-between items-center">
        <ul className="flex gap-5">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span onClick={() => router.push("/products")}>SALES</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-205 h-177 rounded-none mt-4 ml-4 flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <DropdownMenuItem className="w-77 h-[642px] p-6 flex flex-col items-start justify-start gap-4 font-semibold text-sm bg-grey-light">
                  <div onClick={() => router.push("/products")}>CLOTHING</div>
                  <div onClick={() => router.push("/products")}>
                    ACCESSORIES
                  </div>
                  <div onClick={() => router.push("/products")}>FOOTWEAR</div>
                  <div onClick={() => router.push("/products")}>SALE</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-[448px] h-[642px] mx-auto p-6 flex items-center justify-center focus:bg-transparent">
                  <Image
                    src={CategoryImage}
                    alt="Category Image"
                    width={448}
                    height={642}
                    className="w-full h-full"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span>VENDORS</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-205 h-177 rounded-none mt-4 ml-4 flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <DropdownMenuItem className="w-77 h-[642px] p-6 flex flex-col items-start justify-start gap-4 font-semibold text-sm bg-grey-light rounded-none m-0">
                  <div>POPULAR VENDORS</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full h-[642px] p-6 flex items-start justify-between text-sm focus:bg-transparent">
                  <div className="flex flex-col items-start justify-start gap-4 font-medium">
                    <div>Vendor 1</div>
                    <div>Vendor 2</div>
                    <div>Vendor 3</div>
                    <div>Vendor 4</div>
                    <div>Vendor 5</div>
                    <div>Vendor 6</div>
                    <div>Vendor 7</div>
                    <div>Vendor 8</div>
                    <div>Vendor 9</div>
                    <div>Vendor 10</div>
                  </div>
                  <div>View All</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          {categories &&
            [...categories].reverse().map((cat) => (
              <li key={cat.id}>
                <DropdownMenu>
                  <div className="flex gap-1">
                    <span
                      onClick={() =>
                        router.push(`/products/${cat.name.toLowerCase()}`)
                      }
                      className="cursor-pointer"
                    >
                      {cat.name}
                    </span>
                    {(cat.name.toLowerCase() === "men" ||
                      cat.name.toLowerCase() === "women" ||
                      cat.name.toLowerCase() === "kids") && (
                      <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                        <ChevronDownIcon className="w-4 h-4 text-grey" />
                      </DropdownMenuTrigger>
                    )}
                  </div>

                  {["men", "women", "kids"].includes(
                    cat.name.toLowerCase()
                  ) && (
                    <DropdownMenuContent className="w-205 h-177 rounded-none mt-4 ml-4 flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <DropdownMenuItem className="w-77 h-[642px] p-6 flex flex-col items-start justify-start gap-4 font-semibold text-sm bg-grey-light">
                        {[
                          "clothing",
                          "accessories",
                          "footwear",
                          "jewellery",
                        ].map((sub) => (
                          <div
                            key={sub}
                            className="cursor-pointer hover:underline"
                            onClick={() =>
                              router.push(
                                `/products/${cat.name.toLowerCase()}/${sub.toLowerCase()}`
                              )
                            }
                          >
                            {sub.toUpperCase()}
                          </div>
                        ))}
                      </DropdownMenuItem>

                      <DropdownMenuItem className="w-[448px] h-[642px] mx-auto p-6 flex items-center justify-center focus:bg-transparent">
                        <Image
                          src={CategoryImage}
                          alt="Category Image"
                          width={448}
                          height={642}
                          className="w-full h-full"
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </li>
            ))}
        </ul>
        <Button className="bg-grey rounded-none w-40 h-12" onClick={() => openModal('signup-vendor')}>
          START SELLING
        </Button>
      </div>
      <div className="text-sm font-bold w-[90%] h-full mx-auto text-black flex sm:hidden justify-between items-center">
        <MenuIcon className="w-6 h-6" />
        <ul className="flex gap-4 text-black">
          <li className="border-[1.5px] border-black w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <SearchIcon className="w-5 h-5" />
          </li>
          <li className="border-[1.5px] border-black w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <HeartIcon className="w-5 h-5" />
          </li>
          <li className="border-[1.5px] border-black w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <HandbagIcon className="w-5 h-5" />
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavLinks;
