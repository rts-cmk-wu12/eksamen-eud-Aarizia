'use client';

import { useActionState, useEffect } from "react";
import changeProfileForm from "./change-profile-form";
import '../_form.scss';
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

export default function ProfileForm({ userData }) {

    const [formState, formAction, pending] = useActionState(changeProfileForm);

    useEffect(() => {
    
        if (!formState) return;
    
        console.log(formState);
    
    }, [formState]);

    console.log(userData);

    return pending ? (
        <p className='form__loading'>Loading...</p>
    ) : (
        <form action={formAction} className="change-profile-form form" noValidate>
            <h1 className="form__heading">Change profile</h1>
            <div>
                <label className="form__label">
                    Email
                    <input type="email" name='email' className="form__input" defaultValue={formState?.data?.email ? formState?.data?.email : userData.email} />
                    {/* <input type="email" name='email' className="form__input" placeholder={userData.email} defaultValue={formState?.data?.email} /> */}
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
                    <input type="text" name='firstname' className="form__input" defaultValue={formState?.data?.firstname ? formState?.data?.firstname : userData.firstname} />
                    {/* <input type="text" name='firstname' className="form__input" placeholder={userData.firstname} defaultValue={formState?.data?.firstname} /> */}
                    <p className="form__error-message">{formState?.properties?.firstname?.errors}</p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    Last name
                    <input type="text" name='lastname' className="form__input" defaultValue={formState?.data?.lastname ? formState?.data?.lastname : userData.lastname} />
                    {/* <input type="text" name='lastname' className="form__input" placeholder={userData.lastname} defaultValue={formState?.data?.lastname} /> */}
                    <p className="form__error-message">{formState?.properties?.lastname?.errors}</p>
                </label>
            </div>
            <p className='form__error-message'>{formState?.errors}</p>
            <button type="submit" className='form__button'>Submit changes</button>
            {formState?.success && <div className='form__success-container'>
                <FaCheck className='form__success-icon' />
                <p>Your changes were submitted successfully</p>
                <Link href='/'>See all listings</Link>
            </div>}
        </form>
    )
}