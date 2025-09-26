import { getAllListings, getSingleListing, getSingleUser } from "@/utilities/get-data";
import './_listing-details-page.scss';
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ListingCard from "@/components/ui/listing-card";
import ProposeSwapComponent from "@/components/ui/forms/propose-swap";
import LoginForm from "@/components/ui/forms/login";
import SiteHeader from "@/components/ui/site-header";
import getOtherListingsFromSameUser from "@/utilities/get-other-listings-from-same-user";
import formatDate from "@/utilities/format-date";


export async function generateMetadata({ params }) {
    
    const {id} = await params;
    const data = await getSingleListing(id);
    
    return {
        title: data?.title
    }
    
}

export default async function listingDetailsPage({ params }) {
    
    const {id} = await params;
    const listingData = await getSingleListing(id);
    const allListingsData = await getAllListings();
    let accessTokenExpired = false;
    let messageToken = null;
    let allOtherListingsFromSameUser = null;
    let listingCreationDate = null;
    
    if (!listingData) {
        notFound();
    }
    
    const cookieStore = await cookies();
    if (cookieStore.has('swaphub_user_id')) var userId = cookieStore.get('swaphub_user_id');
    if (cookieStore.has('swaphub_access_token')) var accessToken = cookieStore.get('swaphub_access_token');
    if ((!cookieStore.has('swaphub_access_token') || !cookieStore.has('swaphub_user_id')) && cookieStore.has('swaphub_session_token')) accessTokenExpired = true;
    if (cookieStore.has('swaphub_message_token')) messageToken = cookieStore.get('swaphub_message_token');
    

    if (accessToken && userId) var userData = await getSingleUser(userId.value, accessToken.value);

    if (allListingsData) allOtherListingsFromSameUser = getOtherListingsFromSameUser(allListingsData, listingData);

    if (listingData?.createdAt) listingCreationDate = formatDate(listingData.createdAt);

    return (
        <main className='listing-details'>
            <SiteHeader 
                accessToken={accessToken ? accessToken : null} 
                userId={userId ? userId : null} 
                messageToken={messageToken ? messageToken.value : null} 
                userData={userData ? userData : null} 
                accessTokenExpired={accessTokenExpired}
            />
            <article className='listing-details__article'>
                <img className="listing-details__image" src={listingData.asset?.url} alt="image of listing" />
                <div className='listing-details__text-container'>
                    <h1 className='listing-details__heading'>{listingData.title}</h1>
                    <p className='listing-details__text'>{listingData.description}</p>
                    <p className='listing-details__text listing-details__time'>On SwapHub since: {listingCreationDate[0]}</p>
                    {userId && accessToken ? 
                        <ProposeSwapComponent 
                            listingData={listingData} 
                            userData={userData ? userData : null}
                        />
                    :
                    <div className="listing-details__button-container">
                        <LoginForm biggerText={true} />
                        <p>to propose a swap</p>
                    </div>}
                </div>
            </article>
            {allOtherListingsFromSameUser && <section className='other-items'>
                <h2 className='listing-details__heading'>Other items from this Swapper</h2>
                <ul className='other-items__list'>
                    {allOtherListingsFromSameUser.map(listing => {
                        return (
                            <li key={listing.id} className="other-items__list-item">
                                <ListingCard listing={listing} />
                            </li>
                        )
                    })}
                </ul>
            </section>}
        </main>
    )
}