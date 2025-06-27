import MainContainer from "@/components/MainContainer";
import { getSportsData } from "@/lib/getSportsData";

export default async function Home() {
  const sports = await getSportsData();

  return (
    <div className="items-center justify-items-center min-h-screen md:p-8 pb-20 gap-16">
      <MainContainer sports={sports}/>
    </div>
  );
}
