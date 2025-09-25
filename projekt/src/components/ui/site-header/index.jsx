'use client';

import Image from "next/image";
import Link from "next/link";
import './_site-header.scss';
import { usePathname } from "next/navigation";
import LogoutForm from "../forms/logout";
import LoginForm from "../forms/login";
import RegisterUserForm from "../forms/register-user";
import UpdateProfileForm from "../forms/update-profile";
import { FaCheck } from "react-icons/fa";

export default function SiteHeader({ accessToken = null, userId = null, messageToken = null, userData = null, accessTokenExpired, error = false }) {

    const pathname = usePathname();
    
    return (
        <header className="header">
            <div className="header__menu-container">
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
                    <Link href='/' className={`header__menu-item ${pathname === '/' ? 'active' : ''}`}>Browse Listings</Link>
                    {accessToken && userId && <Link href='/my-listings' className={`header__menu-item ${pathname === '/my-listings' ? 'active' : ''}`}>My Listings</Link>}
                    <Link href='/newsletter' className={`header__menu-item ${pathname === '/newsletter' ? 'active' : ''}`}>Newsletter</Link>
                    {!accessToken && !userId && <LoginForm error={error ? error : null} />}
                    {!accessToken && !userId && <RegisterUserForm error={error ? error : null} />}
                    {accessToken && userId && <LogoutForm />}
                    {accessToken && userId && <UpdateProfileForm userData={userData ?  userData : null} />}
                </nav>
            </div>
            <>
                {accessTokenExpired && <div className="header__warning border-block-start">
                        <p className="header__warning-text">Your session has expired</p> 
                        <LoginForm />
                        <p className="header__warning-text">again to swap more items</p>
                </div>}
                {messageToken === 'login' && <div className="header__warning border-block-start">
                    <FaCheck className="header__warning-icon" />
                    {userData ?
                        <p>You have successfully signed in. Welcome back, {userData?.firstname}!</p>
                    :
                        <p>You have successfully signed in. Welcome back!</p>
                    }
                </div>}
                {messageToken === 'register' && <div className="header__warning border-block-start">
                    <FaCheck className="header__warning-icon" />
                    {userData ?
                        <p>You have successfully registered and signed in. Welcome, {userData?.firstname}!</p>
                    :
                        <p>You have successfully registered and signed in. Welcome!</p>
                    }
                </div>}
                {messageToken === 'logout' && <div className="header__warning border-block-start">
                    <FaCheck className="header__warning-icon" />
                    <p>You have successfully signed out. Goodbye for now!</p>
                </div>}
            </>
        </header>
    )
}
