'use server';

import { cookies } from "next/headers";
import z from "zod";

export default async function changeProfileForm(prevState, formData) {

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
            email, passwordfirst, passwordsecond, firstname, lastname
        }
    }

    
    const cookieStore = await cookies();
    const userId = cookieStore.get('swaphub_user_id');
    const accessToken = cookieStore.get('swaphub_access_token');
    
    //console.log(userId)
    //console.log(accessToken);
    /* const formBody = new FormData();
    formBody.append('email', validated.data.email);
    formBody.append('password', validated.data.passwordfirst);
    formBody.append('firstname', validated.data.firstname);
    formBody.append('lastname', validated.data.lastname); */
    
    
    // put request
    const API_URL = `http://localhost:4000/api/v1/users/${userId.value}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken.value
        },
        body: JSON.stringify({
            email: validated.data.email,
            password: validated.data.passwordfirst,
            firstname: validated.data.firstname,
            lastname: validated.data.lastname
        })
    }
    
    const response = await fetch(API_URL, options);
    //console.log(response);

    if (!response.ok) return {
        success: false,
        errors: ['There was an error on the server. Your changes were not registered. Try again later'],
        data: {
            email,
            firstname,
            lastname
        }
    }
        
    return {
        success: true,
        data: {
            email, firstname, lastname
        }
    }
}