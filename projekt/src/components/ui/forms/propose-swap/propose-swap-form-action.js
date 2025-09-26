'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function proposeSwapServerAction (prevState, formData) {

    const offerItemId = formData.get('offerItemId');
    const requestItemId = formData.get('requestItemId');

    const cookieStore = await cookies();
    if (!cookieStore.has('swaphub_user_id') || !cookieStore.has('swaphub_access_token')) {

        cookieStore.set({
            name: 'swaphub_session_token',
            value: true,
            maxAge: 15
        });

        redirect(`/listing/${requestItemId}`);
    }

    const schema = z.object({
        offerItemId: z.string().min(1),
        requestItemId: z.string().min(1),
    });

    const validated = schema.safeParse({
        offerItemId, requestItemId
    });

    if (!validated.success) return {
        success: false,
        errors: ['There was an error at the server. Try again later.']
    }

    const userId = cookieStore.get('swaphub_user_id');
    const accessToken = cookieStore.get('swaphub_access_token')

    // create a post user request
    const API_URL = 'http://localhost:4000/api/v1/requests';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken.value
        },
        body: JSON.stringify({
            userid: userId.value,
            requestItem: requestItemId,
            offerItem: offerItemId
        })
    }

    const response = await fetch(API_URL, options);
    console.log(response);

    if (!response.ok) return {
        success: false,
        errors: ['There was an error at the server. Try again later']
    }

    if (response.status === 204) return {
        success: true
    }
}

// koden i denne fil er skrevet med inspiration fra undervisningen på RTS