import Link from "next/link";
import './_listing-card.scss';

export default function ListingCard({ listing = {} }) {


    return (
        <Link href={`/listing/${listing.id}`}>
            <article className="listing-card">
                <img
                    className="listing-card__image" 
                    src={listing?.asset?.url} 
                    alt="image of listing"
                />
                <h3 className="listing-card__title">{listing.title}</h3>
            </article>
        </Link>
    )
}