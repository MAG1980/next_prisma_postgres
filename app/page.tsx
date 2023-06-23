import BreakfastMenu from "@/components/BreakfastMenu";
import Burgers from "@/components/Burgers";
import Combo from "@/components/Combo";
import HeaderHome from "@/components/HeaderHome";
import Salads from "@/components/Salads";


export default function Home() {
  return (
    <>
      <HeaderHome />
      <BreakfastMenu />
      <Combo />
      <Burgers />
      <Salads />
    </>
  )
}

