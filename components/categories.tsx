"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { CgGym } from "react-icons/cg";
import { LuChefHat } from "react-icons/lu";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ReactNode> = {
  workoutInstructor: <CgGym className="text-white text-3xl" />,
  mealAssistant:  <LuChefHat className="text-white text-3xl"/>
}

interface CategoriesProps {
  data: Category[]
}

const toCamelCase = (str: string) => {
  return str
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

export const Categories = ({
  data
}: CategoriesProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="tex-black text-sm font-medium">Your AIs</h2>
      <div className="w-full overflow-x-auto flex gap-5">
        {data.map((item) => (
          <button
            onClick={() => onClick(item.id)}
            className={cn(`
            flex 
            items-center
            justify-center
            h-16
            min-h-[64px]
            min-w-[64px]
            w-16
            rounded-full
            bg-black
            hover:opacity-75
            transition
            `,
            {'bg-primary/25' : item.id === categoryId}
            )}
            key={item.id}
          >
            <div>
              {icons[toCamelCase(item.name)]}
            </div>
          </button>
        ))}
      </div>
      </section>
  )
}
