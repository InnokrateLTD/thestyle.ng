"use client"
import { useProducts } from "@/api-services/product";
import ProductList from "@/app-components/product-list";
const SelectedVendor = () => {
    const { result: products} = useProducts({
    is_featured_product: true,
    is_new_arrival: true,
    is_special_offer: true
  })
    return(
        <main className="w-full">
            <section className="w-[98%] mx-auto space-y-1">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="font-bold text-xl leading-6 t">Vendor Name</h1>
                <p className="max-w-4xl text-center">Arc’teryx, is synonymous with the highest quality technical apparel, their name and distinguished bird logo are derived from the Archaeopteryx, which is posited to be the earliest known bird; now it defines supremely well-made gear for being outside in all conditions.</p>
                <p>Lagos, Nigeria.</p>
                </div>
                 <ProductList title="Vendor's Name"/>
            </section>
        </main>
    )
}
export default SelectedVendor