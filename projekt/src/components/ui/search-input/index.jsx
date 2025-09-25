'use client';

import { searchContext } from "@/components/providers/search-provider";
import { useContext, useEffect, useRef, useState } from "react";
import './_search-input.scss';
import { FiSearch } from "react-icons/fi";
import styles from '../../../app/page.module.scss';

export default function SearchInput({ allListingsData = [] }) {

    const { setSearchResults, setSearchErrorMessage } = useContext(searchContext);
    const [inputValueEmpty, setInputValueEmpty] = useState(true);
    const iconRef = useRef();
    const [searchIcon, setSearchIcon] = useState(<FiSearch className="search__icon" />);
    

    useEffect(() => {

        if (iconRef) {
            switch(inputValueEmpty) {
                case true:
                    setSearchIcon(<FiSearch className="search__icon" />);
                    break;
                case false: 
                    setSearchIcon(<></>);
                    break;
            }
        }

    }, [inputValueEmpty]);

    function changeHandler(event) {

        setSearchErrorMessage('');
        setSearchResults([]);

        const {value} = event.target;

        if (!value) {
            setInputValueEmpty(true);
        }


        if (value !== '') {
            var filteredData = allListingsData.filter(
                listing => (listing.title?.toLowerCase().includes(value.toLowerCase())
/*                 || listing.description?.toLowerCase().includes(value.toLowerCase())
                || listing.user?.email?.toLowerCase().includes(value.toLowerCase())
                || listing.user?.firstname?.toLowerCase().includes(value.toLowerCase())
                || listing.user?.lastname?.toLowerCase().includes(value.toLowerCase()) */)
            );
            setInputValueEmpty(false);
        }

        if (!filteredData?.length) {
            setSearchErrorMessage('Your search had to results. Try again');
        }

        setSearchResults(filteredData);
    }

    return (
        <section className="search">
            <input type='search' onChange={changeHandler} placeholder="Search" className={`search__input ${styles.common_font}`} />
            <div ref={iconRef} className="search__icon-container">
                {searchIcon}
            </div>
        </section>
    ) 
}

// search input koden er inspireret fra gennemgang i undervisningen på RTS