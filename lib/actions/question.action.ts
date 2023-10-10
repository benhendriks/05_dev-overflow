'use server'

import Question from '@/database/question.modal';
import Tag from '@/database/tag.modal';
import { connectToDatabase } from '../mongoose';

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
    const { title, content, tag, author, path } = params;
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
        { name: { $regex: new RegExp(`^${tag}$,`, 'i') }},
        { $setOnInsert: { name: tag}, $push: { question: question._id }},
        { upsert: true, new:true },
      );
      tagDocuments.push(existingTag._id);

      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments }}
      });
      // Create an interaction record for the user`s ask question action
      // Increment authors reputationby +5 points fot creating a question
    }

  } catch (error) {

  }
}
