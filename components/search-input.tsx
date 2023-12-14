"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);


  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = { 
      name: debouncedValue, 
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  }, [debouncedValue, router, categoryId])

  return (
    <div className="w-full flex justify-center">
      <div className="relative">
        <div className="h-72 w-72 rounded-full bg-search flex flex-col gap-7 items-center">
          <SlMagnifier className="text-4xl mt-16"/>
          <div className="relative">
            <div className="w-full absolute flex gap-2 items-center justify-center left-0 top-0 translate-y-[25%] transform">
            <h4 className="text-[#9B9B9B] text-center text-xl font-normal">
              Search
            </h4>
            <h4 className="font-bold">
              opportunities
            </h4>
            </div>
            <Input
              onChange={onChange}
              value={value}
              className="pl-10 w-80 bg-transparent"
              />
          </div>
        </div>
      </div>
    </div>
  )
};
