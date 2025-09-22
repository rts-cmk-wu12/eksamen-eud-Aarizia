'use client';

import { createContext, useState } from "react";

export const searchContext = createContext(null);

export default function SearchProvider( {children} ) {

    const [searchResults, setSearchResults] = useState([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState('');

    //console.log('search results: ', searchResults);
    //console.log('search error: ', searchErrorMessage)

    return (
        <searchContext.Provider value={{ searchResults, setSearchResults, searchErrorMessage, setSearchErrorMessage }}>
            {children}
        </searchContext.Provider>
    )
} 