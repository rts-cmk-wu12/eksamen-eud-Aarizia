'use client';

import { useActionState, useEffect } from 'react';
import '../_form.scss';
import newsletterFormAction from './newsletter-form-action';
import { FaCheck } from "react-icons/fa";
import styles from '../../../../app/page.module.scss';
import Link from 'next/link';

export default function NewsletterForm({ userData = null }) {

    const [formState, formAction, pending] = useActionState(newsletterFormAction);

    useEffect(() => {

        if (!formState) return;

        //console.log(formState);

    }, [formState]);

    return (
        <section className='form__container form__page-style'>
            {pending ?
                <p className='form__loading'>Loading...</p>    
            :
                <>
                    {!formState?.success && <form action={formAction} noValidate className="form">
                        <h1 className='form__heading'>Subscribe to our Newsletter</h1>
                        <div>
                            <label className="form__label">
                                Email
                                {userData ? 
                                    <input className="form__input" type="email" name="email" defaultValue={formState?.data?.email ? formState?.data?.email : userData?.email} />
                                :
                                    <input className="form__input" type="email" name="email" defaultValue={formState?.data?.email} />
                                }                            
                            </label>
                            <p className="form__error-message">{formState?.properties?.email?.errors}</p>
                        </div>
                        <p className="form__error-message">{formState?.errors}</p>
                        <button type="submit" className={`${styles.common_font} form__button`}>Submit</button>
                    </form>}
                    {formState?.success && <section className="form__success">
                            <FaCheck className="form__success-icon form__success-icon--big" />
                            <p className='form__success-text'>You have successfully subscribed to our newsletter</p>
                        <Link className="form__link" href={'/'}>Browse listings</Link>
                    </section>}
                </>
            }
        </section>
    )
}