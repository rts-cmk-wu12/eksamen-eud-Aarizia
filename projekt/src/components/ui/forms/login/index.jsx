'use client';

import { FaCheck } from "react-icons/fa";
import '../_form.scss';
import '../_modal.scss';
import { useActionState, useEffect, useReducer } from "react";
import loginFormAction from "./login-form-action";
import styles from '../../../../app/page.module.scss';

function reducer(state, action) {
    switch(action.type) {
        case 'showLoginForm':
            return {
                ...state,
                showModal: true,
                modalState: 'login form'
            }
        
        case 'loginSuccess':
            return {
                ...state,
                showModal: true,
                modalState: 'login success'
            }
        
        case 'hideLoginModal':
            return {
                ...state,
                showModal: false,
                modalState: 'show login form'
            }
    }
}

export default function LoginForm() {

    const [state, dispatch] = useReducer(reducer, {
        showModal: false,
        modalState: 'login form'
    })
    const [formState, formAction, pending] = useActionState(loginFormAction);

    useEffect(() => {

        //if (!formState) return;

        console.log(formState);
        if (formState?.success && state.showModal) dispatch({ type: 'loginSuccess' });

    }, [formState]);

    return (
        <>
            <button className={`${styles.common_font} form__button`} onClick={() => dispatch({ type : 'showLoginForm' })}>Sign in</button>
            {state.showModal && state.modalState === 'login form' && <div className='modal__overlay'>
                {pending ? 
                    <p className='modal__container'>Loading...</p>
                :
                    <section className='modal__container'>
                        <form action={formAction} className='modal__form' noValidate>
                            <div>
                                <label className="form__label">
                                    Email
                                    <input type="email" name="email" className="form__input" defaultValue={formState?.data?.email} />
                                    <span className="form__error-message">{formState?.properties?.email?.errors}</span>
                                </label>
                            </div>
                            <div>
                                <label className="form__label">
                                    Password
                                    <input type="password" name="password" className="form__input" defaultValue={formState?.data?.password} />
                                    <span className="form__error-message">{formState?.properties?.password?.errors}</span>
                                </label>
                            </div>
                            <span className='form__error-message'>{formState?.errors}</span>
                            <button className="form__button" type='submit'>Sign In</button>
                        </form>
                        <button onClick={() => dispatch({ type: 'hideLoginModal' })} className='modal__button modal__button--light align-right'>Cancel</button>
                    </section>}
            </div>}
            {(state.showModal && state.modalState === 'login success') && <div className='modal__overlay'>
                <section className='modal__container'>
                    <div className='form__success-container'>
                        <FaCheck className='form__success-icon' />
                        <p>You have successfully logged in</p>
                    </div>
                    <button onClick={() => dispatch({ type: 'hideLoginModal'})} className='modal__button modal__button--dark margin-top'>Continue</button>
                </section>    
            </div>}
        </>
    ) 
}