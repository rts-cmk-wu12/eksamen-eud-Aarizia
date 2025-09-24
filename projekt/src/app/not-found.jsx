import Link from "next/link";
import styles from './page.module.scss';

export default function NotFound() {

    return (
        <main className={`${styles.not_found}`}>
            <h1>Sorry</h1>
            <p>The page you are looking for does not exist</p>
            <Link className={`${styles.not_found__link}`} href={'/'}>Back to the front page</Link>
        </main>
    )
}