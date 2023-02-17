export interface Response<T> {
    [key: string]: T | T[] | string | number;
}

export interface Headline {
    id:number,
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }