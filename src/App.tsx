import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Hammer, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
  Scissors,
  Settings,
  HardHat,
  CheckCircle,
  ArrowUp,
  Truck,
  Award,
  Users,
  Search
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Power Drill Pro X',
    category: 'Power Tools',
    price: '₹3,499',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Heavy Duty Angle Grinder',
    category: 'Power Tools',
    price: '₹2,899',
    image: 'https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?q=80&w=400&auto=format&fit=crop',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Professional Tool Kit (104 pcs)',
    category: 'Hand Tools',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Industrial Welding Machine',
    category: 'Welding Equipment',
    price: '₹12,500',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Precision Cutting Saw',
    category: 'Cutting Tools',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?q=80&w=400&auto=format&fit=crop',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Safety Helmet & Gear Set',
    category: 'Safety Equipment',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
  },
];

const categories = ['All', 'Power Tools', 'Hand Tools', 'Welding Equipment', 'Cutting Tools', 'Safety Equipment'];

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: 'High-Quality Tools',
    description: 'We source only the best industrial-grade equipment for maximum durability.',
  },
  {
    icon: <Star className="w-8 h-8 text-blue-500" />,
    title: 'Affordable Pricing',
    description: 'Competitive prices without compromising on the quality of our products.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: 'Expert Guidance',
    description: 'Our knowledgeable staff is always ready to help you find the right tool.',
  },
  {
    icon: <Settings className="w-8 h-8 text-blue-500" />,
    title: 'Wide Product Range',
    description: 'From simple hand tools to heavy industrial machinery, we have it all.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Ravi Kumar',
    rating: 5,
    text: '"Best place to buy industrial tools. Good quality and reasonable price. The staff really knows their stuff and helped me pick the right drill for my workshop."',
  },
  {
    id: 2,
    name: 'Ankit Sharma',
    rating: 4,
    text: '"Wide range of tools available. Staff is helpful and knowledgeable. I was able to find replacement parts for my old grinder that I couldn\'t find anywhere else."',
  },
  {
    id: 3,
    name: 'Imran Ali',
    rating: 5,
    text: '"Very reliable shop for heavy machinery tools. Highly recommended! Delivery was prompt and the equipment was exactly as described. Will buy again."',
  },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200' 
            : 'bg-gradient-to-b from-slate-900/90 to-slate-900/0 py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('top')}>
            <div className="bg-blue-500 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Arham Tools Center
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Products', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-semibold transition-colors relative group ${
                  isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              Get a Quote
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-slate-800/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 right-0 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-4">
                {['Home', 'About', 'Products', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-slate-800 font-semibold py-3 border-b border-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 text-white px-5 py-4 rounded-xl font-bold w-full mt-4 shadow-lg shadow-blue-500/30"
                >
                  Get a Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1920&auto=format&fit=crop" 
            alt="Industrial Tools Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-400 text-sm font-semibold mb-8 border border-white/10 shadow-xl">
                <Star className="w-4 h-4 fill-blue-400" />
                <span>4.5 Rating (150+ Reviews)</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                Best Industrial Tools <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  in Delhi
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
                Your trusted supplier for high-quality power tools, hand tools, and heavy machinery in Okhla Industrial Area. Built for professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Explore Products
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>

            {/* Hero Quick Stats - Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform">
                <Truck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-1">Fast Delivery</h3>
                <p className="text-slate-300 text-sm">Across Delhi NCR</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl transform translate-y-8 hover:translate-y-6 transition-transform">
                <Award className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-1">Premium Brands</h3>
                <p className="text-slate-300 text-sm">100% Genuine Tools</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform">
                <Users className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-1">Expert Support</h3>
                <p className="text-slate-300 text-sm">Technical guidance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl transform translate-y-8 hover:translate-y-6 transition-transform">
                <ShieldCheck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-1">Secure Warranty</h3>
                <p className="text-slate-300 text-sm">On all power tools</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1540104539488-92a51bbc0410?q=80&w=800&auto=format&fit=crop" 
                  alt="Industrial Tools" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] transform transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center gap-5">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Trusted by</p>
                      <p className="text-3xl font-extrabold text-slate-900">100+ Brands</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div>
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">
                  <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
                  About Us
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Reliable Hardware & <br/>Industrial Equipment
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Arham Tools Center is a trusted supplier of industrial tools and hardware equipment located in Okhla Industrial Area, New Delhi. 
                </p>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  We provide high-quality tools for construction, manufacturing, and home improvement needs. Our goal is to deliver durable and reliable products at competitive prices, backed by expert guidance.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Zap className="w-6 h-6" />, title: 'Power Tools', desc: 'Drilling machines, grinders' },
                    { icon: <Hammer className="w-6 h-6" />, title: 'Hand Tools', desc: 'Hammers, spanners, screwdrivers' },
                    { icon: <Scissors className="w-6 h-6" />, title: 'Cutting Tools', desc: 'Precision saws and blades' },
                    { icon: <HardHat className="w-6 h-6" />, title: 'Safety Gear', desc: 'Gloves, helmets, goggles' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="mt-1 bg-blue-50 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 p-3 rounded-xl text-blue-600 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-0.5 bg-blue-500 rounded-full"></span>
              Why Choose Us
              <span className="w-8 h-0.5 bg-blue-500 rounded-full"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Built for Professionals</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">We are committed to providing the best tools and services to our customers, ensuring your projects are completed efficiently.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1} className="h-full">
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300 h-full group hover:-translate-y-2 shadow-xl">
                  <div className="mb-6 bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
              Our Inventory
              <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">Featured Products</h3>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                      {product.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
                      {product.rating}
                    </div>
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/40 backdrop-blur-[2px]">
                      <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Search className="w-4 h-4" /> Quick View
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h4>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                      <span className="text-2xl font-extrabold text-blue-600">{product.price}</span>
                      <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No products found in this category.</p>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-500/30 group">
              Download Full Catalog <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-slate-100 opacity-50 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
              Testimonials
              <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">What Our Customers Say</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1} className="h-full">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative h-full flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="text-blue-500 mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-8 leading-relaxed flex-grow text-lg">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" /> Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <div>
                <div className="inline-flex items-center gap-2 text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">
                  <span className="w-8 h-0.5 bg-blue-500 rounded-full"></span>
                  Contact Us
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Let's Build Together</h2>
                <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                  Looking for specific tools or need a bulk quotation? Contact us today and our expert team will get back to you promptly with the best prices.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Our Location</h4>
                      <p className="text-slate-400 leading-relaxed">Okhla Industrial Area Phase 1,<br />New Delhi, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Phone Number</h4>
                      <p className="text-slate-400 leading-relaxed">+91 9012345678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Email Address</h4>
                      <p className="text-slate-400 leading-relaxed">arhamtools@email.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group">
                    <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Business Hours</h4>
                      <p className="text-slate-400 leading-relaxed">9:00 AM – 7:00 PM (Mon–Sat)<br />Sunday Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl p-8 md:p-10 text-slate-900 shadow-2xl relative overflow-hidden">
                {/* Success Overlay */}
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-600">Thank you for reaching out. Our team will contact you shortly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className="text-3xl font-extrabold mb-8">Send us a Message</h3>
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message / Requirements</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Tell us what tools you are looking for..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-white">Arham Tools Center</span>
              </div>
              <p className="text-base leading-relaxed max-w-md mb-6">
                Your reliable partner for industrial tools, power equipment, and safety gear in New Delhi. We build relationships on trust and quality.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                    <span className="sr-only">Social Link {i}</span>
                    <div className="w-4 h-4 bg-current rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-blue-500 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-blue-500 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4" /> About Us</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-blue-500 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Products</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-blue-500 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-3">
                <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Power Tools</li>
                <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Hand Tools</li>
                <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Welding Equipment</li>
                <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Cutting Tools</li>
                <li className="hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-2"><ChevronRight className="w-4 h-4" /> Safety Gear</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Arham Tools Center. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Shipping Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => scrollToSection('top')}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
