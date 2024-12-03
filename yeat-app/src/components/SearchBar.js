import { useState, useEffect } from "react";
import { db, auth } from "./firebase"; // Firebase imports
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import History from "./History"; // Import the LastSearches component

export default function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Restaurant");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleAPICall = async (searchInput = inputValue, category = selectedCategory) => {
        console.log("Searching:", { inputValue: searchInput, selectedCategory: category });

        // Save the search if the user is logged in
        if (user) {
            const search = {
                input: searchInput,
                category: category,
                timestamp: new Date().toISOString(),
            };

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    console.error("User document not found in database.");
                    return;
                }

                // Update searches array
                const existingSearches = userDoc.data().searches || [];
                const updatedSearches = [search, ...existingSearches].slice(0, 5); // Keep only the last 5

                await updateDoc(userDocRef, {
                    searches: updatedSearches,
                });

                console.log("Search saved:", search);
            } catch (error) {
                console.error("Error saving search:", error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAPICall();
        }
    };

    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm w-auto h-16">
                <div
                    className="absolute inset-y-0 left-0 flex items-center pl-1 cursor-pointer"
                    onClick={handleAPICall}
                >
                    <span className="text-primaryOrange sm:text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </span>
                </div>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Where / what to eat..."
                    className="block w-full h-16 rounded-md border-0 py-2 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="category" className="sr-only">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option>Restaurant</option>
                        <option>Fast-Food</option>
                        <option>Cafe</option>
                        <option>Bar</option>
                        <option>Pub</option>
                    </select>
                </div>
            </div>

            {/* Render the LastSearches component */}

        </div>
    );
}
