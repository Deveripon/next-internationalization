import React from "react";
import { getDictionary } from "../dictionaries/dictionaries";

export default async function ContactPage({ params: { lang } }) {
    const language = await getDictionary(lang);
    return (
        <div>
            <h1>{language.contact}</h1>
        </div>
    );
}
