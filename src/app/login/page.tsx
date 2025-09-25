
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { login, signup } from './actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const initialState = {
  error: null,
  success: false,
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {text}
    </Button>
  );
}

export default function LoginPage() {
  const [loginState, loginAction] = useActionState(login, initialState);
  const [signupState, signupAction] = useActionState(signup, initialState);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // On successful sign-in, Firebase will handle the user's session.
      // We can redirect the user to the main page.
      window.location.href = '/';
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: 'An error occurred during Google Sign-In. Please try again.',
      });
    }
  };

  useEffect(() => {
    if (loginState?.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: loginState.error,
      });
    }
  }, [loginState, toast]);

  useEffect(() => {
    if (signupState?.error) {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: signupState.error,
      });
    }
    if (signupState?.success) {
        toast({
            title: 'Account Created!',
            description: "You've successfully signed up. Please log in.",
        })
    }
  }, [signupState, toast]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2 text-foreground">
                <Icons.logo className="size-10" />
                <span className="text-2xl font-bold">AgriQuest</span>
            </Link>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign In</TabsTrigger>
            <TabsTrigger value="password">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Enter your email and password to access your dashboard.</CardDescription>
              </CardHeader>
              <form action={loginAction}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john.smith@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton text="Sign In" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Join the sustainable farming revolution!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </CardContent>
              <form action={signupAction}>
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="name-signup">Name</Label>
                    <Input id="name-signup" name="name" placeholder="John Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" name="email" type="email" placeholder="john.smith@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" name="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                    <Input id="confirm-password-signup" name="confirmPassword" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <SubmitButton text="Create Account" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
