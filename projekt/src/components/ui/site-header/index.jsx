'use client';

import Image from "next/image";
import Link from "next/link";
import './_site-header.scss';
import { usePathname } from "next/navigation";
import LogoutForm from "../forms/logout";
import styles from '../../../app/page.module.scss';
import LoginForm from "../forms/login";

export default function SiteHeader({ accessToken = null, userId = null }) {

    const pathname = usePathname();
/*     console.log(accessToken);
    console.log(userId) */

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
                <Link href='/' className={`header__menu-item ${pathname === '/' ? 'active' : ''}`}>Listings</Link>
                <Link href='/contact' className={`header__menu-item ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
                {!accessToken && !userId && <LoginForm />}
                {!accessToken && !userId && <Link href='/register' className="header__menu-item--dark-color">Register</Link>}
                {accessToken && userId && <LogoutForm />}
                {accessToken && userId && <Link href='/profile' className="header__menu-item--dark-color">Profile</Link>}
            </nav>
        </header>
    )
}