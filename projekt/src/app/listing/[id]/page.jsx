import { getSingleListing } from "@/utilities/get-data";

export async function generateMetadata({ params }) {
    
    const {id} = await params;
    const data = await getSingleListing(id);
    
    return {
        title: data?.title
    }
    
}

export default async function listingDetailsPage({ params }) {
    
    const {id} = await params;
    const data = await getSingleListing(id);
    console.log(data);

    return (
        <main>

            <h1>Listing details</h1>
        </main>
    )
}