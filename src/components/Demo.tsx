import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets/index.ts";
import { useLazyGetSummaryQuery } from "../services/article.ts";


interface Article {
  url: string;
  summary: string;
}





const Demo = () => {
  const [article, setArticle] = useState<Article>({
    url: '',
    summary: ''
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
  
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };

  return (
    <section className="section">
      {/* Search */}
      <div className="search">
        <form
          className="from"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt="link-icon" className="demo-img" />

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({
              ...article,url:e.target.value
            })}
            // onKeyDown={}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
      </div>
      {/* Display Result */}
    </section>
  );
};

export default Demo;
