'use client';

import { useActionState, useEffect } from 'react';
import '../_form.scss';
import loginFormAction from './login-form-action';

export default function LoginForm() {

    const [formState, formAction, pending] = useActionState(loginFormAction);

    useEffect(() => {

        if (!formState) return;

        console.log(formState);

    }, [formState]);

    return pending ? (
        <p className='form__loading'>Loading...</p>
    ) : (
        <form action={formAction} className="login-form form" noValidate>
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
            <button className="form__button">Sign In</button>
        </form>
    )
}