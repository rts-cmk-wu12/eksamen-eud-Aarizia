'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutFormAction(prevState, formData) {

    const cookieStore = await cookies();
    cookieStore.delete('swaphub_access_token');
    cookieStore.delete('swaphub_user_id');
    cookieStore.delete('swaphub_session_token');

    cookieStore.set({
        name: 'swaphub_message_token',
        value: 'logout',
        maxAge: 5
    });

    redirect(`http://localhost:3000`);
}