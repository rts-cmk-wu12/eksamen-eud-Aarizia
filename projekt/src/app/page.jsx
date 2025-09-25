import SearchProvider from "@/components/providers/search-provider";
import ItemsList from "@/components/ui/items-list";
import SearchInput from "@/components/ui/search-input";
import { getAllListings, getSingleUser } from "@/utilities/get-data";
import styles from './page.module.scss';
import { cookies } from "next/headers";
import SiteHeader from "@/components/ui/site-header";

export default async function frontPage() {
  
  var accessTokenExpired = false;
  var messageToken = null;
  
  const cookieStore = await cookies();
  if (cookieStore.has('swaphub_access_token')) var accessToken = cookieStore.get('swaphub_access_token');
  if (cookieStore.has('swaphub_user_id')) var userId = cookieStore.get('swaphub_user_id');
  if (accessToken && userId) var userData = await getSingleUser(userId.value, accessToken.value);

  if (!cookieStore.has('swaphub_access_token') && !cookieStore.has('swaphub_user_id') && cookieStore.has('swaphub_session_token')) accessTokenExpired = true;
  if (cookieStore.has('swaphub_message_token')) messageToken = cookieStore.get('swaphub_message_token');

  const allListingsData = await getAllListings();

  if (!allListingsData) error();

  return (
    <main className={`front-page ${styles.front_page}`}>
      <SiteHeader 
        accessToken={accessToken ? accessToken : null} 
        userId={userId ? userId : null} 
        messageToken={messageToken ? messageToken.value : null} 
        userData={userData ? userData : null} 
        accessTokenExpired={accessTokenExpired} 
      />
      <SearchProvider>
        <SearchInput allListingsData={allListingsData} />
        <ItemsList allListingsData={allListingsData} />
      </SearchProvider>
    </main>
  );
}
