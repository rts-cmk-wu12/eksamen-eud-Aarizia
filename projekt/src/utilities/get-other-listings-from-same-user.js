export default function getOtherListingsFromSameUser(userListings = [], listingData) {

    let allOtherListingsFromSameUser = userListings.filter(
        listing => listing.userId === listingData.userId
        && listing.id !== listingData.id
    );

    if (allOtherListingsFromSameUser.length === 0) allOtherListingsFromSameUser = null;

    return allOtherListingsFromSameUser;
}