'use client';

import { createContext, useState } from "react";

export const searchContext = createContext(null);

export default function SearchProvider( {children} ) {

    const [searchResults, setSearchResults] = useState([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState('');

    return (
        <searchContext.Provider value={{ searchResults, setSearchResults, searchErrorMessage, setSearchErrorMessage }}>
            {children}
        </searchContext.Provider>
    )
} 

// koden i denne fil er skrevet med inspiration fra undervisningen på RTS