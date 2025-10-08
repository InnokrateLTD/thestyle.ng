import { generateAlphabet } from "@/lib/utils";
const VendorsList = () => {
  const letters = generateAlphabet();
  return (
    <main className="w-full">
      <section className="w-[98%] mx-auto space-y-4">
        <div>
          <h1 className="font-bold text-sm leading-5 tracking-wide">Vendor</h1>
          <div className="flex justify-between">
            {letters.map((letter) => (
              <p key={letter} className="font-bold text-sm mt-4">
                {letter}
              </p>
            ))}
          </div>
        </div>
        <div className="space-y-2">
            <h1>A</h1>
            <div className="space-y-1">
                <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>

            </div>
            
        </div>
        <div className="space-y-2">
            <h1>B</h1>
            <div className="space-y-1">
                <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>
            <div className="flex justify-between">
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
                <p className="leading-5 tracking-wide">Vendor&apos;s Name</p>
            </div>

            </div>
            
        </div>
      </section>
    </main>
  );
};
export default VendorsList;
