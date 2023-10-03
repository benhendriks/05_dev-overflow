"use client";

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import RenderTag from './RenderTag';

const hotQuestions = [
  {_id: 1, title: 'Hello Wonderful people, what programming language should I learn?'},
  {_id: 2, title: 'Hello Dude, how can I center a div?'},
  {_id: 3, title: 'Hello Sir, is there a way to learn programming in the age of 40?'},
  {_id: 4, title: 'What´s up, I need a function to hide a container?'},
  {_id: 5, title: 'Hey, how do I use felx box?'},
]

const populateTags = [
  {_id: 1, name: 'Javascript', totalQuestions: 125},
  {_id: 2, name: 'Python', totalQuestions: 235},
  {_id: 3, name: 'Java', totalQuestions: 345},
  {_id: 4, name: 'Rust', totalQuestions: 45},
  {_id: 5, name: 'Go', totalQuestions: 85},
  {_id: 6, name: 'Ruby', totalQuestions: 45},
  {_id: 7, name: 'PHP', totalQuestions: 95},
]

const RightSidebar = () => {
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
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </div>
    </div>
    </section>
  )
}

export default RightSidebar
