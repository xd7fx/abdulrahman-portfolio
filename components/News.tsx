"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import SectionPlanet from "./SectionPlanet";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image?: string;
}

export default function News() {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch LinkedIn posts from API
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/linkedin-feed');
        const data = await response.json();
        setNews(data.posts || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to empty array
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section id="news" className="py-20 relative overflow-hidden">
      <SectionPlanet planet="lava" size={450} position="left" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader 
          title={t("newsTitle")} 
          subtitle={t("newsSubtitle")}
        />

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center text-space-ice/70">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-space-cyan"></div>
              <p className="mt-4">Loading latest updates...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow group overflow-hidden"
                >
                  {/* Image */}
                  {item.image && (
                    <div className="relative h-48 mb-4 -mx-6 -mt-6 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center space-x-2 text-xs text-space-cyan mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(item.pubDate)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-orbitron font-bold mb-3 group-hover:text-space-cyan transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-space-ice/80 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Read More Link */}
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm text-space-cyan hover:text-space-ice transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Linkedin size={16} />
                    <span>View on LinkedIn</span>
                    <ExternalLink size={14} />
                  </motion.a>
                </motion.article>
              ))}
            </div>
          )}

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://www.linkedin.com/in/abdulrahman-alnashri-b017b62ab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
              <span>View All Updates on LinkedIn</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
