'use server'

import Question from '@/database/question.modal';
import User from '@/database/user.modal';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, UpdateUserParams } from './shared.types';

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
    const {page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({})
    .sort({ createdAt: -1})
    return { users };
  } catch (error) {
    console.log("🚀 ~ file: user.action.ts:91 ~ getAllUsers ~ error:", error)
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
