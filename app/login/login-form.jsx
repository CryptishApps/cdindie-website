"use client"

import React, { useState } from 'react';
// import { cn, buttonVariants, Label, Button, Input, useToast, Alert, AlertTitle, AlertDescription } from 'komodos-ui'
import GoogleIcon from '@/assets/icons/google-icon.svg'
import TwitterIcon from '@/assets/icons/twitter.svg'
import Image from 'next/image';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, MailCheck, UserCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { authError } from '@/lib/errors';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { cn, debugLog } from '@/lib/utils';
import { usePreviousRoute } from '@/hooks/usePreviousRoute';
import { useSubmit } from '@/hooks/useSubmit';
import { useUsernameCheck } from '@/hooks/useUsernameCheck';
import Spinner from '@/components/loading/spinner';
import { LoadingText } from '@/components/loading/loading-text';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { lilita } from '@/lib/fonts';

const LoginForm = ({ queryError }) => {

    const supabase = createClientComponentClient();

    const { toast } = useToast();
    const lastPage = usePreviousRoute();
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regError, setRegError] = useState(queryError || '');

    const register = async() => {
        setRegError("");
        if (!username) {
            toast({
                variant: "destructive",
                title: "Enter a username"
            });
            return;
        }
        if (username.length < 4 || username.length > 18) {
            toast({
                variant: "destructive",
                title: "Username must be between 4 and 18 characters."
            });
            return;
        }
        if (username.endsWith(".eth")) {
            setRegError("You can verify your ENS domain ownership later. Please register a non-ENS domain first.")
            return;
        }
        if (/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(username)) {
            setRegError("Only numbers, letters and underscores allowed in your username.");
            return;
        }
        if (!email) {
            toast({
                variant: "destructive",
                title: "Enter an email address"
            });
            return;
        }
        if (!password || password.length < 8) {
            toast({
                variant: "destructive",
                title: "Your password must be at least 8 chars."
            });
            return;
        }
        setLoading(true);

        try {

            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${window?.location?.origin}/auth/callback`,
                    data: {
                        username: username,
                        loginProvider: 'email'
                    }
                }
            });  

            if (error) throw new Error(error.message);

            toast({
                variant: 'success',
                title: "Please verify your email."
            });

        } catch(e) {
            debugLog(e.message);
            const error = authError(e.message);
            toast({
                variant: "destructive",
                title: error
            });
        }
        setLoading(false)
    }

    const emailSignIn = async() => {
        if (!email || !email.includes("@")) {
            toast({
                variant: "destructive",
                title: "Enter an email address"
            });
            return;
        }
        if (!password) {
            toast({
                variant: "destructive",
                title: "Enter a password"
            });
            return;
        }
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            toast({
                variant: "destructive",
                title: error.message
            });
            setLoading(false);
            return;
        }

        router.refresh();
    }

    const providerSignIn = async(provider) => {

        setLoading(true)

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window?.location?.origin}/auth/callback`
            }
        });

        if (error) {
            debugLog(e.message);
            toast({
                variant: "destructive",
                title: 'Twitter login failed'
            });
            setLoading(false);
            return;
        }
        router.refresh();
    }

    const resetEmail = async() => {
        if (!email) {
            toast({
                variant: "destructive",
                title: "Please enter your email address."
            });
            return;
        }
        setLoading(true)

        const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window?.location?.origin}/auth/callback`
        });
        if (error) {
            toast({
                title: error.message,
                icon: <MailCheck className='w-5 h-5' />
            });
        } else {
            toast({
                title: "If your account exists, an email has been sent to the email entered.",
                icon: <MailCheck className='w-5 h-5' />
            });
        }
        setLoading(false)
    }

    const { checking, valid } = useUsernameCheck(username);

    useSubmit([isRegistering], () => {
        if (isRegistering) {
            register();
        } else {
            emailSignIn();
        }
    });

    return (
        <AnimatePresence>
            {!isRegistering && 
            <motion.div
                className="absolute right-4 top-4 md:right-8 md:top-8"
                key="btncreate"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    variant="default"
                    onClick={() => {
                        setIsRegistering(true);
                    }}
                >
                    Create Account
                    <ArrowRight className='ml-2 w-4 h-4'/>
                </Button>
            </motion.div>
            }
            {isRegistering && 
            <motion.div
                className="absolute right-4 top-4 md:right-8 md:top-8"
                key="btnlogin"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    onClick={() => {
                        setIsRegistering(false);
                    }}
                >
                    <ArrowLeft className='mr-2 w-4 h-4'/>
                    Back to Login
                </Button>
            </motion.div>
            }
            
            <motion.div 
                key="formcontainer" 
                className="mx-8 lg:py-8"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="mx-auto flex w-full flex-col justify-center p-6 space-y-6 max-w-[95%] lg:max-w-[400px] scale-110">
                    <div className="flex flex-col space-y-2 text-center">
                        <div className='flex justify-center w-full space-x-2'>
                            <h1 className={cn("text-2xl font-semibold tracking-tight", lilita.className)}>
                                {isRegistering ? 
                                    <>Register{` `}<small className='text-muted-foreground'>with</small></> 
                                    : <>Login{` `}<small className='text-muted-foreground'>to</small></>} 
                                    {` `}INDIE BEASTS
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Enter your email{isRegistering && ', username'} and password to continue
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <form>
                            <div className="grid gap-2">
                                {isRegistering && 
                                <motion.div 
                                    key="usernamecontainer"
                                    className="relative grid gap-1"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Label className="sr-only" htmlFor="email">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="e.g. Komodo13"
                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={loading}
                                        autoComplete="on" 
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <span 
                                        title={valid ? 'Available' : 'Unavailable Username'}
                                        className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-[20px]"
                                    >
                                        {checking ?
                                            <Spinner className="mr-0 w-3 h-3 !text-primary" />
                                        : valid ? (
                                            <CheckCircle2 className='text-neongreen' />
                                        ) : !valid && (username.length > 3) ? (
                                            <AlertCircle className='text-neonpink' />
                                        ) : (
                                            <UserCircle2 />
                                        )}
                                    </span>
                                </motion.div>
                                }
                                <div className="grid gap-1">
                                    <Label className="sr-only" htmlFor="email">
                                        Username
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="komodo@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={loading}
                                        autoComplete="email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label className="sr-only" htmlFor="email">
                                        Username
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoCapitalize="none"
                                        placeholder="Password"
                                        autoCorrect="off"
                                        disabled={loading}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="button" disabled={loading} onClick={isRegistering ? register : emailSignIn}>
                                    {loading && (
                                        <Spinner className="mr-2 h-4 w-4 !text-primary" />
                                    )}
                                    {isRegistering ? 'Register' : 'Login'}
                                </Button>
                                {!isRegistering && (
                                    <Button className="text-xs" variant="ghost" type="button" onClick={resetEmail}>Reset Password</Button>
                                )}
                            </div>
                        </form>
                        {regError && 
                        <Alert variant="destructive" className="my-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {regError}
                            </AlertDescription>
                        </Alert>
                        }
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" type="button" className="-mt-1" disabled={loading} onClick={() => providerSignIn("google")}>
                            {loading ? (
                                <LoadingText>
                                    Connecting
                                </LoadingText>
                            ) : (
                                <>
                                <Image src={GoogleIcon.src} alt="Google Login" width={48} height={48} className="text-white mr-2 h-5 w-5" />
                                {" "}
                                Google
                                </>
                            )}
                        </Button>
                        <Button variant="outline" type="button" className="-mt-1" disabled={loading} onClick={() => providerSignIn("twitter")}>
                            {loading ? (
                                <LoadingText>
                                    Connecting
                                </LoadingText>
                            ) : (
                                <>
                                <Image src={TwitterIcon.src} alt="Twitter Login" width={48} height={48} className="text-white mr-2 h-5 w-5" />
                                {" "}
                                Twitter
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginForm;