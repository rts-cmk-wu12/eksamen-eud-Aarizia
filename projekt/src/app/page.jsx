import SearchProvider from "@/components/providers/search-provider";
import ItemsList from "@/components/ui/items-list";
import SearchInput from "@/components/ui/search-input";
import { getAllListings } from "@/utilities/get-data";
import styles from './page.module.scss';

export default async function frontPage() {

  const allListingsData = await getAllListings();

  if (!allListingsData) {
    error();
  }

  return (
    <main className={`front-page ${styles.front_page}`}>
      <SearchProvider>
        <SearchInput allListingsData={allListingsData} />
        <ItemsList allListingsData={allListingsData} />
      </SearchProvider>
    </main>
  );
}
