import { AnswerFilters } from '@/constants/filters';
import { getAnswers } from '@/lib/actions/answer.action';
import { getTimeStamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Filter from './Filter';
import ParseHtml from './ParseHtml';

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}
const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: Props) => {
  console.log("🚀 ~ file: AllAnswers.tsx:18 ~ AllAnswers ~ totalAnswers:", totalAnswers)
  const result = await getAnswers({
    questionId
  })
  return (
    <div className='mt-11'>
      <div className="flex items-center justify-between">
        <h3 className='primary-text-gradient'>{result.answers.length} Answers</h3>
        <Filter
          filters={AnswerFilters}
        />
      </div>
      <div className="flex">
        {result.answers.map((answer) => (
          <article
            key={answer._id}
            className="light-border border-b py-10"
          >
          <div className="flex items-center justify-between">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:item-centersm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sw:item-center"
              >
              <Image
                src={answer.author.picture}
                width={18}
                height={18}
                alt="profile"
                className="rounded-full object-cover max-sm:mt-0.5"
              />
              <div className="flex flex-col sm:flex-row sm:item-center">
                <p className="body-semibold text-dark300_light700">{answer.author.name}</p>
                <p className="small-regular text-dark400_light500 mt-0.5 line-clamp-1 ml-0.5">
                  answered  {''} {getTimeStamp(answer.createdAt)}
                </p>
              </div>
              </Link>
              <div className="flex justify-end ">
{/*                 <Votes
                  type='Question'
                  itemId={JSON.stringify(result._id)}
                  userId={JSON.stringify(mongoUser?._id)}
                  upvotes={result.upvotes.length}
                  hasupVoted={result.upvotes.includes(mongoUser?._id)}
                  downVotes={result.downvotes.length}
                  hasdownVoted={result.downvotes.includes(mongoUser?._id)}
                  hasSaved={mongoUser?.saved.includes(result._id)}
                />  */}
              </div>
            </div>
          </div>
            <ParseHtml data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  )
}

export default AllAnswers
