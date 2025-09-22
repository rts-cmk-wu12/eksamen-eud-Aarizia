async function getData(endpoint) {

    const API_URL = new URL(endpoint, 'http://localhost:4000/api/v1/');

    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Der opstod en fejl.');
        }

        if (!response.headers.get('content-type').includes('application/json')) {
            throw new Error('Body er ikke JSON.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

const getAllListings = () => getData('listings');
const getSingleListing = (id) => getData(`/listings/${id}`)

export {
    getAllListings,
    getSingleListing
}