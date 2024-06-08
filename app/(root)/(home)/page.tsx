import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { getQuestions } from '@/lib/actions/question.action';
import { SearchParamsProps } from '@/types';
import Link from "next/link";


export default async function Home({ searchParams}: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
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
      <div className="mt-10 flex w-full flex-col gap-6">
        { result.questions.length > 0 ?
        result.questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            anwsers={question.anwsers}
            createdAt={question.createdAt}
          />
        ))
        : <NoResult
            title='There is no question to show'
            description='Be the first to breake the silence! Ask a question.'
            link='/ask-question'
            linkTitle='Ask question'
           />
        }
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  )
}
