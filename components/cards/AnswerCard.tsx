import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils';
import Link from "next/link";
import Metric from '../shared/Metric';

interface Props {
  key: string;
  clerkId?: string;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  key,
  question,
  _id,
  author,
  upvotes,
  createdAt,
}: Props) => {
  return (
    <Link
      href={`/question/${question?._id}/#${_id}`}
    >
      <div className="flex flex-col-reserve items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
            {question?.title}
          </h3>
        </div>
      </div>
      <div className="flex flex-col-reserve items-start justify-between gap-5 sm:flex-row">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` .asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatAndDivideNumber(upvotes.length)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </Link>
  )
};

export default AnswerCard;
