'use client';

import { searchContext } from "@/components/providers/search-provider";
import { useContext } from "react";
import ListingCard from "../listing-card";
import './_items-list.scss';

function list(listing) {

    return <li key={listing.id}><ListingCard listing={listing} /></li>
}

export default function ItemsList({ allListingsData }) {

    const { searchResults, searchErrorMessage } = useContext(searchContext);
    const displayList = searchResults?.length ? searchResults : allListingsData;
    const heading = searchResults?.length ? 'Search results' : 'All listings';

    return (
        <>
            <p className="items-list__error-message">{searchErrorMessage}</p>
            <h1 className="items-list__heading">{heading}</h1>
            <ul className="items-list">
                {displayList.map(list)}
            </ul>
        </>
    )
}