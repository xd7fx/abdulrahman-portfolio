import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    // Using RSSHub to get LinkedIn posts
    // RSSHub URL format: https://rsshub.app/linkedin/posts/{profile-id}
    const profileId = 'abdulrahman-alnashri-b017b62ab';
    const rssUrl = `https://rsshub.app/linkedin/posts/${profileId}`;
    
    const feed = await parser.parseURL(rssUrl);
    
    // Transform RSS items to our format
    const posts = feed.items.slice(0, 6).map(item => ({
      title: item.title || 'LinkedIn Post',
      description: item.contentSnippet || item.content || '',
      link: item.link || `https://www.linkedin.com/in/${profileId}`,
      pubDate: item.pubDate || new Date().toISOString(),
      image: extractImage(item.content || ''),
    }));
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching LinkedIn feed:', error);
    
    // Fallback to static data if RSS fails
    return NextResponse.json({
      posts: [
        {
          title: "Latest Achievement Update",
          description: "Excited to share my recent accomplishments in AI and Robotics. Working on cutting-edge projects that combine machine learning with autonomous systems.",
          link: "https://www.linkedin.com/in/abdulrahman-alnashri-b017b62ab",
          pubDate: new Date().toISOString(),
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
        },
        {
          title: "New Project Launch",
          description: "Working on an exciting new AI project that combines machine learning with robotics. Stay tuned for more updates!",
          link: "https://www.linkedin.com/in/abdulrahman-alnashri-b017b62ab",
          pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
        },
        {
          title: "Industry Insights",
          description: "Sharing my thoughts on the future of AI and autonomous systems. The intersection of robotics and AI is creating amazing opportunities.",
          link: "https://www.linkedin.com/in/abdulrahman-alnashri-b017b62ab",
          pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        },
      ]
    });
  }
}

function extractImage(content: string): string | undefined {
  // Try to extract image from HTML content
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  // Default fallback images
  const defaultImages = [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}
