import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const defaultLocale = "en";
const supportedLocals = ["en", "bn"];

// get locale from user preference

function getLocale(req) {
    const acceptedLanguage = req.headers.get("accept-language") ?? undefined;
    let headers = { "accept-language": acceptedLanguage };
    let languages = new Negotiator({ headers }).languages();
    return match(languages, supportedLocals, defaultLocale);
}

export function middleware(req) {
    // check the url path that is there any local passes or not
    const pathname = req.nextUrl.pathname;
    const pathnameIsMissingLocale = supportedLocals.every(
        (locale) =>
            !pathname.startsWith(`/${locale}`) &&
            !pathname.startsWith(`/${locale}/`)
    );

    if (pathnameIsMissingLocale) {
        // detecte user preferenced local and redirect with locale eg: /en/about
        console.log("pathname has no locale");
        const locale = getLocale(req);
        console.log(locale);

        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, req.url)
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
        // Optional: only run on root (/) URL
        // '/'
    ],
};
