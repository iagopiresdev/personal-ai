import { DBFetcher } from "./(root)/(routes)/home/DBFetcher";

export interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

export default function RootPage({searchParams}: RootPageProps){
  return <DBFetcher searchParams={searchParams}></DBFetcher>
}