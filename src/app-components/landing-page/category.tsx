import Image from "next/image"
import Product1 from '@/assets/product-1.jpg';
import Product2 from '@/assets/product-2.jpg';
import Product3 from '@/assets/product-3.jpg';
import Product4 from '@/assets/product-4.jpg';
const Categories = () => {
    return (
        <div className="px-4 py-8">
  <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide">Popular Categories</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    
    {/* Men --> */}
    <div className="relative group">
      <Image src={Product1} alt="Men" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">Men</span>
    </div>

    {/* Women --> */}
    <div className="relative group">
      <Image src={Product2} alt="Women" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">Women</span>
    </div>

    {/* Kids --> */}
    <div className="relative group">
      <Image src={Product3} alt="Kids" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">Kids</span>
    </div>

    {/* Footwear --> */}
    <div className="relative group">
      <Image src={Product4} alt="Footwear" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">Footwear</span>
    </div>

    {/* Accessories --> */}
    <div className="relative group">
      <Image src={Product1} alt="Accessories" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium px-2 py-1">Accessories</span>
    </div>

    {/* Traditional Attire --> */}
    <div className="relative group">
      <Image src={Product2} alt="Traditional Attire" className="w-full h-full object-cover rounded-none"></Image>
      <span className="absolute bottom-2 left-2 text-sm font-medium  px-2 py-1">Traditional Attire</span>
    </div>

  </div>
</div>

    )
}
export default Categories