//import NewsletterForm from "@/components/ui/forms/newsletter"

import NewsletterForm from "@/components/ui/forms/newsletter"
import { getSingleUser } from "@/utilities/get-data";
import { cookies } from "next/headers"

export const metadata = {
  title: 'Contact'
}

export default async function contactPage() {

    const cookieStore = await cookies();
    if (cookieStore.has('swaphub_access_token')) var accessToken = cookieStore.get('swaphub_access_token');
    if (cookieStore.has('swaphub_user_id')) var userId = cookieStore.get('swaphub_user_id');
    var userData = null;

    if (accessToken && userId) userData = await getSingleUser(userId.value, accessToken.value);

    //console.log(userData)


    return (
        <main className="contact-page">
            <NewsletterForm userData={userData ? userData : null} />
        </main>
    )
}