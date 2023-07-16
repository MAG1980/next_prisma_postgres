import BreakfastMenu from "@/components/BreakfastMenu";
import Burgers from "@/components/Burgers";
import Combo from "@/components/Combo";
import HeaderHome from "@/components/HeaderHome";
import Salads from "@/components/Salads";
import {Good} from "@prisma/client";
import {prisma} from "@/lib/prisma";

const getGoods =async ():Promise<Good[]>=>{
    return prisma.good.findMany({
        include: {
            goodsImages: true
        }
    });
}

export default async function Home() {
    let goods = await getGoods()
  return (
    <>
      <HeaderHome />
      <BreakfastMenu goods={goods} />
      <Combo />
      <Burgers />
      <Salads />
    </>
  )
}

