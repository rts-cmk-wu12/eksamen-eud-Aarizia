'use client';

import '../_form.scss';
import '../_modal.scss';
import { useActionState, useEffect, useState } from "react";
import loginFormAction from "./login-form-action";
import styles from '../../../../app/page.module.scss';
import { usePathname } from "next/navigation";

export default function LoginForm({ biggerText = null, error = null }) {

    const [modalState, setModalState] = useState('hideModal');
    const [formState, formAction, pending] = useActionState(loginFormAction);
    const pathname = usePathname();

    useEffect(() => {

        if (!formState) return;

        //console.log(formState);

    }, [formState]);

    return (
        <>
            {error ?
                <button disabled  className={`${styles.common_font} ${biggerText ? 'modal__button--light' : 'small-font modal__button--dark'} modal__button modal__button--disabled`}>...</button>
            :
                <button onClick={() => setModalState('showLoginForm')} className={`${styles.common_font} ${biggerText ? 'modal__button--light' : 'small-font modal__button--dark'} modal__button`}>Sign in</button>
            }
            {modalState === 'showLoginForm' && <div className="modal__overlay">
                <section className="modal__container">
                    {pending ? 
                        <p className="form__loading">Loading...</p>
                    :
                        <>
                            <form action={formAction} noValidate className="modal__form">
                                <div>
                                    <label className="form__label">
                                        Email
                                        <input type="email" name='email' defaultValue={formState?.data?.email} className="form__input" />
                                        <p className="form__error-message">{formState?.properties?.email?.errors}</p>
                                    </label>
                                </div>
                                <div>
                                    <label className="form__label">
                                        Password
                                        <input type="password" name='password' className="form__input" />
                                        <p className="form__error-message">{formState?.properties?.password?.errors}</p>
                                    </label>
                                </div>
                                <input type="text" name='pathname' hidden value={pathname} readOnly />
                                <p  className="form__error-message">{formState?.errors}</p>
                                <button className="form__button" type="submit">Sign in</button>
                            </form>
                            <button className="modal__button modal__button--dark align-right" onClick={() => setModalState('hideModal')}>Cancel</button>
                        </>
                    }
                </section>
            </div>}
        </>
    ) 
}

// koden i denne fil er skrevet med inspiration fra undervisningen på RTS