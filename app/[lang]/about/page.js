import { getDictionary } from "../dictionaries/dictionaries";

export default async function AboutPage({ params: { lang } }) {
    const language = await getDictionary(lang);
    return (
        <div>
            <h1>{language.about}</h1>
        </div>
    );
}
