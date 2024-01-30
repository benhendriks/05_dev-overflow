import { getUsersQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import QuestionCard from '../cards/QuestionCard';

interface Props extends SearchParamsProps{
  userId: string;
  clerkId?: string;
}

const QuestionsTap = async ({ searchParams, userId, clerkId }: Props) => {

  const result = await getUsersQuestions({ userId, page: 1 })

  return (
    <>
      {result.questions.map((question: any) => (
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
      ))}
    </>
  )
}

export default QuestionsTap
