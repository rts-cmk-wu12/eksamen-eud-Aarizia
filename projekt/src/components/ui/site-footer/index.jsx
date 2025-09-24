import Image from "next/image";
import './_site-footer.scss';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function SiteFooter() {

    return (
        <footer className="footer">
            <div className="footer__left-column">
                <Link href='/' className="footer__logo-container">
                    <Image 
                        src='/images/logo.png'
                        height={40}
                        width={40}
                        alt="logo"
                        />
                    <span className="footer__logo-text">SwapHub</span>
                </Link>
                <ul className="footer__social-media-list">
                    <li>
                        <Link href='https://x.com' passHref>
                            <FaXTwitter className="footer__icon" />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://www.instagram.com' passHref>
                            <FaInstagram className="footer__icon" />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://www.youtube.com' passHref>
                            <FaYoutube className="footer__icon" />
                        </Link>
                    </li>
                    <li>
                        <Link href='https://www.linkedin.com' passHref>
                            <FaLinkedin className="footer__icon" />
                        </Link>
                    </li>
                </ul>
            </div>
            <section className="footer__menu-container">
                <h3 className="footer__heading">About SwapHub</h3>
                <nav className="footer__menu">
                    <Link href='#'>How it works</Link>
                    <Link href='#'>Community guidelines</Link>
                    <Link href='#'>Our mission</Link>
                    <Link href='#'>Contact us</Link>
                </nav>
            </section>
            <section className="footer__menu-container">
                <h3 className="footer__heading">Discover</h3>
                <nav className="footer__menu">
                    <Link href='#'>Browse categories</Link>
                    <Link href='#'>Popular Swaps</Link>
                    <Link href='#'>Successful stories</Link>
                    <Link href='#'>Upcoming events</Link>
                </nav>
            </section>
            <section className="footer__menu-container">
                <h3 className="footer__heading">Support</h3>
                <nav className="footer__menu">
                    <Link href='#'>Help Center</Link>
                    <Link href='#'>FAQs</Link>
                    <Link href='#'>Safety tips</Link>
                    <Link href='#'>Report an issue</Link>
                </nav>
            </section>
        </footer>
    )
}