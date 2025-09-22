import Image from "next/image";
import Link from "next/link";
import './_site-header.scss';

export default function SiteHeader() {

    return (
        <header className="header">
            <Link href='/' className="header__logo-container">
                <Image 
                    src='/images/logo.png'
                    height={40}
                    width={40}
                    alt="logo"
                />
                <h2 className="header__heading">SwapHub</h2>
            </Link>
            <nav className="header__menu">
                <Link href='#' className="header__menu-item">Listings</Link>
                <Link href='#' className="header__menu-item">Community</Link>
                <Link href='#' className="header__menu-item">Contact</Link>
                <Link href='#' className="header__menu-item--medium-color">Sign in</Link>
                <Link href='#' className="header__menu-item--dark-color">Register</Link>
            </nav>
        </header>
    )
}