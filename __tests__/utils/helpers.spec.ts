import { describe, it,expect } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  it('serial test', async () => { /* ... */ })
  it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
})
 
import { Headline } from '../../src/types';
import { convertUtcTimestampToUnixTimestamp,addIdToHeadlines } from '../../src/utils/helpers';

describe('utils/helpers', () => {

    it('should convert utc timestamp to unix timestamp', () => {
        const utcTimestamp = '2021-03-02T15:00:00Z';
        const unixTimestamp = convertUtcTimestampToUnixTimestamp(utcTimestamp);
        expect(unixTimestamp).toBe(1614697200);
    })

    it('should add id to headlines', () => {
        const headlines = [
            {
              "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
              },
              "author": "Michael Scherer, Josh Dawsey",
              "title": "GOP wants candidates to pledge support for nominee — but some resist - The Washington Post",
              "description": "Trump said he won’t commit to supporting the winner if he loses the nomination, and other potential candidates have hedged on the issue.",
              "url": "https://www.washingtonpost.com/politics/2023/02/17/republicans-endorsement-nominee/",
              "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/CPFRUF4ZFQSB3FJOKE5RLOKIDY.JPG&w=1440",
              "publishedAt": "2023-02-17T12:32:24Z",
              "content": "Comment on this story\r\nRepublican National Committee Chairwoman Ronna McDaniel is so concerned that party disunity will sink GOP hopes in the 2024 presidential election that she plans to require all … [+10005 chars]"
            },
            {
              "source": {
                "id": null,
                "name": "BBC News"
              },
              "author": "https://www.facebook.com/bbcnews",
              "title": "EDF: French energy giant posts worst-ever results - BBC",
              "description": "The €17.9bn (£16bn) loss is being blamed on capped prices as well as repairs to power stations.",
              "url": "https://www.bbc.com/news/world-europe-64674131",
              "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/12B48/production/_128661667_edf.jpg",
              "publishedAt": "2023-02-17T12:00:15Z",
              "content": "Energy prices may have jumped to unprecedented highs, but for France's state-controlled power company EDF 2022 was a miserable year with record annual losses of 17.9bn (£16bn).\r\nA price cap on energy… [+3287 chars]"
            },
            {
              "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
              },
              "author": "Kelsey Ables, Victoria Bisset, David L. Stern",
              "title": "Russia-Ukraine war latest updates: Harris, Blinken in Munich; Bakhmut fighting continues - The Washington Post",
              "description": "Vice President Harris is addressing the Munich Security Conference days before the first anniversary of the invasion, with fierce fighting expected in spring.",
              "url": "https://www.washingtonpost.com/world/2023/02/17/russia-ukraine-war-latest-updates/",
              "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UHG24TWK57JIJNYHCGWOECC75E.jpg&w=1440",
              "publishedAt": "2023-02-17T10:45:00Z",
              "content": "Political, intelligence and defense leaders from across the world are gathering in Germany for the start of the annual Munich Security Conference, as Ukrainian President Volodymyr Zelensky warned tha… [+6173 chars]"
            },
        ]

        // @ts-ignore
        const headlinesWithId = addIdToHeadlines(headlines );
        expect(headlinesWithId[0].id).toBe(convertUtcTimestampToUnixTimestamp(headlines[0].publishedAt) + 0);
        expect(headlinesWithId[1].id).toBe(convertUtcTimestampToUnixTimestamp(headlines[1].publishedAt) + 1);
        expect(headlinesWithId[2].id).toBe(convertUtcTimestampToUnixTimestamp(headlines[2].publishedAt) + 2);

    })
})