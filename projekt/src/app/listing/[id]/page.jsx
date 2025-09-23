import { getAllListings, getSingleListing, getSingleUser } from "@/utilities/get-data";
import './_listing-details-page.scss';
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ListingCard from "@/components/ui/listing-card";
import ProposeSwapComponent from "@/components/ui/forms/propose-swap";

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
    const AllListingsData = await getAllListings();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('swaphub_access_token');
    const userId = cookieStore.get('swaphub_user_id');
    let userData = null;

    if (!listingData) {
        notFound();
    }

    if (accessToken && userId) {
        userData = await getSingleUser(userId.value, accessToken.value);
    }

    let allOtherListingsFromCurrentListingUser = AllListingsData.filter(
        listing => listing.userId === listingData.userId
        && listing.id !== listingData.id
    );

    if (allOtherListingsFromCurrentListingUser.length === 0) allOtherListingsFromCurrentListingUser = null;

    return (
        <main className='listing-details'>
            <article className='listing-details__article'>
                <img className="listing-details__image" src={listingData.asset?.url} alt="image of listing" />
                <div className='listing-details__text-container'>
                    <h1 className='listing-details__heading'>{listingData.title}</h1>
                    <p className='listing-details__text'>{listingData.description}</p>
                    <p className='listing-details__text listing-details__time'>On SwapHub since: {listingData.createdAt}</p>
                    {userId && accessToken && <ProposeSwapComponent userId={userId.value} accessToken={accessToken.value} listingData={listingData} userData={userData} />}
                </div>
            </article>
            {allOtherListingsFromCurrentListingUser?.length && <section className='other-items'>
                <h2 className='listing-details__heading'>Other items from this Swapper</h2>
                <ul className='other-items__list'>
                    {allOtherListingsFromCurrentListingUser.map(listing => {
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