'use client';

import { useEffect } from "react";

export default function Error({ error }) {

    useEffect(() => {

        console.error(error);

    }, [error]);

    return (
        <>
            <h2>Der er desværre sket en fejl</h2>
            <p>Prøv igen senere</p>
        </>
    )
}