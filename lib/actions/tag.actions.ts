'use server'

import Question from '@/database/question.modal';
import Tag, { ITag } from '@/database/tag.modal';
import User from '@/database/user.modal';
import { FilterQuery } from 'mongoose';
import { connectToDatabase } from '../mongoose';
import { GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from './shared.types';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    // Find interactions for the User and group by tagId

    return [{ _id: '1', name: 'tag1' }, { _id: '2', name: 'tag2' }, { _id: '3', name: 'tag3' }]
    if (!user) {
      throw new Error('User not found')
    }


  } catch (error) {
    console.log("🚀 ~ file: tag.actions.ts:25 ~ getTopInteractedTags ~ error:", error)
    throw error;
  }
}

export async function getAllTags(params: any) {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }]
    }
    const tags = await Tag.find(query);
    return { tags }
  } catch (error) {
    console.log("🚀 ~ file: tag.actions.ts:36 ~ getAllTags ~ error:", error)
    throw error;
  }
}


export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i'}}
        : {},
      options: {
        sort: { createdAt: -1 },

      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ]
    });

    if (!tag) {
      throw new Error('Tag not found')
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };

  } catch (error) {
    console.log("🚀 ~ file: tag.actions.ts:48 ~ getQuestionsByTagId ~ error:", error)
    throw error;
  }
}

export async function getTopPopolareTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      {$project: { name: 1, numberOfQuestions: { $size: '$questions' } }},
      {$sort: { numberOfQuestions: -1 }},
      {$limit: 5},
    ])

    return popularTags;

  }catch (error){
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
}
