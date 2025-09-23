'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function logoutFormAction(prevState, formData) {

    const cookieStore = await cookies();
    cookieStore.delete('swaphub_access_token');
    cookieStore.delete('swaphub_user_id');

    revalidatePath();
}