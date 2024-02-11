import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils';
import Link from "next/link";
import Metric from '../shared/Metric';
import RenderTag from '../shared/RenderTag';

interface QuestionProps {
  key: string;
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  anwsers: Array<object>;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCard = ({
  clerkId,
  key,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  anwsers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px] ">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>{title}</h3>
          </Link>
        </div>
        {/* if signed in add creat update delete function */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) =>(
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
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
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(anwsers?.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
