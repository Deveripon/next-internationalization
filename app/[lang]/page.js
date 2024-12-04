import React from "react";
import { getDictionary } from "./dictionaries/dictionaries";

const page = async ({ params: { lang } }) => {
    const language = await getDictionary(lang);
    return (
        <div>
            <h1>{language.home}</h1>
        </div>
    );
};

export default page;
