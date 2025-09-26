'use server';

import { getServerFirestore } from '@/lib/firebaseServer';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';

export async function addPost(content: string, authorName: string, authorAvatar: string) {
  if (!content) {
    throw new Error('Content is required');
  }

  try {
    const firestore = getServerFirestore();
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
