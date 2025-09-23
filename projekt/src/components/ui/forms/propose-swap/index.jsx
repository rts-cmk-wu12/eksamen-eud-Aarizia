'use client';

import { useState } from 'react';
import './_propose-swap.scss';
import ListingCard from '../../listing-card';

export default function ProposeSwapComponent({ userId, accessToken, listingData, userData }) {

    const [showModal, setShowModal] = useState(false);
    const [offerItem, setOfferItem] = useState(null);

    function clickHandler() {
        setShowModal(true);
    }
    console.log(showModal)

    return (
        <>
            <button className='propose-swap__button' onClick={clickHandler}>Propose a swap</button>
            {showModal && <div className='propose-swap__overlay'>
                <section className='propose-swap__user-listings'>
                    {userData.listings.length ? <ul>
                        {userData.listings.map(listing => {
                            return (
                                <li key={listing.id}>
                                    <ListingCard listing={listing} />
                                </li>
                            )
                        })}
                    </ul> 
                    : 
                    <p>You have no items to swap</p>}

                </section>
                <form className='propose-swap__form'>
                    <p>Propose swap</p>
                    <input type="text" name="requestitem" hidden value={listingData.id} readOnly />
                    <input type="text" name='userid' hidden value={userId} readOnly />
                </form>
            </div>}
        </>
    )
}