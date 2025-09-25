import { getSingleListing, getSingleUser } from "@/utilities/get-data";
import { cookies } from "next/headers"
import { notFound } from "next/navigation";
import styles from '../page.module.scss';
import ListingCard from "@/components/ui/listing-card";
import SiteHeader from "@/components/ui/site-header";

export default async function myListingsPage() {

    var messageToken = null;
    var accessTokenExpired = false;
    const cookieStore = await cookies();
    if (!cookieStore.has('swaphub_access_token') && !cookieStore.has('swaphub_user_id') && cookieStore.has('swaphub_session_token')) accessTokenExpired = true;
    if (cookieStore.has('swaphub_message_token')) messageToken = cookieStore.get('swaphub_message_token');
    if (cookieStore.has('swaphub_access_token')) var accessToken = cookieStore.get('swaphub_access_token');
    if (cookieStore.has('swaphub_user_id')) var userId = cookieStore.get('swaphub_user_id');

    if (accessToken && userId) var userData = await getSingleUser(userId.value, accessToken.value);

    if (!userData) {
        notFound();
    }

    const userListings = [];

    for (let i = 0; i < userData?.listings?.length; i++) {
        const listingData = await getSingleListing(userData.listings[i].id);
        userListings.push(listingData);
    }

    return (
        <main className={`${styles.my_listings_page}`}>
            <SiteHeader
                accessToken={accessToken ? accessToken : null} 
                userId={userId ? userId : null} 
                messageToken={messageToken ? messageToken.value : null} 
                userData={userData ? userData : null} 
                accessTokenExpired={accessTokenExpired} 
            />
            {userData?.listings?.length ?
                <>
                    <h1 className={`${styles.my_listings_page__heading}`}>My Listings</h1>
                    <ul className={`${styles.my_listings_page__list}`}>
                        {userListings.map(listing => {
                            return (
                                <li key={listing.id} className={`${styles.my_listings_page__list_item}`}>
                                    <ListingCard listing={listing} />
                                </li>
                            )
                        })}
                    </ul>
                </>
            :
            <p className={`${styles.my_listings_page__error_message}`}>You currently have no listings</p>}
        </main>
    )
}