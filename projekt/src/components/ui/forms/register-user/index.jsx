'use client';

import { useActionState, useEffect } from 'react';
import '../_form.scss';
import registerUSerFormAction from './register-user-form-action';
import { FaCheck } from "react-icons/fa";
import Link from 'next/link';

export default function RegisterUserForm() {

    const [formState, formAction, pending] = useActionState(registerUSerFormAction);

    useEffect(() => {

        if (!formState) return;

        console.log(formState);

    }, [formState]);

    return pending ? (
        <p className='form__loading'>Loading...</p>
    ) : (
        <form action={formAction} className="register-user-form form" noValidate>
            <div>
                <label className="form__label">
                    Email
                    <input type="email" name='email' className="form__input" defaultValue={formState?.data?.email} />
                    {formState?.properties?.email?.errors.map((error, index) => <p key={index} className="form__error-message">{error}</p>)}
                </label>
            </div>
            <div>
                <label className="form__label">
                    Password
                    <input type="password" name='passwordfirst' className="form__input" defaultValue={formState?.data?.passwordfirst} />
                    <p className="form__error-message">{formState?.properties?.passwordfirst?.errors}</p>
                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    Repeat password
                    <input type="password" name='passwordsecond' className="form__input" defaultValue={formState?.data?.passwordsecond} />
                    <p className="form__error-message">{formState?.properties?.passwordsecond?.errors}</p>
                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    First name
                    <input type="text" name='firstname' className="form__input" defaultValue={formState?.data?.firstname} />
                    <p className="form__error-message">{formState?.properties?.firstname?.errors}</p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    Last name
                    <input type="text" name='lastname' className="form__input" defaultValue={formState?.data?.lastname} />
                    <p className="form__error-message">{formState?.properties?.lastname?.errors}</p>
                </label>
            </div>
            <p className='form__error-message'>{formState?.errors}</p>
            <button type="submit" className='form__button'>Register</button>
            {formState?.success && <div className='form__success-container'>
                <FaCheck className='form__success-icon' />
                <p>You are now registered</p>
                <Link href='/'>See all listings</Link>
            </div>}
        </form>
    )
}