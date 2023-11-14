'use server'

import Question from '@/database/question.modal';
import Tag from '@/database/tag.modal';
import User from '@/database/user.modal';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
    .populate({ path: 'tags', model: Tag})
    .populate({ path: 'author', model: User})
    .sort({ createdAt: -1 })
    return{ questions };
  } catch (error) {
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path  } = params;
    // Create a question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];

    // Create a tag or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') }},
        { $setOnInsert: { name: tag}, $push: { question: question._id }},
        { upsert: true, new: true },
      );
      tagDocuments.push(existingTag._id);

      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments }}
      });
      // Create an interaction record for the user`s ask question action
      // Increment authors reputationby +5 points fot creating a question
    }
    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: question.action.ts:52 ~ createQuestion ~ error:", error)

  }
}
