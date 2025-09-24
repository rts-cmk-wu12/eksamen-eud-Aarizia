'use server';

import { cookies } from "next/headers";
import z from "zod";

export default async function loginFormAction(prevState, formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    const schema = z.object({
        email: z.string().min(1, {message: 'Email field has to be filled'}),
        password: z.string().min(1, {message: 'Password field has to be filled'})
    });

    const validated = schema.safeParse({
        email, password
    });

    if (!validated.success) return {
        ...validated,
        ...z.treeifyError(validated.error),
        data: {
            email
        }
    }

    //console.log(validated);

    // create access token
    const API_URL = 'http://localhost:4000/auth/token';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: validated.data.email,
            password: validated.data.password
        })
    }

    const response = await fetch(API_URL, options);

    //console.log(response);

    if (!response.ok) return {
        success: false,
        errors: ['Invalid login. Try again'],
        data: {
            email
        }
    }

    const data = await response.json();

    //console.log(data);

    const cookieStore = await cookies();

    cookieStore.set({
        name: 'swaphub_access_token',
        value: data.token,
        maxAge: 60*60
    });

    cookieStore.set({
        name: 'swaphub_user_id',
        value: data.userId,
        maxAge: 60*60
    });

    return {
        success: true,
        data: {
            email
        }
    }
}