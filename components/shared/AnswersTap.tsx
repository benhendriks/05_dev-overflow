import { getUsersAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from '../cards/AnswerCard';

interface Props extends SearchParamsProps{
  userId: string;
  clerkId?: string;
}

const AnswersTap = async ({ searchParams, userId, clerkId }: Props) => {

  const result = await getUsersAnswers({ userId, page: 1 })

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        >
        </AnswerCard>
      ))}
    </>
  )
}

export default AnswersTap
