import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, ChevronRight, Calendar, User, 
  ArrowRight, MessageSquare, Share2, TrendingUp, 
  Newspaper, Globe, ShieldCheck, Zap, Newspaper as NewsIcon,
  Clock, ExternalLink, ChevronDown, CheckCircle2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { INITIAL_POSTS, CATEGORIES, BlogPost } from './lib/blog-data';
import { cn } from './lib/utils';
import { generateNewBlogPost } from './lib/gemini-service';

export default function App() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-generation simulation logic
  useEffect(() => {
    const checkAndGenerate = async () => {
      const lastCheck = localStorage.getItem('zar_last_news_check');
      const now = new Date().getTime();
      const twelveHours = 12 * 60 * 60 * 1000;

      if (!lastCheck || now - parseInt(lastCheck) > twelveHours) {
        setIsGenerating(true);
        try {
          const newPost = await generateNewBlogPost();
          if (newPost) {
            const fullPost = newPost as BlogPost;
            const updatedPosts = [fullPost, ...posts];
            setPosts(updatedPosts);
            localStorage.setItem('zar_posts_cache', JSON.stringify(updatedPosts));
          }
          localStorage.setItem('zar_last_news_check', now.toString());
        } catch (e) {
          console.error("Auto-gen failed", e);
        } finally {
          setIsGenerating(false);
        }
      }
    };

    // Load from cache if exists
    const cached = localStorage.getItem('zar_posts_cache');
    if (cached) {
      setPosts(JSON.parse(cached));
    }

    checkAndGenerate();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white bg-white">
      {/* Header */}
      <header className="magazine-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setActivePost(null); setSelectedCategory('All');}}>
            <span className="text-xl font-sans font-extrabold tracking-tighter uppercase">
              POLITICAL<span className="text-brand-gold">PULSE</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button key="all" onClick={() => setSelectedCategory('All')} className={cn("text-[10px] uppercase tracking-widest font-bold transition-colors", selectedCategory === 'All' ? "text-brand-gold" : "text-zinc-400 hover:text-white")}>Latest</button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={cn("text-[10px] uppercase tracking-widest font-bold transition-colors", selectedCategory === cat ? "text-brand-gold" : "text-zinc-400 hover:text-white")}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <div className="hidden sm:block h-6 w-px bg-zinc-800 mx-2" />
            <button className="hidden lg:flex items-center gap-2 px-4 py-1.5 border border-zinc-700 text-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
              Premium
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-20 bg-white z-40 px-4 py-8"
          >
            <div className="flex flex-col gap-6">
              <button onClick={() => {setSelectedCategory('All'); setIsMenuOpen(false);}} className="text-2xl font-serif font-bold">Latest</button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => {setSelectedCategory(cat); setIsMenuOpen(false);}}
                  className="text-2xl font-serif font-bold text-zinc-500"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow bg-zinc-100">
        {activePost ? (
          <BlogDetail post={activePost} onClose={() => setActivePost(null)} />
        ) : (
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-[2px]">
            {/* Left Sidebar - Navigation & Ads */}
            <aside className="hidden lg:flex flex-col gap-8 p-8 bg-white h-full">
              <div>
                <h3 className="sidebar-heading">Top Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "w-full text-left p-4 border-l-4 transition-all",
                        selectedCategory === cat 
                          ? "bg-zinc-50 border-brand-green" 
                          : "bg-white border-transparent hover:bg-zinc-50"
                      )}
                    >
                      <div className="text-xs font-bold uppercase tracking-wide">{cat}</div>
                      <div className="text-[10px] text-zinc-400 mt-1">Daily legislative reporting</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto p-6 bg-zinc-50 border-2 border-dashed border-zinc-200 text-center rounded-sm">
                <div className="text-[8px] font-black tracking-[0.2em] text-zinc-300 mb-4 uppercase">Advertisement</div>
                <div className="text-sm font-serif font-bold text-zinc-600 mb-2">Upgrade to Insight Plus</div>
                <p className="text-[10px] text-zinc-400 leading-relaxed">Unlock deep investigative files & provincial white papers.</p>
                <button className="mt-4 px-4 py-2 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest w-full">Subscribe</button>
              </div>
            </aside>

            {/* Central Content - Features & Feed */}
            <div className="bg-white flex flex-col min-h-full">
              {/* Hero / Featured */}
              {!searchQuery && selectedCategory === 'All' && (
                <section className="p-8 md:p-12 border-b border-zinc-100">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="breaking-label">BREAKING ANALYSIS</div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black leading-[1.05] tracking-tight mb-8 cursor-pointer hover:text-zinc-700 transition-colors" onClick={() => setActivePost(featuredPost)}>
                      {featuredPost.title}
                    </h1>
                    <p className="text-lg text-zinc-600 mb-8 leading-relaxed font-medium">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="bg-zinc-50 p-6 border border-zinc-100 rounded-sm mb-10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-green mb-4">Key Intel</h4>
                      <ul className="space-y-2">
                        {featuredPost.keyTakeaways.map((take, i) => (
                          <li key={i} className="text-xs flex items-start gap-3 text-zinc-700">
                            <span className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                            {take}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="aspect-video bg-zinc-100 rounded-sm overflow-hidden mb-12 relative group cursor-pointer" onClick={() => setActivePost(featuredPost)}>
                      <img src={featuredPost.image.url} alt={featuredPost.image.alt} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 text-[10px] font-bold tracking-wide">
                        {featuredPost.image.caption}
                      </div>
                    </div>
                  </motion.div>
                </section>
              )}

              <section className="p-8 md:p-12 space-y-12">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">Latest Intelligence</h2>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 capitalize">
                    {format(new Date(), 'EEEE, do MMMM')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {filteredPosts.filter(p => p.id !== featuredPost.id || selectedCategory !== 'All').map((post) => (
                    <div key={post.id} onClick={() => setActivePost(post)} className="cursor-pointer group">
                      <div className="aspect-[16/10] bg-zinc-100 mb-6 overflow-hidden">
                        <img src={post.image.url} alt={post.image.alt} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">{post.category}</div>
                      <h3 className="text-xl font-serif font-bold mb-3 hover:text-zinc-600 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar - Trending & Info */}
            <aside className="hidden lg:flex flex-col gap-8 p-8 bg-zinc-50 h-full">
              <div>
                <h3 className="sidebar-heading">Trending Analysis</h3>
                <div className="space-y-6">
                  {posts.slice(0, 4).map((post, i) => (
                    <div key={post.id} className="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActivePost(post)}>
                      <div className="text-3xl font-serif font-black text-zinc-200 leading-none">0{i+1}</div>
                      <div>
                        <h4 className="text-xs font-bold leading-tight line-clamp-2">{post.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-200">
                <h3 className="sidebar-heading">Intelligence Briefing</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 border border-zinc-200 rounded-sm">
                    <div className="text-[10px] font-bold uppercase mb-2">Automated Refresh</div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">Systems are monitoring parliamentary sessions. Next report in {Math.floor(Math.random() * 8) + 1} hours.</p>
                  </div>
                  <div className="bg-white p-4 border border-zinc-200 rounded-sm">
                    <div className="text-[10px] font-bold uppercase mb-2">Editor's Note</div>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">Analysis strictly follows professional journalistic standards for the GNU era.</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                 <div className="flex items-center gap-2 p-4 bg-black text-white rounded-sm">
                    <Zap className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest">Live Updates</div>
                      <div className="text-[8px] opacity-70">Pulse Monitor Active</div>
                    </div>
                 </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <NewsIcon className="w-6 h-6" />
                <span className="text-xl font-serif font-bold">Political Pulse</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                The leading source for South African political intelligence. Independent. Automated. Objective.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Categories</h4>
              <nav className="flex flex-col gap-3">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors text-left">{cat}</button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">About Us</a>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Ethics Policy</a>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">AdSense Partner</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Daily Digest</h4>
              <p className="text-sm text-zinc-500 mb-4">Get the 12-hour political briefing directly to your inbox.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="email@provider.com" className="bg-zinc-100 border-none rounded-lg px-4 py-2 text-sm grow" />
                <button className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-zinc-100 gap-6">
            <p className="text-xs text-zinc-400">© 2026 Political Pulse. All rights reserved. Registered PII Protected.</p>
            <div className="flex gap-6">
              <Share2 className="w-4 h-4 text-zinc-400 hover:text-zinc-900 cursor-pointer" />
              <MessageSquare className="w-4 h-4 text-zinc-400 hover:text-zinc-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
      `}} />
    </div>
  );
}

function BlogDetail({ post, onClose }: { post: BlogPost, onClose: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = post.meta.title;
  }, [post]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="border-b border-zinc-100 bg-white/90 backdrop-blur sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-3 h-3" /> Back to Intelligence Feed
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><Share2 className="w-3 h-3" /></button>
            <button className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all">Share Analysis</button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <header className="mb-12">
          <div className="breaking-label">IN-DEPTH ANALYSIS</div>
          <h1 className="text-4xl md:text-6xl font-serif font-black leading-[1.05] mb-8 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-y border-zinc-100 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-6">
              <span>Author: {post.author}</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-brand-green">Validated</span>
              <ShieldCheck className="w-3 h-3 text-brand-green" />
            </div>
          </div>
        </header>

        <div className="aspect-video bg-zinc-100 rounded-sm overflow-hidden mb-12">
          <img src={post.image.url} alt={post.image.alt} className="w-full h-full object-cover grayscale-[20%]" />
        </div>

        <div className="bg-zinc-50 border-l-4 border-brand-green p-8 mb-16">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-brand-green">Strategic Takeaways</h3>
          <ul className="space-y-4">
            {post.keyTakeaways.map((item, i) => (
              <li key={i} className="text-sm font-bold leading-relaxed text-zinc-800 italic">
                &ldquo;{item}&rdquo;
              </li>
            ))}
          </ul>
        </div>

        <div className="markdown-body font-sans">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Links section */}
        <div className="mt-20 pt-10 border-t border-zinc-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="sidebar-heading">Internal Intelligence</h4>
              <ul className="space-y-3">
                {post.internalLinks.map((link, i) => (
                  <li key={i}>
                    <button className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-2">
                       {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="sidebar-heading">Validated Sources</h4>
              <ul className="space-y-3">
                {post.externalSources.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 italic">
                      {link.text} <ExternalLink className="w-2 h-2" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 p-10 bg-white border border-zinc-200 rounded-sm">
          <h3 className="text-xl font-serif font-black mb-10">Briefing FAQ</h3>
          <div className="space-y-8">
            {post.faq.map((item, i) => (
              <div key={i}>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2 flex gap-4">
                  {item.question}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-zinc-100 font-serif italic text-sm text-zinc-400">
          SEO Insight: {post.meta.description}
        </div>
      </article>
    </motion.div>
  );
}

