
'use server';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getServerApp } from '@/lib/firebaseServer';
import { getServerFirestore } from '@/lib/firebaseServer';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long.' });


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
    const app = getServerApp();
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred. Please try again.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    if ((error as any).code === 'auth/invalid-credential' || (error as any).code === 'auth/user-not-found' || (error as any).code === 'auth/wrong-password') {
        errorMessage = "Invalid login credentials. Please check your email and password.";
    }
    return { error: errorMessage, success: false };
  }

  return redirect('/');
}

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

   try {
    z.string().min(2, { message: 'Name is required.' }).parse(name);
    emailSchema.parse(email);
    passwordSchema.parse(password);
    if (password !== confirmPassword) {
      return { error: 'Passwords do not match.', success: false };
    }
  } catch (e: any) {
    return { error: e.errors[0].message, success: false };
  }

  try {
    const app = getServerApp();
    const auth = getAuth(app);
    const firestore = getServerFirestore();
    
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
     let errorMessage = "An unexpected error occurred. Please try again.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    if ((error as any).code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use. Please log in or use a different email.';
    }
    return { error: errorMessage, success: false };
  }
}
