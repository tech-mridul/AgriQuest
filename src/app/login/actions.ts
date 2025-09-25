
'use server';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, firestore } from '@/lib/firebase';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long.' });

const auth = getAuth(app);

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);
  } catch (e: any) {
    return { error: e.errors[0].message, success: false };
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    return { error: error.message, success: false };
  }

  return redirect('/');
}

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

   try {
    z.string().min(2, { message: 'Name is required.' }).parse(name);
    emailSchema.parse(email);
    passwordSchema.parse(password);
  } catch (e: any) {
    return { error: e.errors[0].message, success: false };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user document in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: user.email,
      score: 0,
      sustainabilityScore: 0,
    });
    
    return { error: null, success: true };

  } catch (error: any) {
    return { error: error.message, success: false };
  }
}
