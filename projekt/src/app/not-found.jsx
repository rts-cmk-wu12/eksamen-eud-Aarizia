import Link from "next/link";

export default function NotFound() {

    return (
        <main>
            <h1 className="not-found__heading">Sorry</h1>
            <p>The page you are looking for does not exist</p>
            <Link className="not-found__link" href={'/'}>Back to the front page</Link>
        </main>
    )
}