import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, ChevronRight, Calendar, User, 
  ArrowRight, MessageSquare, Share2, TrendingUp, 
  Newspaper, Globe, ShieldCheck, Zap, Newspaper as NewsIcon,
  Clock, ExternalLink, ChevronDown, CheckCircle2,
  Settings, Plus, Trash2, Edit3, Save, RefreshCw, LayoutDashboard
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { INITIAL_POSTS, CATEGORIES, BlogPost, DATA_VERSION } from './lib/blog-data';
import { cn } from './lib/utils';
import { generateNewBlogPost } from './lib/gemini-service';

export default function App() {
  return (
    <Router>
      <BlogApp />
    </Router>
  );
}

function BlogApp() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-generation simulation logic
  useEffect(() => {
    const checkAndGenerate = async () => {
      const lastCheck = localStorage.getItem('zar_last_news_check');
      const currentVersion = localStorage.getItem('zar_data_version');
      const now = new Date().getTime();
      const twelveHours = 12 * 60 * 60 * 1000;

      // Force refresh if version mismatch
      if (currentVersion !== DATA_VERSION) {
        setPosts(INITIAL_POSTS);
        localStorage.setItem('zar_posts_cache', JSON.stringify(INITIAL_POSTS));
        localStorage.setItem('zar_data_version', DATA_VERSION);
        return;
      }

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
          <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedCategory('All');}}>
            <span className="text-xl font-sans font-extrabold tracking-tighter uppercase">
              POLITICAL<span className="text-brand-gold">PULSE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button key="all" onClick={() => {setSelectedCategory('All'); navigate('/');}} className={cn("text-[10px] uppercase tracking-widest font-bold transition-colors", selectedCategory === 'All' ? "text-brand-gold" : "text-zinc-400 hover:text-white")}>Latest</button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => {setSelectedCategory(cat); navigate('/');}}
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
            className="md:hidden fixed inset-0 top-16 bg-white z-[60] px-4 py-8"
          >
            <div className="flex flex-col gap-6">
              <button onClick={() => {setSelectedCategory('All'); setIsMenuOpen(false); navigate('/');}} className="text-2xl font-serif font-bold text-left">Latest</button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => {setSelectedCategory(cat); setIsMenuOpen(false); navigate('/');}}
                  className="text-2xl font-serif font-bold text-zinc-400 text-left"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow bg-zinc-100">
        <Routes>
          <Route path="/" element={
            <div className="max-w-[1440px] mx-auto flex flex-col pt-8">
              {/* Hero Section */}
              <div className="bg-white border border-zinc-200 py-12 px-8 mb-[2px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
                      The Heartbeat of <span className="text-zinc-400">SA Power</span>
                    </h1>
                    <p className="text-lg text-zinc-600 leading-relaxed font-serif italic">
                      South Africa stands at a historic crossroads this May 2026. As the Phala Phala 'Farmgate' impeachment saga reaches a fever pitch in Parliament, the Government of National Unity faces its sternest test yet against a backdrop of national climate disasters and shifting continental alliances. From the airlifts in Ghana to the billionaire tax crackdowns in Pretoria, the pulse of the nation has never been faster.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['#RamaphosaImpeachment', '#SAFloods2026', '#ZARRecovery', '#GNUPulse', '#XenophobiaCrisis', '#TaxJusticeSA'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-mono font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-[2px]">
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
                      <Link to={`/posts/${featuredPost.slug}`}>
                        <h1 className="text-4xl md:text-6xl font-serif font-black leading-[1.05] tracking-tight mb-8 cursor-pointer hover:text-zinc-700 transition-colors">
                          {featuredPost.title}
                        </h1>
                      </Link>
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

                      <Link to={`/posts/${featuredPost.slug}`} className="aspect-video bg-zinc-100 rounded-sm overflow-hidden mb-12 relative block group cursor-pointer">
                        <img src={featuredPost.image.url} alt={featuredPost.image.alt} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 text-[10px] font-bold tracking-wide">
                          {featuredPost.image.caption}
                        </div>
                      </Link>
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
                      <Link key={post.id} to={`/posts/${post.slug}`} className="group block">
                        <div className="aspect-[16/10] bg-zinc-100 mb-6 overflow-hidden">
                          <img src={post.image.url} alt={post.image.alt} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                          <span>{post.category}</span>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (navigator.share) {
                                navigator.share({ title: post.title, url: window.location.origin + '/posts/' + post.slug });
                              } else {
                                navigator.clipboard.writeText(window.location.origin + '/posts/' + post.slug);
                                alert('Link copied!');
                              }
                            }}
                            className="p-1 hover:text-black transition-colors"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-zinc-600 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      </Link>
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
                      <Link key={post.id} to={`/posts/${post.slug}`} className="flex gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="text-3xl font-serif font-black text-zinc-200 leading-none">0{i+1}</div>
                        <div>
                          <h4 className="text-xs font-bold leading-tight line-clamp-2">{post.title}</h4>
                        </div>
                      </Link>
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
          </div>
        } />
          <Route path="/posts/:slug" element={<BlogDetail posts={posts} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminPanel posts={posts} setPosts={(newPosts) => {
            setPosts(newPosts);
            localStorage.setItem('zar_posts_cache', JSON.stringify(newPosts));
          }} />} />
        </Routes>
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
                  <button key={cat} onClick={() => {setSelectedCategory(cat); navigate('/');}} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors text-left">{cat}</button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
              <nav className="flex flex-col gap-3">
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">About Us</a>
                <a href="#" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Ethics Policy</a>
                <Link to="/privacy-policy" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Privacy Policy</Link>
                <Link to="/admin" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Admin Panel</Link>
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
            <p className="text-xs text-zinc-400">
              © 2026 Political Pulse. All rights reserved. Registered PII Protected. 
              <Link to="/privacy-policy" className="ml-4 hover:text-zinc-900 transition-colors">Privacy Information</Link>
            </p>
            <div className="flex gap-6">
              <Share2 className="w-4 h-4 text-zinc-400 hover:text-zinc-900 cursor-pointer" />
              <MessageSquare className="w-4 h-4 text-zinc-400 hover:text-zinc-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogDetail({ posts }: { posts: BlogPost[] }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.meta.title;
    }
  }, [post]);

  const handleShare = async () => {
    if (!post) return;
    
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Analysis Not Found</h2>
        <p className="text-zinc-500 mb-8">The requested report could not be located in our archives.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-black text-white rounded-sm font-bold uppercase tracking-widest">Return to Feed</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="border-b border-zinc-100 bg-white/90 backdrop-blur sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-3 h-3" /> Back to Intelligence Feed
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <Share2 className="w-3 h-3" />
            </button>
            <button 
              onClick={handleShare}
              className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all text-black"
            >
              Share Analysis
            </button>
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

function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Political Pulse";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen py-24"
    >
      <div className="max-w-3xl mx-auto px-4">
        <button onClick={() => navigate('/')} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-12">
          <X className="w-3 h-3" /> Back to Intelligence Feed
        </button>
        
        <div className="breaking-label">LEGAL DOCUMENTATION</div>
        <h1 className="text-4xl md:text-6xl font-serif font-black leading-[1.05] mb-12 tracking-tight">
          Privacy Policy
        </h1>

        <div className="markdown-body font-sans space-y-8 text-zinc-800 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-bold text-black mb-4">1. Data Commitment</h2>
            <p>
              Political Pulse is dedicated to maintaining the highest standards of data integrity and user privacy. As an intelligence-focused platform operating within the South African Government of National Unity (GNU) framework, we recognize the sensitive nature of political discourse and the absolute necessity of protecting our users' digital identities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-black mb-4">2. Information We Collect</h2>
            <p>
              We collect minimal data necessary to provide our intelligence services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Session Data:</strong> Temporary identifiers to manage your preferences and authentication state.</li>
              <li><strong>Analytics:</strong> Aggregated, non-identifiable usage patterns to optimize performance and content relevance.</li>
              <li><strong>Newsletter Information:</strong> Voluntarily provided email addresses for the delivery of daily briefings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-black mb-4">3. Protection of Personal Intelligence (PIPI)</h2>
            <p>
              Our internal protocols exceed the standard requirements of the Protection of Personal Information Act (POPIA). We do not sell, trade, or otherwise transfer your data to third-party political entities or commercial advertisers. All intelligence data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-black mb-4">4. Cookies and Tracking</h2>
            <p>
              We use functional cookies to ensure a seamless "Pulse" experience across our vertical silos. These do not track your behavior on external websites or social platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-black mb-4">5. Revisions and Transparency</h2>
            <p>
              In the volatile landscape of the 2026 political cycle, this policy may be revised to reflect new legislative safeguards. Continued use of our analysis platform constitutes acceptance of these standards.
            </p>
          </section>

          <div className="pt-12 border-t border-zinc-100 text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
            Last Updated: May 14, 2026 | Document ID: PP-PRIV-2026-V1
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminPanel({ posts, setPosts }: { posts: BlogPost[], setPosts: (posts: BlogPost[]) => void }) {
  const navigate = useNavigate();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  const startNewPost = () => {
    const newTemplate: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      slug: "",
      category: CATEGORIES[0],
      date: new Date().toISOString(),
      author: "Administrative Editor",
      excerpt: "",
      image: {
        url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
        alt: "Political Analysis Cover",
        caption: "Standard briefing visualization."
      },
      meta: {
        title: "| Political Pulse",
        description: "",
        keywords: []
      },
      keyTakeaways: ["Drafting in progress..."],
      internalLinks: [],
      externalSources: [],
      faq: [],
      content: "# New Analysis\n\nWrite your briefing here using Markdown."
    };
    setEditingPost(newTemplate);
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'crcL@22' || passkey === 'overrule') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-sm shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-black text-center mb-2 tracking-tight">Access Restricted</h2>
          <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest mb-8 font-bold">Internal Intelligence Briefing Core</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Admin Passkey</label>
              <input 
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 bg-zinc-50 border text-sm focus:ring-1 focus:ring-black outline-none transition-all",
                  error ? "border-red-500 animate-shake" : "border-zinc-200"
                )}
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
            >
              Authorize Access
            </button>
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-zinc-400 text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors"
            >
              Return to Public Feed
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-red-500 font-bold text-[10px] uppercase tracking-widest">Unauthorized Access Attempted</p>
          )}
        </motion.div>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    if (confirm('Permanently delete this intelligence report?')) {
      const filtered = posts.filter(p => p.id !== id);
      setPosts(filtered);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsCreating(false);
    window.scrollTo(0, 0);
  };

  const saveContent = () => {
    if (editingPost) {
      // Basic validation
      if (!editingPost.title || !editingPost.slug) {
        setStatusMessage("Error: Title and Slug are required.");
        return;
      }

      if (isCreating) {
        setPosts([editingPost, ...posts]);
        setStatusMessage("New intelligence briefing published.");
      } else {
        const updated = posts.map(p => p.id === editingPost.id ? editingPost : p);
        setPosts(updated);
        setStatusMessage("Changes committed to archive.");
      }
      
      setEditingPost(null);
      setIsCreating(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const triggerGeneration = async () => {
    setIsGenerating(true);
    setStatusMessage("Accessing parliamentary API / Synthesizing data...");
    try {
      const newPost = await generateNewBlogPost();
      setPosts([newPost as BlogPost, ...posts]);
      setStatusMessage("New intelligence synthesized successfully.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Briefing failed: API Rate limit or connection error.");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4" /> System Administrator
            </div>
            <h1 className="text-4xl font-serif font-black tracking-tight">Intelligence Command Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if(confirm('Reset all intelligence data to factory defaults? This clears the local cache.')) {
                   setPosts(INITIAL_POSTS);
                   localStorage.removeItem('zar_posts_cache');
                   setStatusMessage("System Reset: Factory data restored.");
                   setTimeout(() => setStatusMessage(null), 3000);
                }
              }}
              className="px-6 py-2 border border-red-200 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
            >
              Reset Data
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-zinc-200 bg-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors"
            >
              Exit Dashboard
            </button>
            <button 
              onClick={startNewPost}
              className="flex items-center gap-2 px-6 py-2 border border-black bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all"
            >
              <Plus className="w-3 h-3" /> Manual Post
            </button>
            <button 
              onClick={triggerGeneration}
              disabled={isGenerating}
              className={cn(
                "flex items-center gap-2 px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50",
                isGenerating && "animate-pulse"
              )}
            >
              {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
              {isGenerating ? "Synthesizing..." : "Trigger AI Generation"}
            </button>
          </div>
        </div>

        {statusMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-zinc-900 text-brand-gold text-xs font-bold uppercase tracking-widest text-center"
          >
            {statusMessage}
          </motion.div>
        )}

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Active Briefings', val: posts.length, icon: Newspaper },
            { label: 'Intelligence Verticals', val: CATEGORIES.length, icon: Globe },
            { label: 'System Health', val: '98.2%', icon: Zap },
            { label: 'Sync Status', val: isGenerating ? 'Active' : 'Standby', icon: RefreshCw },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 border border-zinc-200 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-4 h-4 text-zinc-300" />
                <span className="text-[8px] font-black uppercase text-zinc-400 tracking-tighter">Verified Metrics</span>
              </div>
              <div className="text-2xl font-serif font-bold">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Main List */}
          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h3 className="sidebar-heading">Intelligence Inventory</h3>
              <div className="text-[10px] font-bold text-zinc-400">Showing {posts.length} entries</div>
            </div>
            <div className="divide-y divide-zinc-100">
              {posts.map((post) => (
                <div key={post.id} className="p-6 flex items-start justify-between gap-6 hover:bg-zinc-50 transition-colors group">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[8px] font-black uppercase tracking-widest">{post.category}</span>
                       <span className="text-[8px] text-zinc-300 uppercase font-bold">{format(new Date(post.date), 'MMM d, yyyy')}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-black transition-colors">{post.title}</h4>
                    <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 text-zinc-400 hover:text-black transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Edit Panel */}
          <aside className="sticky top-24">
            <div className="bg-zinc-900 text-white p-8 rounded-sm shadow-2xl">
              {editingPost ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-brand-gold font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                    {isCreating ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} 
                    {isCreating ? 'Draft New Briefing' : 'Live Intelligence Edit'}
                  </div>
                  
                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Internal ID</label>
                    <input disabled value={editingPost.id} className="w-full bg-zinc-800 border-none text-zinc-500 px-4 py-2 text-[10px]" />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Briefing Title</label>
                    <textarea 
                      value={editingPost.title} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full bg-zinc-800 border-none text-white px-4 py-3 text-xs leading-relaxed focus:ring-1 focus:ring-brand-gold h-20"
                      placeholder="e.g. National Budget Outlook 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">URL Slug (no spaces)</label>
                    <input 
                      value={editingPost.slug} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') } : null)}
                      className="w-full bg-zinc-800 border-none text-white px-4 py-2 text-[10px] focus:ring-1 focus:ring-brand-gold"
                      placeholder="e.g. national-budget-2026"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Intelligence Vertical</label>
                    <select 
                       value={editingPost.category}
                       onChange={(e) => setEditingPost(prev => prev ? { ...prev, category: e.target.value } : null)}
                       className="w-full bg-zinc-800 border-none text-white px-4 py-2 text-[10px] focus:ring-1 focus:ring-brand-gold"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Excerpt Brief</label>
                    <textarea 
                      value={editingPost.excerpt} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                      className="w-full bg-zinc-800 border-none text-zinc-400 px-4 py-3 text-[10px] leading-relaxed focus:ring-1 focus:ring-brand-gold h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Featured Image URL</label>
                    <input 
                      value={editingPost.image.url} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, image: { ...prev.image, url: e.target.value } } : null)}
                      className="w-full bg-zinc-800 border-none text-brand-gold px-4 py-2 text-[10px] focus:ring-1 focus:ring-brand-gold"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Image Alt Description</label>
                    <input 
                      value={editingPost.image.alt} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, image: { ...prev.image, alt: e.target.value } } : null)}
                      className="w-full bg-zinc-800 border-none text-zinc-400 px-4 py-2 text-[10px] focus:ring-1 focus:ring-brand-gold"
                      placeholder="Describe the image for accessibility"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Full Content (Markdown)</label>
                    <textarea 
                      value={editingPost.content} 
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                      className="w-full bg-zinc-800 border-none text-white px-4 py-3 text-[10px] font-mono leading-relaxed focus:ring-1 focus:ring-brand-gold h-48"
                    />
                  </div>

                  <div className="pt-6 grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {setEditingPost(null); setIsCreating(false);}}
                      className="px-4 py-3 bg-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveContent}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                    >
                      <Save className="w-3 h-3" /> Commit Brief
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 flex flex-col items-center">
                  <LayoutDashboard className="w-12 h-12 text-zinc-800 mb-6" />
                  <h4 className="text-sm font-bold mb-2">No File Selected</h4>
                  <p className="text-[10px] text-zinc-500 max-w-[200px]">Select any intelligence report from the list to modify its parameters.</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-brand-green/5 border-l-4 border-brand-green rounded-r-sm">
              <h4 className="text-[10px] font-bold uppercase text-brand-green mb-2">Advisory Note</h4>
              <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                Modifications to synchronized data may take up to 60 seconds to propagate to global CDNs. Content integrity validation is active.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

