import { Button } from "@/app-components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app-components/ui/dropdown-menu";
import { ChevronDownIcon, MenuIcon, SearchIcon, HandbagIcon, HeartIcon } from "lucide-react";
const NavLinks = () => {
  return (
    <nav className="w-full bg-white h-[56px] sm:h-[80px]">
      <div className="text-sm font-bold w-[98%] h-full mx-auto text-black hidden sm:flex justify-between items-center">
        <ul className="flex gap-5">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span>SALES</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  <Button className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span>VENDORS</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  <Button className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span>MEN</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  <Button className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center gap-1">
                <span>WOMEN</span>
                <ChevronDownIcon className="w-4 h-4 text-grey" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  <Button className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>ACCESSORIES</li>
          <li>FOOTWEAR</li>
          <li>JEWELLERY</li>
        </ul>
        <Button className="bg-grey rounded-none w-40 h-12">
          START SELLING
        </Button>
      </div>
      <div className="text-sm font-bold w-[90%] h-full mx-auto text-black flex sm:hidden justify-between items-center">
        <MenuIcon className="w-6 h-6"/>
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
