import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VENICE_API_KEY = process.env.REACT_APP_VENICE_API_KEY;
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
        setNews(response.data.choices);
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
          <Card key={index} className="mb-4">
            <CardContent>
              <p>{article.text}</p>
            </CardContent>
          </Card>
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Unbiased News Platform</h1>
      <div className="flex gap-4 mb-6">
        <Button onClick={() => setCategory("Unbiased")}>Unbiased</Button>
        <Button onClick={() => setCategory("Left-Leaning")}>Left-Leaning</Button>
        <Button onClick={() => setCategory("Right-Leaning")}>Right-Leaning</Button>
      </div>
      <NewsSection category={category} />
    </div>
  );
}
