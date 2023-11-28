'use client'
import { formatAndDivideNumber } from '@/lib/utils';
import Image from 'next/image';
interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downVotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = (
 { type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downVotes,
  hasdownVoted,
  hasSaved, }: Props) => {

    const handleSave = () => {

    }
    const handleVote = (action: string) => {

    }

  return (
    <div className='flex gap-5'>
      <div className="flex-center gap-2.5 ">
        <div className="flex-center gap-1.5">
          <Image
            src={hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
            alt='upvote'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('upVote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className='satle-medium text-dark400_light900'>
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={hasdownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
            alt='downvote'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('downVote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className='satle-medium text-dark400_light900'>
              {formatAndDivideNumber(downVotes)}
            </p>
          </div>
        </div>
      </div>
        <Image
          src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
          alt='star'
          width={18}
          height={18}
          className='cursor-pointer'
          onClick={() => handleSave()}
        />
    </div>
  )
}

export default Votes
