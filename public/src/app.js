import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VENICE_API_KEY = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8";
const VENICE_API_URL = "https://api.venice.ai/api/v1/chat/completions";

const NewsSection = ({ category }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
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
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{category} News</h2>
      {news.map((article, index) => (
        <Card key={index} className="mb-4">
          <CardContent>
            <p>{article.text}</p>
          </CardContent>
        </Card>
      ))}
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
