export default function Example() {
    return (
        <div>
            <div className="relative mt-2 rounded-md shadow-sm w-auto h-16"> {/* Set width here */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <span className="text-primaryOrange sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                </div>
                <input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Where / what to eat..."
                    className="block w-full h-16 rounded-md border-0 py-2 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Currency
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
