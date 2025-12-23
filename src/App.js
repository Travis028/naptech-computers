import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Monitor, Users, BookOpen, Wifi, Coffee, Clock, MapPin, Phone, Mail, Star, Award, CheckCircle, Zap, Code, Trophy, TrendingUp } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollData, setEnrollData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'basic-computer'
  });
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const modalRef = useRef(null);

  const services = [
    { icon: Monitor, title: 'Computer Training', desc: 'Professional 3-month Basic Computer course - KSh 4,500 only!' },
    { icon: Wifi, title: 'WiFi Browsing', desc: 'High-speed internet access for all your browsing needs' },
    { icon: Code, title: 'Typing Services', desc: 'Professional document typing and formatting' },
    { icon: Users, title: 'Student Section', desc: 'Special rates and quiet study environment for students' },
    { icon: Award, title: 'Certification', desc: 'Get certified upon course completion' },
    { icon: Coffee, title: 'Comfortable Space', desc: 'Air-conditioned facility with refreshments' }
  ];

  const wifiPricing = [
    { time: '30 Minutes', price: 'KSh 30', icon: Clock },
    { time: '1 Hour', price: 'KSh 50', icon: Clock, popular: true },
    { time: '2 Hours', price: 'KSh 90', icon: Clock },
    { time: '5 Hours', price: 'KSh 200', icon: Zap },
    { time: 'Full Day', price: 'KSh 350', icon: TrendingUp, popular: true },
    { time: 'Weekly Pass', price: 'KSh 1,500', icon: Trophy }
  ];

  const courseModules = [
    'Computer Basics & Hardware',
    'Windows Operating System',
    'Microsoft Word (Document Creation)',
    'Microsoft Excel (Spreadsheets)',
    'Microsoft PowerPoint (Presentations)',
    'Internet & Email Usage',
    'Typing Skills Development',
    'CV Writing & Formatting',
    'Social Media Basics',
    'Computer Maintenance',
    'File Management',
    'Practical Hands-on Projects',
    'Cybersecurity Essentials',
    'Data Analysis and Visualization'
  ];

  const testimonials = [
    { name: 'John Kamau', rating: 5, text: 'Best computer training in Nairobi! The instructors are patient and knowledgeable.' },
    { name: 'Mary Achieng', rating: 5, text: 'Completed my course in 3 months. Now I can confidently use computers at work!' },
    { name: 'Peter Mwangi', rating: 5, text: 'Fast WiFi and affordable prices. I come here daily for my online work.' },
    { name: 'Grace Njeri', rating: 4, text: 'Great learning environment. The KSh 4,500 course is worth every shilling!' }
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrollChange = (e) => {
    setEnrollData({ ...enrollData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const validateForm = (data) => {
    return data.name.trim() && data.email.trim() && data.phone?.trim();
  };

  const handleEnrollSubmit = () => {
    if (!validateForm(enrollData)) {
      alert('Please fill in all required fields');
      return;
    }
    alert(`Thank you ${enrollData.name}! We'll contact you at ${enrollData.phone} to confirm your enrollment.`);
    setShowEnrollForm(false);
    setEnrollData({ name: '', email: '', phone: '', course: 'basic-computer' });
  };

  const handleContactSubmit = () => {
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Thank you ${contactData.name}! We'll respond to your message soon.`);
    setContactData({ name: '', email: '', message: '' });
  };

  const handleRatingSubmit = () => {
    if (rating > 0) {
      alert(`Thank you for your ${rating}-star rating!`);
      setRating(0);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showEnrollForm) {
        setShowEnrollForm(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showEnrollForm]);

  useEffect(() => {
    if (showEnrollForm && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showEnrollForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-indigo-950/95 backdrop-blur-sm shadow-lg z-50 border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Monitor className="w-6 h-6 text-indigo-950" />
              </div>
              <div>
                <span className="text-2xl font-bold text-yellow-400">NAPTECH</span>
                <div className="text-xs text-gray-300">Computers</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {['Home', 'Services', 'WiFi', 'Training', 'Enroll', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-yellow-400 transition-colors font-medium ${
                    activeSection === item.toLowerCase() ? 'text-yellow-400' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-950 border-t border-indigo-800">
            {['Home', 'Services', 'WiFi', 'Training', 'Enroll', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 hover:bg-indigo-900 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full mb-6 border border-yellow-500/30">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold">Trusted Computer Training Center</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              NAPTECH COMPUTER TRAINING CENTER
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto">
            Learn Computer Skills in Just 3 Months
          </p>
          <p className="text-3xl font-bold text-yellow-400 mb-8">
            Only KSh 4,500 for Complete Basic Computer Course!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowEnrollForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105 text-indigo-950"
            >
              Enroll Now - Save Your Spot!
            </button>
            <button 
              onClick={() => scrollToSection('wifi')}
              className="bg-indigo-800 border-2 border-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all"
            >
              WiFi Browsing Rates
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
            <div className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-700">
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm text-gray-300">Students Trained</div>
            </div>
            <div className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-700">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <div className="text-sm text-gray-300">Job Ready</div>
            </div>
            <div className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-700">
              <div className="text-3xl font-bold text-yellow-400">4.8★</div>
              <div className="text-sm text-gray-300">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl border border-indigo-700 hover:border-yellow-400 transition-all hover:shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105"
              >
                <service.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WiFi Browsing Section */}
      <section id="wifi" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Wifi className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">High-Speed WiFi Browsing</h2>
            <p className="text-xl text-gray-300">Super-fast internet for all your browsing needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wifiPricing.map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-400 shadow-lg shadow-yellow-500/30'
                    : 'bg-indigo-900/50 border-indigo-700 hover:border-yellow-400'
                }`}
              >
                {plan.popular && (
                  <div className="text-yellow-400 font-bold text-sm mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    POPULAR
                  </div>
                )}
                <plan.icon className="w-10 h-10 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold mb-2 text-yellow-400">{plan.price}</div>
                <div className="text-gray-300 text-lg">{plan.time}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-700">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">WiFi Features:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Ultra-fast fiber connection', 'Unlimited bandwidth', 'Secure connection', 'All devices supported', 'Technical support available', '24/7 availability'].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Course Section */}
      <section id="training" className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <BookOpen className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Basic Computer Course</h2>
            <p className="text-2xl font-bold text-white mb-2">Complete Training Package</p>
            <p className="text-5xl font-bold text-yellow-400 mb-4">KSh 4,500</p>
            <p className="text-xl text-gray-300">3 Months • Certification Included • Flexible Schedule</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-xl border border-indigo-700">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Our Programs Include:</h3>
              <div className="grid gap-3">
                {courseModules.map((module, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">{module}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our experienced instructors use a hands-on approach to teaching, ensuring that students not only learn theoretical concepts but also gain practical experience. We offer flexible scheduling options, including evening and weekend classes, to accommodate busy lifestyles.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-6 rounded-xl border-2 border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Course Benefits:</h3>
                <ul className="space-y-3">
                  {[
                    'One-time payment of KSh 4,500',
                    'No hidden fees',
                    'Qualified instructors',
                    'Hands-on practical training',
                    'Certificate upon completion',
                    'Job placement assistance',
                    'Lifetime support',
                    'Flexible class schedules'
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 fill-current" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-700">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Class Schedule:</h3>
                <div className="space-y-2 text-gray-300">
                  <p>📅 Monday - Friday: 8AM - 6PM</p>
                  <p>📅 Sunday: 9AM - 4PM</p>
                  <p>⏰ Morning & Evening batches available</p>
                  <p>👥 Small class sizes (Max 15 students)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-300 mb-6">
              Join us at NAPTECH Computer Training Center and take the first step towards enhancing your computer skills and advancing your career. Enroll today and unlock your potential.
            </p>
            <button 
              onClick={() => setShowEnrollForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-4 rounded-lg font-bold text-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105 text-indigo-950"
            >
              Enroll in Basic Computer Course
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials & Ratings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">What Our Students Say</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl border border-indigo-700">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-yellow-400">- {testimonial.name}</p>
              </div>
            ))}
          </div>

          {/* Rate Us Section */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-8 rounded-xl border-2 border-yellow-400">
            <h3 className="text-2xl font-bold text-center mb-4 text-yellow-400">Rate Your Experience</h3>
            <p className="text-center text-gray-300 mb-6">Help us improve by sharing your feedback</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={handleRatingSubmit}
                disabled={rating === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  rating > 0
                    ? 'bg-yellow-500 text-indigo-950 hover:bg-yellow-400'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div 
            ref={modalRef}
            tabIndex={-1}
            className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-2xl border-2 border-yellow-400 max-w-md w-full"
            role="dialog"
            aria-labelledby="enroll-title"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 id="enroll-title" className="text-2xl font-bold text-yellow-400">Enroll Now</h3>
              <button 
                onClick={() => setShowEnrollForm(false)}
                aria-label="Close enrollment form"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={enrollData.name}
                  onChange={handleEnrollChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={enrollData.email}
                  onChange={handleEnrollChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={enrollData.phone}
                  onChange={handleEnrollChange}
                  placeholder="0712 345 678"
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Course *</label>
                <select
                  name="course"
                  value={enrollData.course}
                  onChange={handleEnrollChange}
                  className="w-full px-4 py-3 bg-indigo-950 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                >
                  <option value="basic-computer">Basic Computer Course - KSh 4,500</option>
                  <option value="advanced">Advanced Computer Course</option>
                  <option value="typing">Professional Typing Course</option>
                </select>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-sm text-yellow-400 font-semibold mb-2">📌 Selected Course:</p>
                <p className="text-white">Basic Computer Course</p>
                <p className="text-2xl font-bold text-yellow-400 mt-2">KSh 4,500</p>
                <p className="text-sm text-gray-300">3 Months • Certificate Included</p>
              </div>

              <button
                onClick={handleEnrollSubmit}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all text-indigo-950"
              >
                Submit Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Visit Naptech Computers</h2>
          
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border-2 border-yellow-400">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-yellow-400">Location</h3>
                    <p className="text-gray-300">Rongo, Migori<br />Next to Koluoch</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-yellow-400">Operating Hours</h3>
                    <p className="text-gray-300">Mon-Fri: 7AM - 8PM<br />Sunday: 9AM - 5PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-yellow-400">Call Us</h3>
                    <p className="text-gray-300">+254 258 247 29<br />+254 269 368 75</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-yellow-400">Email</h3>
                    <p className="text-gray-300">naptechcomputers80@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-950/50 p-6 rounded-lg border border-indigo-700">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Send Us a Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-indigo-900 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-indigo-900 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  />
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-indigo-900 border border-indigo-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  ></textarea>
                  <button 
                    onClick={handleContactSubmit}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 py-3 rounded-lg font-bold hover:shadow-lg transition-all text-indigo-950"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enroll Section */}
      <section id="enroll" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-yellow-400">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-300 mb-8">Join hundreds of students who have transformed their careers with our computer training</p>
          <button 
            onClick={() => setShowEnrollForm(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-4 rounded-lg font-bold text-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105 text-indigo-950"
          >
            Enroll Today - KSh 4,500
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 py-8 px-4 border-t-2 border-yellow-400">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Monitor className="w-6 h-6 text-indigo-950" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-yellow-400">NAPTECH</span>
              <div className="text-xs text-gray-300">Computers</div>
            </div>
          </div>
          <p className="text-gray-300 mb-4">Empowering Kenya through Computer Education</p>
          <p className="text-sm text-gray-400">© 2024 Naptech Computers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}