import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    PhoneAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [enable2FA, setEnable2FA] = useState(false);
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
    const [requires2FA, setRequires2FA] = useState(false);

    const initializeRecaptchaVerifier = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'normal', // Invisible Recaptcha
                    callback: (response) => {
                        console.log('Recaptcha solved, response:', response);
                    },
                    'expired-callback': () => {
                        console.error('Recaptcha expired. Please refresh and try again.');
                    },
                },
                auth
            );
        }
    };
    
    const formatPhoneNumber = (number) => {
        let formattedNumber = number.trim();

        if (!formattedNumber.startsWith('+')) {
            throw new Error('Phone number must start with a "+" followed by the country code.');
        }

        formattedNumber = formattedNumber.replace(/[^+\d]/g, '');

        return formattedNumber;
    };

    const handleSendVerificationCode = async () => {
        setError('');
        setAlertMessage('');

        try {
            initializeRecaptchaVerifier();

            const sanitizedPhoneNumber = formatPhoneNumber(phoneNumber);
            console.log('Sanitized Phone Number:', sanitizedPhoneNumber);

            const confirmationResult = await signInWithPhoneNumber(auth, sanitizedPhoneNumber, window.recaptchaVerifier);
            setVerificationId(confirmationResult.verificationId);
            setAlertMessage('Verification code sent to your phone!');
        } catch (err) {
            console.error('Error in handleSendVerificationCode:', err);
            setError('Failed to send verification code: ' + err.message);
        }
    };

    const handleVerifyCode = async () => {
        setError('');
        setAlertMessage('');

        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

            if (isSignUp) {
                await auth.currentUser.linkWithCredential(credential);
                setAlertMessage('Phone number verified successfully!');
                setTimeout(() => onClose(), 2000);
            } else if (requires2FA) {
                await auth.currentUser.reauthenticateWithCredential(credential);
                setAlertMessage('Login successful with 2FA!');
                setTimeout(() => onClose(), 2000);
            }
        } catch (err) {
            console.error('Error in handleVerifyCode:', err);
            setError('Invalid verification code. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAlertMessage('');

        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    phoneNumber: enable2FA ? phoneNumber : null,
                    enable2FA,
                    createdAt: new Date().toISOString(),
                });

                if (enable2FA) {
                    setAlertMessage('Account created successfully! Please verify your phone number.');
                    setIsVerifyingPhone(true);
                    await handleSendVerificationCode();
                } else {
                    setAlertMessage('Account created successfully!');
                    setTimeout(() => onClose(), 2000);
                }
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists() && userDoc.data().enable2FA) {
                    setRequires2FA(true);
                    setPhoneNumber(userDoc.data().phoneNumber);
                    setIsVerifyingPhone(true);
                    await handleSendVerificationCode();
                } else {
                    setAlertMessage('Login successful!');
                    setTimeout(() => onClose(), 2000);
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        setAlertMessage('');

        try {
            await sendPasswordResetEmail(auth, email);
            setAlertMessage('Password reset email sent! Please check your inbox.');
        } catch (err) {
            setError('Error sending password reset email. Please try again.');
        }
    };

    return (
        <div className="inset-0 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-60">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img alt="Your Company" src="yeat-logo.svg" className="mx-auto h-16 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {isResettingPassword
                        ? 'Reset Your Password'
                        : isSignUp
                            ? 'Create an account'
                            : 'Sign in to your account'}
                </h2>

                {alertMessage && (
                    <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800">{alertMessage}</div>
                )}
                {error && (
                    <div className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-800">{error}</div>
                )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-60">
                {isResettingPassword ? (
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                            >
                                Send Reset Email
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            <button
                                type="button"
                                onClick={() => setIsResettingPassword(false)}
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </form>
                ) : isVerifyingPhone ? (
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium leading-6 text-gray-900">
                                Verification Code
                            </label>
                            <input
                                id="verificationCode"
                                name="verificationCode"
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                className="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                            >
                                Verify Code
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
                            />
                        </div>
                        {isSignUp && (
                            <>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
                                        placeholder="+1234567890"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="enable2FA"
                                        name="enable2FA"
                                        type="checkbox"
                                        checked={enable2FA}
                                        onChange={(e) => setEnable2FA(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="enable2FA" className="ml-2 text-sm text-gray-900">
                                        Enable Two-Factor Authentication
                                    </label>
                                </div>
                                {enable2FA && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleSendVerificationCode}
                                            className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                                        >
                                            Send Verification Code
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                            >
                                {isSignUp ? 'Create Account' : 'Log In'}
                            </button>
                        </div>
                    </form>
                )}
                <div id="recaptcha-container"></div>
                {!isResettingPassword && !isVerifyingPhone && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        {isSignUp ? (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(false)}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsResettingPassword(true)}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot Password?
                                </button>
                                <br />
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(true)}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
