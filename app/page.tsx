import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperies";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/database";
import Link from "next/link";

function HomePage() {

  return (
    <div className="text-2xl">
      <Hero/>
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
}

export default HomePage;