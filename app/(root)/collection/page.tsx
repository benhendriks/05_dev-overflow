import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = auth();
  if(!userId) return null;
  const result = await getSavedQuestions({
    clerkId: userId,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="flex gap-5 mt-11 justify-btween max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1  "
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
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
            title='There is no saved question to show'
            description='Be the first to breake the silence! Ask a question.'
            link='/ask-question'
            linkTitle='Ask question'
           />
        }
      </div>
    </>
  )
}
