import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async () => {
const { userId } = auth();

  if(!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })

  console.log("🚀 ~ file: page.tsx:12 ~ Page ~ mongoUser:", mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark-100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  )
}

export default Page
