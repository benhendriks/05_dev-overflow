'use server'

import Tag from '@/database/tag.modal';
import User from '@/database/user.modal';
import { connectToDatabase } from '../mongoose';
import { GetTopInteractedTagsParams } from './shared.types';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    // Find interactions for the User and group by tagId

    return [{ _id: '1', name: 'tag1' }, { _id: '2', name: 'tag2' }, { _id: '3', name: 'tag3' }]
    if(!user) {
      throw new Error('User not found')
    }


  }catch (error){
    console.log("🚀 ~ file: tag.actions.ts:25 ~ getTopInteractedTags ~ error:", error)
    throw error;
  }
}

export async function getAllTags(params: any) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return {tags}
  }catch (error){
    console.log("🚀 ~ file: tag.actions.ts:36 ~ getAllTags ~ error:", error)
    throw error;
  }
}
