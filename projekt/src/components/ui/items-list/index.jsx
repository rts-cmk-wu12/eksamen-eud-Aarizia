'use client';

import { searchContext } from "@/components/providers/search-provider";
import { useContext, useState } from "react";
import ListingCard from "../listing-card";
import './_items-list.scss';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function ItemsList({ allListingsData }) {

    const { searchResults, searchErrorMessage } = useContext(searchContext);
    const displayList = searchResults?.length ? searchResults : allListingsData;
    const heading = searchResults?.length ? 'Search Results' : 'All Listings';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    function renderData() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedDisplayList = displayList.slice(startIndex, endIndex);
        return (
            <ul className="items-list">
                {paginatedDisplayList.map(listing => (
                    <li key={listing.id} className="items-list__item">
                        <ListingCard listing={listing} />
                    </li>
                ))}
            </ul>
        );
    }

    function goToNextPage() {
        setCurrentPage(prevPage => prevPage + 1);
    }

    function goToPreviousPage() {
        setCurrentPage(prevPage => prevPage -1);
    }

    function goToSpecificPage(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function renderPaginationControls() {
        const totalPages = Math.ceil(displayList.length / itemsPerPage);

        return (
            <nav className="items-list__pagination">
                <button className="items-list__pagination-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    <GoArrowLeft />
                    Previous
                </button>
                <ul className="items-list__pagination-list">
                {Array.from({ length: totalPages },
                    (_, i) => (
                        <li key={i}>
                            <button className={`items-list__pagination-list-button ${(i + 1) === currentPage ? 'button-active' : ''}`} onClick={() => goToSpecificPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))
                }
                </ul>
                <button className="items-list__pagination-button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                    <GoArrowRight />
                </button>
            </nav>
        )
    }

    return (
        <>
            <p className="items-list__error-message">{searchErrorMessage}</p>
            <h1 className="items-list__heading">{heading}</h1>
            {renderData()}
            {renderPaginationControls()}
        </>
    )
}

// pagineringskode er inspireret af eksemplet på https://www.geeksforgeeks.org/reactjs/how-to-implement-pagination-in-react-using-hooks/
// jeg har selv skrevet koden, som sætter aktiv sass class (.active) på det element, der svarer til den side, vi er på