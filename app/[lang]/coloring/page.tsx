import { ColoringContainer } from "@/components/Coloring/ColoringContainer";

export const metadata = {
  title: "معرض التلوين | Arssan",
};

export default function ColoringPage() {
  return (
    <div className="w-full min-h-[100svh] bg-[#f8f8f8] flex items-center justify-center pt-28 pb-16 px-4">
      {/* Mobile Frame Simulator - Since the design is exactly 393x852 */}
      <div className="w-[393px] h-[852px] overflow-hidden rounded-[40px] shadow-2xl relative bg-white ring-8 ring-black/5">
        <ColoringContainer />
      </div>
    </div>
  );
}
