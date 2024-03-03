'use server'

import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.modal';
import Question from '@/database/question.modal';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from './shared.types';


export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    // Add the answer to the questions answers array
    await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } });
    // TODO Add interaction
    revalidatePath(path);
   }catch (error){
    console.log("🚀 ~ file: answer.action.ts:25 ~ createAnswer ~ error:", error)
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate( 'author', '_id clerkId name picture' )
      .sort({ createdAt: -1})
    return { answers };
  } catch (error) {
    console.log("🚀 ~ file: answer.action.ts:37 ~ getAllAnswer ~ error:", error)
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;

    const answer = await Answer.findById({ answerId });
    if(!answer) {throw new Error('Answer id is required')};
    await answer.deleteOne({ _id: answerId });
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId } });
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ deleteAnswer ~ error:", error)
    throw error;
  }
}
