import React, { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { auth } from './firebase'; // Ensure correct path
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Modal from './Modal'; // Adjust path if needed

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null); // To track the logged-in user
    const [alertMessage, setAlertMessage] = useState(''); // Alert state for messages

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update the user state
        });

        return () => unsubscribe(); // Cleanup on component unmount
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setAlertMessage('Successfully signed out!'); // Set success message
            setTimeout(() => setAlertMessage(''), 2000); // Clear the alert after 2 seconds
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Disclosure as="nav" className="bg-primaryOrange">
            {/* Alert Message */}
            {alertMessage && (
                <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-800 text-center">
                    {alertMessage}
                </div>
            )}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="/yeat-logo-2.svg" // Adjust path as needed
                                className="h-12 w-auto"
                            />
                        </div>
                    </div>

                    {/* Right Section: Profile Dropdown */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* User Dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src={user ? 'logged_profile.png' : 'blank_profile.png'}
                                        className="h-10 w-10 rounded-full"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {user ? (
                                        <>
                                            {/* Profile Menu Item */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } block w-full px-4 py-2 text-sm text-center`}
                                                    >
                                                        Profile
                                                    </button>
                                                )}
                                            </Menu.Item>

                                            {/* Favourites Menu */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } block w-full px-4 py-2 text-sm text-center`}
                                                    >
                                                        Favourites
                                                    </button>
                                                )}
                                            </Menu.Item>

                                            {/* History Menu */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } block w-full px-4 py-2 text-sm text-center`}
                                                    >
                                                        History
                                                    </button>
                                                )}
                                            </Menu.Item>

                                            {/* Sign Out */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleSignOut}
                                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } block w-full px-4 py-2 text-sm text-center`}
                                                    >
                                                        Sign Out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </>
                                    ) : (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                        } block w-full px-4 py-2 text-sm text-center`}
                                                >
                                                    Sign In
                                                </button>
                                            )}
                                        </Menu.Item>
                                    )}
                                </Menu.Items>
                            </Transition>

                        </Menu>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Disclosure>
    );
}
