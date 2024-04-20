import { getHotQuestions } from '@/lib/actions/question.action';
import { getTopPopolareTags } from '@/lib/actions/tag.actions';
import Image from "next/image";
import Link from 'next/link';
import RenderTag from './RenderTag';


const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const populateTags = await getTopPopolareTags();
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-left p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
    <div className="">
      <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
      <div className="flex flex-col w-full mt-7 gap-[30px]">
        {hotQuestions.map((question) => (
          <Link
            href={`/question/${question._id}`}
            key={question._id}
            className="flex items-center justify-between cursor-pointer gap-7"
          >
            <p className="body-medium text-dark500_light700">{question.title}</p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt='chevron right'
              width={20}
              height={20}
              className="inver-colors"
            ></Image>
          </Link>
        ))}
      </div>
    </div>
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
          <div className="flex flex-col gap-4 mt-7">
            {populateTags.map((tag): any => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.numberOfQuestions}
                showCount
              />
            ))}
          </div>
    </div>
    </section>
  )
}

export default RightSidebar
