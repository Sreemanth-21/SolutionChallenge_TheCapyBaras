import React from 'react';
import { Podcast, TrendingUp } from 'lucide-react';

interface Podcast {
  title: string;
  host: string;
  description: string;
  link: string;
  topics: string[];
}

const popularPodcasts: Podcast[] = [
  {
    title: "InvestTalk",
    host: "Steve Peasley & Justin Klein",
    description: "Investment strategies and market insights for the everyday investor",
    link: "https://investtalk.com",
    topics: ["Stocks", "Investment Strategy", "Market Analysis"]
  },
  {
    title: "Money For the Rest of Us",
    host: "J. David Stein",
    description: "A personal finance show on money, investing, the economy, and retirement",
    link: "https://moneyfortherestofus.com",
    topics: ["Personal Finance", "Investing", "Economics"]
  },
  {
    title: "The Rational Reminder",
    host: "Benjamin Felix & Cameron Passmore",
    description: "Evidence-based investing and financial decision-making",
    link: "https://rationalreminder.ca",
    topics: ["Evidence-based Investing", "Financial Planning", "Behavioral Finance"]
  }
];

export function PodcastRecommender() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500 p-2 rounded-full">
          <Podcast className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Financial Podcast Recommendations</h2>
      </div>
      
      <div className="space-y-6">
        {popularPodcasts.map((podcast, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">{podcast.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Hosted by {podcast.host}</p>
            <p className="text-gray-700 mb-3">{podcast.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {podcast.topics.map((topic, i) => (
                <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                  {topic}
                </span>
              ))}
            </div>
            <a
              href={podcast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center gap-1"
            >
              Visit Website
              <TrendingUp className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}