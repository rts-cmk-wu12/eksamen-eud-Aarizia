export default function formatDate(string) {

    const stringAsArray = string.split('');

    if (stringAsArray.includes('T')) var formattedDate = string?.split('T');

    if (formattedDate) return formattedDate 
    else return null;
}