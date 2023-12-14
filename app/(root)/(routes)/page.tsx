import { Categories } from "@/components/categories";
import { Companions } from "@/components/personas";
import { SearchInput } from "@/components/search-input";
import db from "@/lib/drizzle";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const RootPage = async ({
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

  const categories = await db.select().from();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  )
}

export default RootPage