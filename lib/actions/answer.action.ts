'use server'

import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.modal';
import Question from '@/database/question.modal';
import User from '@/database/user.modal';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from './shared.types';

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
    const questionObject = await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } });

    await Interaction.create({
      user: author,
      action: 'answer',
      question,
      answer: newAnswer._id,
      tagsList: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 }
    })

    revalidatePath(path);
   }catch (error){
    console.log("🚀 ~ file: answer.action.ts:25 ~ createAnswer ~ error:", error)
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy } = params;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 }
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 }
        break;
      case "recent":
        sortOptions = { createdAt: -1 }
        break;
      case "old":
        sortOptions = { createdAt: 1 }
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate( 'author', '_id clerkId name picture' )
      .sort(sortOptions)
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

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found');
    }
    // Increment authors reputation by +1/-1 upvoting/revoking an upvote to the answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    })

    // Icrement Authors reputation by +10/-10 for recieving an upvote or an downvote to the answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : 2 }
    })

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    })

    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: answer.action.ts:101 ~ upvoteAnswer ~ error:", error)
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found');
    }
    // Decrement authors reputation by +10 points for upvoting a answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2 }
    })

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10 }
    })
    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: answer.action.ts:133 ~ downvoteAnswer ~ error:", error)
    throw error;
  }
}
