import Image from "next/image";
import Link from "next/link";
import './_listing-card.scss';

export default function ListingCard({ listing = {} }) {

    //console.log(listing)

    return (
        <Link href={`/listing/${listing.id}`}>
            <article className="listing-card">
                <img
                    className="listing-card__image" 
                    src={listing.asset.url} 
                    alt="image of listing" 
/*                     height={500}
                    width={500} */
                    />
                <h3 className="listing-card__title">{listing.title}</h3>
            </article>
        </Link>
    )
}