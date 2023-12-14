import { Categories } from "@/components/categories";
import { Personas } from "@/components/personas";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { RootPageProps } from "../../../page";
import { MenuBaR } from "@/components/menu-bar";
import { BotCards } from "@/components/bot-cards";

export const DBFetcher = async ({
  searchParams
}: RootPageProps) => {
  const data = await prismadb.persona.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true,
        }
      }
    },
  });
  
  const categories = await prismadb.category.findMany();
  
  return (
    <div className="h-full">
      <Categories data={categories} />
      <div className="h-24 w-full relative">
        <div className="absolute -left-20 top-3 bg-white h-36 w-36 rounded-full blur" />
      </div>
      <SearchInput />
      <div className="h-24 w-full relative">
        <div className="absolute -right-20 top-0 bg-white h-36 w-36 rounded-full blur" />
      </div>
      <MenuBaR />
      <BotCards />
      {/* <Personas data={data} /> */}
    </div>
  )
}

