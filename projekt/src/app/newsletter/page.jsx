import NewsletterForm from "@/components/ui/forms/newsletter"
import SiteHeader from "@/components/ui/site-header";
import { getSingleUser } from "@/utilities/get-data";
import { cookies } from "next/headers"

export const metadata = {
  title: 'Newsletter'
}

export default async function newsletterPage() {

    var accessTokenExpired = false;
    var messageToken = null;
    
    const cookieStore = await cookies();
    if (!cookieStore.has('swaphub_access_token') && !cookieStore.has('swaphub_user_id') && cookieStore.has('swaphub_session_token')) accessTokenExpired = true;
    if (cookieStore.has('swaphub_message_token')) messageToken = cookieStore.get('swaphub_message_token');

    if (cookieStore.has('swaphub_access_token')) var accessToken = cookieStore.get('swaphub_access_token');
    if (cookieStore.has('swaphub_user_id')) var userId = cookieStore.get('swaphub_user_id');
    var userData = null;

    if (accessToken && userId) userData = await getSingleUser(userId.value, accessToken.value);

    return (
        <main>
            <SiteHeader 
                accessToken={accessToken ? accessToken : null} 
                userId={userId ? userId : null} 
                messageToken={messageToken ? messageToken.value : null} 
                userData={userData ? userData : null} 
                accessTokenExpired={accessTokenExpired} 
            />
            <NewsletterForm userData={userData ? userData : null} />
        </main>
    )
}