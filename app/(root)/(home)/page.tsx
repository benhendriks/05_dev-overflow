import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col-reverse justify-between w-full gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link
         href="/ask-question"
         className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3! text-light900">Ask a question</Button>
        </Link>
      </div>
      <div className="flex gap-5 mt-11 justify-btween max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1  "
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="">All Questions</div>
    </>
  )
}
