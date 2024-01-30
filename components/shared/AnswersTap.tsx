import { getUsersQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface Props extends SearchParamsProps{
  userId: string;
  clerkId?: string;
}

const AnswersTap = async ({ searchParams, userId, clerkId }: Props) => {

  const result = await getUsersQuestions({ userId, page: 1 })

  return (
    <div>AnswersTap</div>
  )
}

export default AnswersTap
