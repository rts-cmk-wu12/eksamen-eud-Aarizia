import Link from "next/link";
import styles from './page.module.scss';
import SiteHeader from "@/components/ui/site-header";

export default async function NotFound() {
    
    const accessToken = null;
    const userId = null;
    const messageToken = null;
    const userData = null;
    const accessTokenExpired = false;

    return (
        <main className={`${styles.not_found}`}>
            <SiteHeader
                error={true}
                accessToken={accessToken ? accessToken : null} 
                userId={userId ? userId : null} 
                messageToken={messageToken ? messageToken.value : null} 
                userData={userData ? userData : null} 
                accessTokenExpired={accessTokenExpired ? accessTokenExpired : null}
            />
            <h2>Sorry</h2>
            <p>The page you are looking for does not exist</p>
            <Link className={`${styles.not_found__link}`} href={'/'}>Back to the front page</Link>
        </main>
    )
}