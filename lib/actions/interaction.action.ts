'use server'

import Interaction from '@/database/interaction.modal';
import Question from '@/database/question.modal';
import { connectToDatabase } from '../mongoose';
import { ViewQuestionParams } from './shared.types';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // Update view count of question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if(userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId,
        });
      if (existingInteraction) return console.log("🚀 ~ User has already viewed this question." )

      // Create new interaction
      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId,
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: interaction.action.ts:11 ~ viewQuestion ~ error:", error)
    throw error;
  }
}
