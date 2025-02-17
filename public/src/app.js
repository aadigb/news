import React, { useState, useEffect } from "react";
import axios from "axios";

const VENICE_API_KEY = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8";
const VENICE_API_URL = "https://api.venice.ai/api/v1/chat/completions";

const NewsSection = ({ category }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          VENICE_API_URL,
          {
            model: "Venice-News",
            prompt: `Summarize the latest ${category} news in a neutral tone.`,
          },
          {
            headers: { Authorization: `Bearer ${VENICE_API_KEY}` },
          }
        );
        setNews(response.data.choices || []);
      } catch (error) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{category} News</h2>
      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {news.length > 0 ? (
        news.map((article, index) => (
          <div key={index} className="border p-4 mb-4 bg-white shadow-md">
            <p>{article.text}</p>
          </div>
        ))
      ) : (
        !loading && <p>No news available.</p>
      )}
    </div>
  );
};

export default function Home() {
  const [category, setCategory] = useState("Unbiased");

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Unbiased News Platform</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setCategory("Unbiased")}>Unbiased</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setCategory("Left-Leaning")}>Left-Leaning</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setCategory("Right-Leaning")}>Right-Leaning</button>
      </div>
      <NewsSection category={category} />
    </div>
  );
}
