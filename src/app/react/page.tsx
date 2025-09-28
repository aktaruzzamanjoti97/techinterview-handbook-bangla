
'use client';

import reactData from '../../data/react.json';
import { useState, useEffect } from 'react';
import Image from 'next/image';
interface CheatSheetItem {
  question: string;
  answer: string;
  code?: string;
}

interface CheatSheetSection {
  items: CheatSheetItem[];
}

interface CheatSheetData {
  id: string;
  title: string;
  slug: string;
  description: string;
  colorPref: string;
  contents: CheatSheetSection[];
}

interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export default function Home() {
  const data: CheatSheetData = reactData;
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        // Replace with your actual GitHub repository
        const response = await fetch('https://api.github.com/repos/yourusername/techinterview-handbook-bangla/contributors');
        if (response.ok) {
          const data = await response.json();
          setContributors(data.slice(0, 6)); // Show top 6 contributors
        }
      } catch (error) {
        console.error('Failed to fetch contributors:', error);
        // Fallback contributors for demo
        setContributors([
          {
            id: 1,
            login: 'contributor1',
            avatar_url: 'https://github.com/identicons/contributor1.png',
            html_url: 'https://github.com/contributor1',
            contributions: 50
          },
          {
            id: 2,
            login: 'contributor2',
            avatar_url: 'https://github.com/identicons/contributor2.png',
            html_url: 'https://github.com/contributor2',
            contributions: 30
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            style={{ color: data.colorPref }}
          >
            {data.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </header>

        <div className="grid gap-8">
          {data.contents.map((section, sectionIndex) => (
            <section
              key={sectionIndex}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: `${data.colorPref}15` }}
              >
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: data.colorPref }}
                >
                  React Interview Questions
                </h2>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.question}
                        </h3>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                        {item.code && (
                          <div className="mt-4 bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                            <pre className="text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                              <code>{item.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Contributors Section */}
        <section className="mt-12 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div
              className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
              style={{ backgroundColor: `${data.colorPref}15` }}
            >
              <h2
                className="text-2xl font-semibold flex items-center gap-2"
                style={{ color: data.colorPref }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                কন্ট্রিবিউটরস
              </h2>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Loading contributors...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {contributors.map((contributor) => (
                    <a
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 group"
                    >
                      <div className="relative">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-500 transition-colors duration-200"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                          {contributor.contributions}
                        </div>
                      </div>
                      <h3 className="mt-3 text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
                        {contributor.login}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {contributor.contributions} contributions
                      </p>
                    </a>
                  ))}
                </div>
              )}

              {!loading && contributors.length > 0 && (
                <div className="mt-6 text-center">
                  <a
                    href="https://github.com/yourusername/techinterview-handbook-bangla/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    সকল কন্ট্রিবিউটর দেখুন
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            React JS - টেকনিক্যাল ইন্টারভিউ হ্যান্ডবুক (বাংলা)
          </p>
        </footer>
      </div>
    </div>
  );
}
