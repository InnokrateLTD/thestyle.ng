import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
const AppLogo = () => {
  return (
    <Link href="/">
      <div className="text-white">
        <Image src={Logo} alt="Logo"></Image>
      </div>
    </Link>
  );
};
export default AppLogo;
