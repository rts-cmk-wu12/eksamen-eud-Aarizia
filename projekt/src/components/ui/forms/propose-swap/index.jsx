'use client';

import { useActionState, useEffect, useReducer } from 'react';
import './_propose-swap.scss';
import '../_form.scss';
import proposeSwapServerAction from './propose-swap-form-action';
import { FaCheck } from "react-icons/fa";

function reducer(state, action) {
    switch(action.type) {
        case 'showModalSelectOfferItem':
            return {
                ...state,
                showModal: true,
                modalState: 'select offer item',
                offerItem: null
            }

        case 'showModalSwapForm':
            return {
                ...state,
                showModal: true,
                modalState: 'propose swap form',
                offerItem: action.offerItem
            }

        case 'proposeSwapSuccess':
            return {
                ...state,
                showModal: true,
                modalState: 'swap submit success',
                offerItem: action.offerItem
            }

        case 'hideModal':
            return {
                ...state,
                showModal: false,
                modalState: 'select offer item',
                offerItem: null
            }
    }
}

export default function ProposeSwapComponent({ listingData, userData }) {

    const [state, dispatch] = useReducer(reducer, {
        showModal: false,
        modalState: 'select offer item',
        offerItem: null
    });
    const [formState, formAction, pending] = useActionState(proposeSwapServerAction);   
    let listingBelongsToCurrentUser = false;
    let userHasNoListings = false;

    useEffect(() => {

        if (!formState) return;
        if (formState?.success && state.showModal) dispatch({ type: 'proposeSwapSuccess' });

    }, [formState]);

    userData.listings?.map(listing => {
        if (listing.id === listingData.id) listingBelongsToCurrentUser = true;
    });

    if (!userData.listings.length) userHasNoListings = true;

    return (
        <>
            {listingBelongsToCurrentUser && <>
                <button className='propose-swap__button propose-swap__button--light' disabled>Propose a swap</button>
                <p>This is your own item, so you can not propose a swap</p>
            </>}
            {userHasNoListings && <>
                <button className='propose-swap__button propose-swap__button--light' disabled>Propose a swap</button>
                <p>You currently have no listings to swap</p>
            </>}
            {!listingBelongsToCurrentUser && !userHasNoListings && <button className='propose-swap__button propose-swap__button--light' onClick={() => dispatch({ type: 'showModalSelectOfferItem'})}>Propose a swap</button>}
            {state.showModal && state.modalState === 'select offer item' && <div className='propose-swap__overlay'>
                <section className='propose-swap__container'>
                        {userData.listings.length ? <>
                            <p>Select which of your items you want to swap for <span className='highlight'>{listingData.title}</span></p>
                            <ul className='propose-swap__user-listings'>
                                {userData.listings.map(listing => {
                                    return (
                                        <li key={listing.id}>
                                            <button onClick={() => dispatch({ type: 'showModalSwapForm', offerItem: listing })} className='propose-swap__button propose-swap__button--light'>
                                                {listing.title}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul> 
                            <button onClick={() => dispatch({ type: 'hideModal' })} className='propose-swap__button propose-swap__button--dark'>Cancel</button>
                        </> 
                        : 
                        <>
                            <p className='propose swap__container'>You have no items to swap</p>
                            <button onClick={() => dispatch({ type: 'hideModal' })} className='propose-swap__button propose-swap__button--dark'>Cancel</button>
                        </>}
                    </section>
            </div>}
            {state.showModal && state.modalState === 'propose swap form' && <div className='propose-swap__overlay'>
                {pending ? 
                    <p className='propose-swap__container'>Loading...</p> 
                :
                   <form action={formAction} className='propose-swap__form propose-swap__container'>
                        <p className='propose-swap__text'>Do you wish to request a swap of your item <span className='highlight'>{state.offerItem?.title}</span> for {listingData.user.firstname} {listingData.user.lastname}'s item <span className='highlight'>{listingData.title}</span>?</p>
                        <input type='text' name='offerItemId' hidden value={state.offerItem?.id} readOnly />
                        <input type="text" name="requestItemId" hidden value={listingData.id} readOnly />
                        <p className='form__error-message'>{formState?.errors}</p>
                        <div className='propose-swap__button-container'>
                            <button type='submit' className='propose-swap__button propose-swap__button--light'>Yes</button>
                            <button onClick={() => dispatch({ type: 'showModalSelectOfferItem' })} className='propose-swap__button propose-swap__button--light'>No, I want to select one of my other items to swap</button>
                        </div>
                        <button onClick={() => dispatch({ type: 'hideModal' })} className='propose-swap__button propose-swap__button--dark margin-top'>Cancel swap proposal and close pop-up window</button>
                    </form>
                }
            </div>}
            {state.showModal && state.modalState === 'swap submit success' && <div className='propose-swap__overlay'>
                <section className='propose-swap__container'>
                    <div className='form__success-container'>
                        <FaCheck className='form__success-icon' />
                        <p>Your swap request was successfully submitted</p>
                    </div>
                    <button onClick={() => dispatch({ type: 'hideModal'})} className='propose-swap__button propose-swap__button--dark margin-top'>Continue</button>
                </section>
            </div>}
        </>
    )
}

// koden i denne fil er skrevet med inspiration fra undervisningen på RTS