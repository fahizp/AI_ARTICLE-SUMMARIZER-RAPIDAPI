import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

interface Article {
  url: string;
  summary: string;
}

interface StoredArticle {
  url: string;
  summary: string;
}

interface StoredArticle extends Article {
  createdAt: number;
}

const Demo = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<StoredArticle[]>([]);
  const [copied, setCopied] = useState<string>("");

  // RTK lazy query
  const [getSummary, { isError, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage: StoredArticle[] | null = JSON.parse(
      localStorage.getItem("articles") || "null"
    ) as StoredArticle[] | null;

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle: StoredArticle = {
        ...article,
        summary: data.summary,
        createdAt: Date.now(),
      };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

      console.log(isError,"heheheh");
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | any ) => {
    if (e.key === "enter") {
      handleSubmit(e);
    }
  };

  const clearInput = () => {
      setArticle({url:'',summary:''})
  }
  return (
    <section className="section">
      {/* Search */}
      <div className="search">
        <form className="from" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link-icon" className="demo-img" onClick={clearInput}/>

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}

        <div className="browse-history ">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="browse-img"
                />
              </div>
              <p className="browse-p">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Result */}
      <div className="display-result ">
        {isFetching ? (
          <img src={loader} alt="loader" className="loader" />
        ) : isError ?(
          <p className="display-p">
            Well, that wasn't supposed to happen...
            <br />
            {/* <span className="dispaly-span">{isError?.data?.error}</span> */}
          </p>
        ) : (
          article.summary && (
            <div className="display-summary-div">
              <h2
                className="display-summary-h2"
              >
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="display-summary-p">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
