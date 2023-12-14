import { Categories } from "@/components/categories";
import { Personas } from "@/components/personas";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { RootPageProps } from "../page";

<<<<<<<< HEAD:app/(root)/DBFetcher.tsx
export const DBFetcher = async ({
========
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

const RootPage = async ({
>>>>>>>> f74e16cce6f792f6c2d10598388e726e0675e4a7:app/(root)/(routes)/home/page.tsx
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
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Personas data={data} />
    </div>
  )
}

export default RootPage
