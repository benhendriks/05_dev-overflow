'use server';

import Answer from '@/database/answer.model';
import Question from '@/database/question.modal';
import Tag from '@/database/tag.modal';
import User from '@/database/user.modal';
import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';

const SearchableTypes = ['question', 'user', 'answer', 'tag'];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: 'i' };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ]

    const typeLower = type?.toLowerCase();

    if(!typeLower || !SearchableTypes.includes(typeLower)) {
      // Search across everything
      for(const {model, searchField, type} of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2)

          results.push(
            ...queryResults.map((item) => ({
            title: type === 'answer'
            ? `Answers containing ${query}`
            : item[searchField],
            type,
            id: type === 'user' ? item.clerkid
            : type === 'answer'
              ? item.question
              : item._id
          }))
        );
          if(results.length >= 8) {
            break;
          }
      }
    } else {
      // Search only in the specified type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);
      if(!modelInfo) {
        throw new Error('Invalid type');
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8)

        results = queryResults.map((item) => ({
          title: type === 'answer'
          ? `Answers containing ${query}`
          : item[modelInfo.searchField],
          type,
          id: type === 'user' ? item.clerkid
          : type === 'answer'
            ? item.question
            : item._id
        }))
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("🚀 ~ getGlobalSearch ~ error:", error)
    throw error;
  }
}
