'use client';

import { useActionState, useEffect, useState } from "react";
import '../_form.scss';
import '../_modal.scss';
import { FaCheck } from "react-icons/fa";
import updateProfileFormAction from "./update-profile-form";
import styles from '../../../../app/page.module.scss';

export default function UpdateProfileForm({ userData = null }) {

    const [modalState, setModalState] = useState('hideModal');
    const [formState, formAction, pending] = useActionState(updateProfileFormAction);

    useEffect(() => {
    
        if (!formState) return;
    
        console.log(formState);
        if (formState?.success) setModalState('updateProfileSuccess');
    
    }, [formState]);

    return (
        <>
            <button onClick={() => setModalState('showUpdateProfileForm')} className={`${styles.common_font} modal__button modal__button--dark small-font`}>Profile</button>
            {modalState === 'showUpdateProfileForm' && <div className="modal__overlay">
                <section className='modal__container'>
                    {pending ?
                        <p className='form__loading'>Loading...</p>
                    :
                        <>
                            <form action={formAction} noValidate className='form'>
                                <div>
                                    <label className='form__label'>
                                        Email
                                        <input type="email" name='email' defaultValue={formState?.data?.email ? formState?.data?.email : userData?.email} className='form__input' />
                                    </label>
                                    {formState?.properties?.email?.errors.map((error, index) => <p key={index} className="form__error-message">{error}</p>)}
                                </div>
                                <div>
                                    <label className='form__label'>
                                        Password
                                        <input type="password" name='passwordfirst' className='form__input' />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.errors}</p>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                                </div>
                                <div>
                                    <label className='form__label'>
                                        Repeat password
                                        <input type="password" name='passwordsecond' className='form__input' />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.passwordsecond?.errors}</p>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                                </div>
                                <div>
                                    <label className='form__label'>
                                        First name
                                        <input type="text" name='firstname' defaultValue={formState?.data?.firstname ? formState?.data?.firstname : userData?.firstname} className='form__input' />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.firstname?.errors}</p>
                                </div>
                                <div>
                                    <label className='form__label'>
                                        Last name
                                        <input type="text" name='lastname' defaultValue={formState?.data?.lastname ? formState?.data?.lastname : userData?.lastname} className='form__input' />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.lastname?.errors}</p>
                                </div>
                                <p className='form__error-message'>{formState?.errors}</p>
                                <button type='submit' className='form__button'>Update profile</button>
                            </form>
                            <button className="modal__button modal__button--dark align-right" onClick={() => setModalState('hideModal')}>Cancel</button>
                        </>
                    }
                </section>
            </div>}
            {modalState === 'updateProfileSuccess' && <div className='modal__overlay'>
                <section className="modal__container align-center">
                    <FaCheck className="form__success-icon form__success-icon--big" />
                    <p>Your profile was successfully updated</p>
                    <div className='form__success-list'>
                            <span>Name: </span>
                            <span>{formState?.data?.firstname} {formState?.data?.lastname}</span>
                            <span>Email: </span>
                            <span>{formState?.data?.email}</span>
                    </div>
                    <button className="modal__button modal__button--dark align-right margin-block-start" onClick={() => setModalState('hideModal')}>Continue</button>
                </section>
            </div>}
        </>
    )
}

// koden i denne fil er skrevet med inspiration fra undervisningen på RTS