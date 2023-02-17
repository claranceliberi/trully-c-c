import React, { useState, useEffect } from "react";
import axios from "axios";
import { Headline } from "../types";
import { useParams } from "react-router-dom";
import { selectArticle } from "../store/news";
import store from "../store";


export default function ArticlePage () {
  const [article, setArticle] = useState<Headline | null>(null);
  let { id } = useParams();

  useEffect(() => {
    console.log('in the page', id)
    if(id){
        const article = selectArticle(store.getState())(+id)
        if(article)
            setArticle(article)
        
    }
    // console.log(selectArticle(store.getState())(+id))
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-10 pb-12">
        <header className="pb-6">
          <h1 className="text-3xl leading-9 font-bold text-gray-900">
            {article.title}
          </h1>
          <div className="mt-1 flex items-center text-sm leading-5 text-gray-500">
            <span className="capitalize">{article.source.name}</span>
            <span className="mx-1">&middot;</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {article.description && (
            <p className="text-lg leading-7 mb-6">{article.description}</p>
          )}
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}
          <div
            className="text-lg leading-8 tracking-tight text-gray-700 mt-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

