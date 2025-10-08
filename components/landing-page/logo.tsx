import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useStylengAuthStore } from "@/stores/auth";
const AppLogo = () => {
  const role = useStylengAuthStore((state) => state.stylengUser.role)
  return (
    <Link href={role === 'Seller' ? '/vendors-app' : '/'}>
      <div className="text-white">
        <Image src={Logo} alt="Logo"></Image>
      </div>
    </Link>
  );
};
export default AppLogo;
