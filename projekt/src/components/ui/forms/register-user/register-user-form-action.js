'use server';

import { cookies } from "next/headers";
import z from "zod";

export default async function registerUSerFormAction(prevState, formData) {

    const email = formData.get('email');
    const passwordfirst = formData.get('passwordfirst');
    const passwordsecond = formData.get('passwordsecond');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');

    const schema = z.object({
        email: z.email().min(1, {message: 'Email field has to be filled'}).max(50, {message: 'Email is too long. Max 50 characters'}),
        passwordfirst: z.string().min(1, {message: 'Password field has to be filled'}).max(100, {message: 'Password is too long. Max 100 characters'}),
        passwordsecond: z.string().min(1, {message: 'Repeat password field has to be filled'}).max(100, {message: 'Repeat password is too long. Max 100 characters'}),
        firstname: z.string().min(1, {message: 'First name field has to be filled'}).max(50, {message: 'First name is too long. Max 50 characters'}),
        lastname: z.string().min(1, {message: 'Last name field has to be filled'}).max(100, {message: 'Last name is too long. Max 100 characters'})
    })
    .refine((values) => {
        return values.passwordfirst === values.passwordsecond;
    }, {
        message: 'Passwords have to be identical',
        path: ['passwordfirst', 'passwordsecond']
    });

    const validated = schema.safeParse({
        email, passwordfirst, passwordsecond, firstname, lastname
    });

    if (!validated.success) return {
        ...validated,
        ...z.treeifyError(validated.error),
        data: {
            email, firstname, lastname
        }
    }

    //return validated;

    // create new user
    const userResponse = await fetch('http://localhost:4000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: validated.data.email,
            password: validated.data.passwordfirst,
            firstname: validated.data.firstname,
            lastname: validated.data.lastname
        })
    })

    //console.log(response);
    if (!userResponse.ok) return {
        success: false,
        errors: ['There was an error on the server. You were not registered. Try again later'],
        data: {
            email,
            firstname,
            lastname
        }
    }

    const userData = await userResponse.json();
    //console.log(userData);

    // create access token:
    const API_URL = 'http://localhost:4000/auth/token';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: validated.data.email,
            password: validated.data.passwordfirst
        })
    }

    const tokenResponse = await fetch(API_URL, options);

    if (!tokenResponse.ok) return {
        success: false,
        errors: ['There was an error on the server. You were registered but not logged in. Try again later'],
        data: {
            email,
            firstname,
            lastname
        }
    }

    const tokenData = await tokenResponse.json();
    console.log(tokenData);

    // set cookies
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'swaphub_access_token',
        value: tokenData.token,
        maxAge: 60*60
    });

    cookieStore.set({
        name: 'swaphub_user_id',
        value: tokenData.userId,
        maxAge: 60*60
    });

    /* cookieStore.delete('swaphub_public'); */
    //console.log('hello')
    return {
        success: true,
        data: {
            email, firstname, lastname
        }
    }
}