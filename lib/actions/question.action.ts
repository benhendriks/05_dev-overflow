'use server'

import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.modal';
import Question from '@/database/question.modal';
import Tag from '@/database/tag.modal';
import User from '@/database/user.modal';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from './shared.types';

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
        { $setOnInsert: { name: tag}, $push: { questions: question._id }},
        { upsert: true, new: true },
      );
      tagDocuments.push(existingTag._id);

      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments }}
      });
    }

    // Create an interaction record for the user`s ask question action
    await Interaction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments,
    })
    // Increment authors reputationby +5 points fot creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: question.action.ts:54 ~ createQuestion ~ error:", error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name'})
      .populate({ path: 'author', model: User, select: '_id clerkId name picture'})
      return question;
  }catch (error){
    console.log("🚀 ~ file: question.action.ts:69 ~ getQuestionById ~ error:", error)
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if(hasupVoted){
      updateQuery = { $pull: { upvotes: userId }};
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId }};
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if(!question){
      throw new Error('Question not found');
    }
    // Increment authors reputation by +1/-1 upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    })

    // Icrement Authors reputation by +10/-10 for recieving an upvote or an downvote to the question
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    })

    revalidatePath(path);
  }catch (error){
    console.log("🚀 ~ file: question.action.ts:101 ~ upvoteQuestion ~ error:", error)
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true })

    if (!question) {
      throw new Error('Question not found');
    }
    // Decrement authors reputation by +10 points for upvoting a question
    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: question.action.ts:133 ~ downvoteQuestion ~ error:", error)
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams)  {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId});
    await Answer.deleteMany({ question: questionId});
    await Interaction.deleteMany({ interaction: questionId});
    await Tag.updateMany({ questions: questionId}, { $pull: { questions: questionId}});

    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ deleteQuestion ~ error:", error)
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams)  {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate('tags');

    if(!question) {
      throw new Error('Question not found');
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ editQuestion ~ error:", error)
    throw error;
  }
}

export async function getHotQuestions() {
  try {
    connectToDatabase();
    const hotQuestions = await Question.find({})
      .sort({ views: -1, uovotes: -1 }) // desending order
      .limit(5);

    return hotQuestions;
  }catch (error){
    console.log("🚀 ~ getHotQuestions ~ error:", error)
    throw error;
  }
}
