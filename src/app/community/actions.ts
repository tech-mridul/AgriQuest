'use server';

import {firestore} from '@/lib/firebase';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';

export async function addPost(content: string, authorName: string, authorAvatar: string) {
  if (!content) {
    throw new Error('Content is required');
  }

  try {
    await addDoc(collection(firestore, 'community-posts'), {
      author: {
        name: authorName,
        avatar: authorAvatar,
      },
      content: content,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: 0,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Failed to add post');
  }
}
