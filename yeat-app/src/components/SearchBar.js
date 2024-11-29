import { useState } from "react";

export default function Example() {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Restaurant");

    // Function to handle the API call
    const handleAPICall = () => {
        console.log("Input Value:", inputValue);
        console.log("Selected Category:", selectedCategory);
        // Call your API here
        // Example:
        // fetch('API_URL', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ input: inputValue, category: selectedCategory })
        // });
    };

    // Handle key press in the input
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAPICall();
        }
    };

    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm w-auto h-16"> {/* Set width here */}
                <div
                    className="absolute inset-y-0 left-0 flex items-center pl-1 cursor-pointer"
                    onClick={handleAPICall} // Trigger API call on icon click
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
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Where / what to eat..."
                    className="block w-full h-16 rounded-md border-0 py-2 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Update state on input change
                    onKeyDown={handleKeyPress} // Trigger API call on "Enter"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Category
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)} // Update state on dropdown change
                    >
                        <option>Restaurant</option>
                        <option>Fast-Food</option>
                        <option>Cafe</option>
                        <option>Bar</option>
                        <option>Pub</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
