import { Headline } from "../types";

export function convertUtcTimestampToUnixTimestamp(utcTimestamp:string) {
    const date = new Date(utcTimestamp);
    return date.getTime() / 1000;
}

export function addIdToHeadlines(headlines:Headline[]) {
    return headlines.map((headline, index) => ({...headline, id: convertUtcTimestampToUnixTimestamp(headline.publishedAt) + index}));
}