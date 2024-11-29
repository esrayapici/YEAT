import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Ensure you have Firebase initialized correctly

export default function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
    const [alertMessage, setAlertMessage] = useState(''); // New state for alert messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAlertMessage(''); // Clear previous alerts

        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    createdAt: new Date().toISOString(),
                });

                setAlertMessage('Account created successfully!'); // Show success alert
                setTimeout(() => onClose(), 2000); // Delay closing the modal
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setAlertMessage('Login successful!'); // Show success alert
                setTimeout(() => onClose(), 2000); // Delay closing the modal
            }
        } catch (err) {
            setError(err.message); // Show error message
        }
    };

    return (
        <div className="inset-0 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-60">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="yeat-logo.svg" // Ensure this path is correct
                    className="mx-auto h-16 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {isSignUp ? 'Create an account' : 'Sign in to your account'}
                </h2>

                {/* Alert Messages */}
                {alertMessage && (
                    <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800">
                        {alertMessage}
                    </div>
                )}
                {error && (
                    <div className="mt-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                        {error}
                    </div>
                )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-60">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primaryOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>

                {/* Toggle Sign-In / Sign-Up */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    {isSignUp ? (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)} // Switch to Sign In mode
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)} // Switch to Sign Up mode
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
