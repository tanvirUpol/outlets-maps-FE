import { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };


    return (

      <>
         <div className=" relative z-10">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <input
                    id="search"
                    type="text"
                    placeholder="Search by Code"
                    className="w-full rounded border p-2 text-base shadow-sm"
                    value={searchText}
                    onChange={handleSearchChange}
              
                />
            </div>
      </>

         

    );
};

export default Search;
