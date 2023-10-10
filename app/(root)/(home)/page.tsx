import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from "next/link";

const questions = [
  {
    key: '1',
    _id: '1',
    title: 'Cascading Deletes in SQL Alchemy',
    tags: [{ _id: '1', name: 'python' }, { _id: '2', name: 'SQL' }],
    author: {
      _id: '1',
      name: 'Jon Doe',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 1500000,
    views: 10000,
    anwsers: [
      {
        _id: '1',
        text: 'This is an answer to the first question.',
        author: {
          _id: '4',
          name: 'Alice',
        },
        createdAt: new Date(),
      },
      {
        _id: '2',
        text: 'Another answer for this question.',
        author: {
          _id: '5',
          name: 'Bob',
        },
        createdAt: new Date(),
      },
      {
        _id: '3',
        text: 'A third answer here.',
        author: {
          _id: '6',
          name: 'Charlie',
        },
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('2021-09-01T12:00:00.000Z'),
  },
  {
    key: '2',
    _id: '2',
    title: 'How to center a div',
    tags: [{ _id: '3', name: 'CSS' }, { _id: '4', name: 'HTML' }],
    author: {
      _id: '2',
      name: 'Günter Sure',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 1560000,
    views: 21200,
    anwsers: [
      {
        _id: '1',
        text: 'Here is an answer for the second question.',
        author: {
          _id: '7',
          name: 'David',
        },
        createdAt: new Date(),
      },
      {
        _id: '2',
        text: 'Another answer for the second question.',
        author: {
          _id: '8',
          name: 'Eve',
        },
        createdAt: new Date(),
      },
      {
        _id: '3',
        text: 'A third answer to the second question.',
        author: {
          _id: '9',
          name: 'Frank',
        },
        createdAt: new Date(),
      },
      {
        _id: '4',
        text: 'Yet another answer.',
        author: {
          _id: '10',
          name: 'Grace',
        },
        createdAt: new Date(),
      },
      {
        _id: '5',
        text: 'One more answer for this question.',
        author: {
          _id: '11',
          name: 'Hannah',
        },
        createdAt: new Date(),
      },
      {
        _id: '6',
        text: 'Last answer here.',
        author: {
          _id: '12',
          name: 'Isaac',
        },
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('1994-09-01T12:00:00.000Z'),
  },
  {
    key: '3',
    _id: '3',
    title: 'How does JQuery work',
    tags: [{ _id: '5', name: 'JQuery' }, { _id: '6', name: 'Javascript' }],
    author: {
      _id: '3',
      name: 'Ralf Mac Donald',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 34000,
    views: 112,
    anwsers: [
      {
        _id: '1',
        text: 'Answer to the third question.',
        author: {
          _id: '13',
          name: 'Jack',
        },
        createdAt: new Date(),
      },
      {
        _id: '2',
        text: 'Another answer to this question.',
        author: {
          _id: '14',
          name: 'Kelly',
        },
        createdAt: new Date(),
      },
      {
        _id: '3',
        text: 'Yet another answer for this question.',
        author: {
          _id: '15',
          name: 'Liam',
        },
        createdAt: new Date(),
      },
    ],
    createdAt: new Date('1999-09-01T12:00:00.000Z'),
  },
];


export default function Home() {
  return (
    <>
      <div className="flex flex-col-reverse justify-between w-full gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link
         href="/ask-question"
         className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3! text-light900">Ask a question</Button>
        </Link>
      </div>
      <div className="flex gap-5 mt-11 justify-btween max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1  "
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        { questions.length > 0 ?
        questions.map((question: any) => (
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
            title='There is no question to show'
            description='Be the first to breake the silence! Ask a question.'
            link='/ask-question'
            linkTitle='Ask question'
           />
        }
      </div>
    </>
  )
}
