import Logo from "@/assets/logo.svg"
import Image from "next/image"
const AppLogo = () => {
    return (
        <div className="text-white">
            <Image src={Logo} alt="Logo"></Image>
        </div>
    )
}
export default AppLogo