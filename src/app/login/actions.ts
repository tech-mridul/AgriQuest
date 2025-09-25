
'use server';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for server-side actions
function getFirebaseApp() {
    if (getApps().length > 0) {
        return getApp();
    }
    
    // Validate the config object to make sure it's not missing any values.
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error('Missing Firebase config values. Please check your .env file.');
    }
    
    return initializeApp(firebaseConfig);
}

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
    const app = getFirebaseApp();
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

   try {
    z.string().min(2, { message: 'Name is required.' }).parse(name);
    emailSchema.parse(email);
    passwordSchema.parse(password);
  } catch (e: any) {
    return { error: e.errors[0].message, success: false };
  }

  try {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    
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

export async function logout() {
    // In a real app, you'd call Firebase's signOut method.
    // For this prototype, we'll just redirect.
    redirect('/login');
}
