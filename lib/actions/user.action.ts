'use server'

import Answer from '@/database/answer.model';
import Question from '@/database/question.modal';
import Tag from '@/database/tag.modal';
import User from '@/database/user.modal';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams, GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from './shared.types';

export async function getUserById(params: any){
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:19 ~ getUserById ~ error:", error)
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:30 ~ createUser ~ error:", error)
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:45 ~ updateUser ~ error:", error)
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user) {
      throw new Error('User not found')
    }

    // Delete user from your database
    // and questions, answers, comments, etc.

    // get user question ids
    const userQuestionIds = await Question.find({ author:user._id}).distinct('_id');

    // Delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete({ clerkId });

    return deletedUser;

  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:78 ~ deleteUser ~ error:", error)
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof User> = {};

    if(searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: {$regex: new RegExp(searchQuery, 'i') } },
      ]
    }

    let sortOptions = {  };
    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1 };
        break;
      case 'old_users':
        sortOptions = { joinedAt: 1 };
        break;
      case 'top_contributors':
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const users = await User.find(query)
      .sort( sortOptions );
    return { users };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:91 ~ getAllUsers ~ error:", error)
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById( userId );

    if(!user) {
      throw new Error('User not found')
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      // remove question from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery <typeof Question > = searchQuery ? { title: { $regex: new RegExp(searchQuery, 'i') } } : {};

    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: { createdAt: -1 },

      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ]
    });

    if(!user) {
      throw new Error('User not found')
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };

  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    if(!user) {
      throw new Error('User not found')
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:175 ~ getUserInfo ~ error:", error)
    throw error;
  }
}

export async function getUsersQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
}

export async function getUsersAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
}

/* export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

  }catch (error){
    console.log("🚀 ~ file: user.action.ts:88 ~ getAllUsers ~ error:", error);
    throw error;
  }
} */
