'use client';

import { useEffect } from "react";
import styles from './page.module.scss';
import SiteHeader from "@/components/ui/site-header";

export default function Error({ error }) {

    const accessToken = null;
    const userId = null;
    const messageToken = null;
    const userData = null;
    const accessTokenExpired = null;

    useEffect(() => {

        console.error(error);

    }, [error]);

    return (
        <main className={`${styles.error}`}>
            <SiteHeader
                error={true}
                accessToken={accessToken ? accessToken : null} 
                userId={userId ? userId : null} 
                messageToken={messageToken ? messageToken.value : null} 
                userData={userData ? userData : null} 
                accessTokenExpired={accessTokenExpired ? accessTokenExpired : null} 
            />
            <h2>Unfortunately an error has occured on the server</h2>
            <p>Please try again later</p>
        </main>
    )
}