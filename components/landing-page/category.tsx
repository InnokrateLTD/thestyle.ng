import Image from "next/image";
import Link from "next/link";
const Categories = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">
        Popular Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Men --> */}
        <Link href={'/products/men'} className="relative group" >
          <Image
            src="/men.jpg"
            alt="Men"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">
            Men
          </span>
        </Link>

        {/* Women --> */}
        <Link href={'/products/women'} className="relative group">
          <Image
            src="/women.jpg"
            width={1000}
            height={1000}
            alt="Women"
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">
            Women
          </span>
        </Link>

        {/* Kids --> */}
        <Link href={'/products/kids'} className="relative group">
          <Image
            src="/kids.jpg"
            alt="Kids"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">
            Kids
          </span>
        </Link>

        {/* Footwear --> */}
        <Link href={'/products/footwear'} className="relative group">
          <Image
            src="/footwear.jpg"
            alt="Footwear"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">
            Footwear
          </span>
        </Link>

        {/* Accessories --> */}
       <Link href={'/products/accessories'} className="relative group">
          <Image
            src="/accessories.jpg"
            alt="Accessories"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">
            Accessories
          </span>
        </Link>

        {/* Traditional Attire --> */}
        <Link href={'/products/clothing'} className="relative group">
          <Image
            src="/clothing.png"
            alt="Traditional Attire"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-none"
          ></Image>
          <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">
            Clothing
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Categories;
