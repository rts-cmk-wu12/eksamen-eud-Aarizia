'use client';

import { useActionState, useEffect } from 'react';
import '../_form.scss';
import newsletterFormAction from './newsletter-form-action';
import { FaCheck } from "react-icons/fa";

export default function NewsletterForm({ userData = null }) {

    const [formState, formAction, pending] = useActionState(newsletterFormAction);

    useEffect(() => {

        if (!formState) return;

        console.log(formState);

    }, [formState]);

    return pending ? (
        <p className='form__loading'>Loading...</p>
    ) : (
        <form action={formAction} className="newsletter-form form" noValidate>
            <h1 className='form__heading'>Subscribe to our Newsletter</h1>
            <div>
                <label className="form__label">
                    Email
                    {userData && <input className="form__input" type="email" name="email" defaultValue={formState?.data?.email ? formState?.data?.email : userData.email} />}
                    {!userData && <input className="form__input" type="email" name="email" defaultValue={formState?.data?.email} />}
                </label>
                <p className="form__error-message">{formState?.properties?.email?.errors}</p>
            </div>
            <p className='form__error-message'>{formState?.errors}</p>
            <button type="submit" className="form__button">Subscribe</button>
            {formState?.success && <div className='form__success-container'>
                <FaCheck className='form__success-icon' />
                <p>You are now signed up</p>
            </div>}
        </form>
    )
}