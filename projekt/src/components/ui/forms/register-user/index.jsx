'use client';

import { useActionState, useEffect, useState } from 'react';
import '../_form.scss';
import '../_modal.scss';
import registerUSerFormAction from './register-user-form-action';
import styles from '../../../../app/page.module.scss';
import { usePathname } from 'next/navigation';

export default function RegisterUserForm({ error = false }) {
    
    const [modalState, setModalState] = useState('hideModal');
    const [formState, formAction, pending] = useActionState(registerUSerFormAction);
    const pathname = usePathname();

    useEffect(() => {

        if (!formState) return;

        //console.log(formState);

    }, [formState]);

    return (
        <>
            {error ?
                <button disabled className={`${styles.common_font} modal__button modal__button--dark small-font modal__button--disabled`}>...</button>
            :
                <button onClick={() => setModalState('showRegisterForm')} className={`${styles.common_font} modal__button modal__button--dark small-font`}>Register</button>
            }
            {modalState === 'showRegisterForm' && <div className="modal__overlay">
                <section className='modal__container'>
                    {pending ?
                        <p className='form__loading'>Loading...</p>
                        :
                        <>
                            <form action={formAction} noValidate className="modal__form">
                                <div>
                                    <label className="form__label">
                                        Email
                                        <input type="email" name='email' defaultValue={formState?.data?.email} className="form__input" />
                                    </label>
                                    {formState?.properties?.email?.errors.map((error, index) => <p key={index} className="form__error-message">{error}</p>)}
                                </div>
                                <div>
                                    <label className="form__label">
                                        Password
                                        <input type="password" name='passwordfirst' className="form__input" />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.errors}</p>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                                </div>
                                <div>
                                    <label className="form__label">
                                        Repeat password
                                        <input type="password" name='passwordsecond' className="form__input" />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.passwordsecond?.errors}</p>
                                    <p className="form__error-message">{formState?.properties?.passwordfirst?.properties?.passwordsecond?.errors}</p>
                                </div>
                                <div>
                                    <label className="form__label">
                                        First name
                                        <input type="text" name='firstname' defaultValue={formState?.data?.firstname} className="form__input" />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.firstname?.errors}</p>
                                </div>
                                <div>
                                    <label className="form__label">
                                        Last name
                                        <input type="text" name='lastname' defaultValue={formState?.data?.lastname} className="form__input" />
                                    </label>
                                    <p className="form__error-message">{formState?.properties?.lastname?.errors}</p>
                                </div>
                                <input type='text' name='pathname' hidden value={pathname} readOnly />
                                <p className='form__error-message'>{formState?.errors}</p>
                                <button type="submit" className='form__button'>Register</button>
                            </form>
                            <button className="modal__button modal__button--dark align-right" onClick={() => setModalState('hideModal')}>Cancel</button>
                        </>
                    }
                </section>
            </div>}
        </>
    )
}

// koden i denne fil er skrevet med inspiration fra min terminsprøve og undervisningen på RTS