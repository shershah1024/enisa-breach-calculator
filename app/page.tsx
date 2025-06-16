"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import UserTypeModal from "./components/UserTypeModal"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    setIsFormOpen(false)
    setFormData({ name: '', company: '', phone: '', email: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const hasVisited = localStorage.getItem('userTypeSelected')
    if (!hasVisited) {
      setIsUserTypeModalOpen(true)
    }
  }, [])

  const handleUserTypeSelection = (userType: 'client' | 'compliance') => {
    localStorage.setItem('userTypeSelected', 'true')
    setIsUserTypeModalOpen(false)
    
    if (userType === 'compliance') {
      window.location.href = 'https://intgen.ai'
    }
  }

  return (
    <div className="relative">
      <main className={`min-h-screen bg-white ${isUserTypeModalOpen ? 'blur-sm' : ''}`}>
      {/* Navigation */}
      <nav className="relative">
        <div className="flex justify-between items-center px-4 md:px-12 py-6 md:py-8 border-b-4 border-black">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-2xl md:text-4xl font-black">INTGEN</div>
            <div className="text-2xl md:text-4xl font-light">AI</div>
            <div className="ml-2 md:ml-4 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-600 leading-tight">
              Compliance
              <br />
              Excellence
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="/tools"
              className="text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium border-b-2 border-transparent hover:border-black pb-1"
            >
              Compliance Tools
            </Link>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-black text-white px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors"
            >
              Schedule Consultation
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b-4 border-black">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium border-b-2 border-transparent hover:border-black pb-1"
              >
                Compliance Tools
              </Link>
              <button 
                onClick={() => {
                  setIsFormOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors text-center"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8 space-y-8 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-1 h-12 md:h-16 bg-black"></div>
                  <div>
                    <div className="text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] text-black font-medium">
                      🤖 AI-Powered Compliance Solutions
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-black leading-[0.85] tracking-tight">
                  EUROPEAN
                  <br />
                  COMPLIANCE
                  <br />
                  <span className="font-light italic">Made Strategic</span>
                </h1>

                <div className="flex items-center space-x-4 md:space-x-8">
                  <div className="w-16 md:w-24 h-0.5 bg-black"></div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
                    The Future of Regulatory Excellence
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                  <div className="text-base md:text-lg leading-relaxed text-gray-800 font-light">
                    Navigate GDPR, DORA, and cybersecurity regulations with AI-powered precision. Our intelligent
                    platform combines expert knowledge with advanced technology to transform compliance from a burden
                    into a competitive advantage.
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/calculator"
                      className="group inline-flex items-center text-black font-medium text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border-b-2 border-black pb-2 hover:border-gray-400 transition-colors"
                    >
                      <span>Data Breach Calculator</span>
                      <svg
                        className="ml-3 md:ml-4 w-3 md:w-4 h-3 md:h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <button 
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center text-gray-600 font-medium text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] border-b-2 border-gray-300 pb-2 hover:text-black hover:border-black transition-colors"
                    >
                      <svg className="mr-3 md:mr-4 w-3 md:w-4 h-3 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Schedule Consultation
                    </button>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="border-l-4 border-black pl-4 md:pl-6">
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mb-2">Key Insight</div>
                    <div className="text-lg md:text-2xl font-light italic text-gray-800 leading-tight">
                      "Compliance shouldn't slow down your business—it should accelerate it."
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-black mb-1">80%</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-600">Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-black mb-1">24/7</div>
                      <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-600">Expert Access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-black text-white p-6 md:p-8">
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-300 mb-4">Latest Numbers</div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="text-xl md:text-2xl font-black mb-1">up to 80%</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-300">Compliance Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black mb-1">&lt; 72hrs</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-300">Breach Response Time</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black mb-1">100%</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-300">Regulatory Coverage</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black p-6 md:p-8">
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mb-4">
                  What Your Business Can Achieve
                </div>
                <div className="text-base md:text-lg font-light text-gray-800 leading-relaxed">
                  Transform your compliance approach from reactive to strategic. Our AI-powered platform ensures you
                  stay ahead of regulatory changes while optimizing operational efficiency.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-4 md:px-12 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 tracking-tight">HOW INTGEN</h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light italic mb-6 md:mb-8 tracking-tight">Transforms Compliance</h2>
            <div className="w-24 md:w-32 h-0.5 bg-black mx-auto mb-6 md:mb-8"></div>
            <p className="text-lg md:text-xl font-light text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
              Our AI-powered strategic approach ensures you meet regulatory requirements while maintaining operational
              efficiency through intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            <article className="bg-white border-4 border-black p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-black flex items-center justify-center mr-3 md:mr-4">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="w-1 h-10 md:h-12 bg-black"></div>
              </div>
              <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-[0.05em] md:tracking-[0.1em]">European Regulatory Expertise</h3>
              <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                Deep knowledge of GDPR, DORA, NIS2, and emerging EU regulations. Our intelligent system continuously
                updates with regulatory changes and expert interpretations.
              </p>
            </article>

            <article className="bg-white border-4 border-black p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-black flex items-center justify-center mr-3 md:mr-4">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="w-1 h-10 md:h-12 bg-black"></div>
              </div>
              <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-[0.05em] md:tracking-[0.1em]">Strategic Implementation</h3>
              <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                Transform compliance from a cost center to a strategic advantage. Our platform analyzes your business
                operations to recommend optimal compliance strategies that integrate seamlessly.
              </p>
            </article>

            <article className="bg-white border-4 border-black p-6 md:p-8 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-black flex items-center justify-center mr-3 md:mr-4">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="w-1 h-10 md:h-12 bg-black"></div>
              </div>
              <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-[0.05em] md:tracking-[0.1em]">Intelligent Expert Matching</h3>
              <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                Access to vetted compliance professionals matched to your specific needs and industry. Our intelligent
                matching ensures you get the right expertise at the right time.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 md:px-12 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div>
              <div className="mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 tracking-tight">COMPREHENSIVE</h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light italic tracking-tight">Compliance Solutions</h2>
                <div className="w-20 md:w-24 h-0.5 bg-black mt-6 md:mt-8"></div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <article className="border-l-4 border-black pl-6 md:pl-8">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-6 md:w-8 h-6 md:h-8 bg-black flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 md:w-4 h-3 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-black mb-2 uppercase tracking-[0.05em] md:tracking-[0.1em]">GDPR Compliance Audits</h3>
                      <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                        Comprehensive privacy assessments and data protection strategies tailored to your business
                        model.
                      </p>
                    </div>
                  </div>
                </article>

                <article className="border-l-4 border-black pl-6 md:pl-8">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-6 md:w-8 h-6 md:h-8 bg-black flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 md:w-4 h-3 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-black mb-2 uppercase tracking-[0.05em] md:tracking-[0.1em]">DORA Readiness</h3>
                      <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                        Digital Operational Resilience Act preparation for financial services and critical
                        infrastructure.
                      </p>
                    </div>
                  </div>
                </article>

                <article className="border-l-4 border-black pl-6 md:pl-8">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-6 md:w-8 h-6 md:h-8 bg-black flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 md:w-4 h-3 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-black mb-2 uppercase tracking-[0.05em] md:tracking-[0.1em]">Incident Response Planning</h3>
                      <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base">
                        Proactive breach response strategies and crisis management protocols for regulatory compliance.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className="bg-black text-white p-6 md:p-8 lg:p-12">
              <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 uppercase tracking-[0.05em] md:tracking-[0.1em]">Ready to Get Started?</h3>
              <div className="w-12 md:w-16 h-0.5 bg-white mb-6 md:mb-8"></div>
              <p className="text-gray-300 mb-8 md:mb-12 leading-relaxed font-light text-base md:text-lg">
                Schedule a confidential consultation with our compliance experts. We'll assess your current position and
                provide a clear roadmap to regulatory excellence.
              </p>
              <div className="space-y-4 md:space-y-6">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-white text-black px-6 md:px-8 py-3 md:py-4 font-black text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-gray-100 transition-colors"
                >
                  Schedule Expert Consultation
                </button>
                <Link
                  href="/calculator"
                  className="w-full inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-medium text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                >
                  Try Data Breach Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em]">Schedule Consultation</h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 border-2 border-black text-black px-4 py-3 text-sm font-black uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white px-4 py-3 text-sm font-black uppercase tracking-[0.1em] hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-4 md:px-12 py-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-black">INTGEN</div>
            <div className="text-lg font-light">AI</div>
            <div className="ml-2 text-[10px] uppercase tracking-[0.2em] text-gray-600">
              Compliance Excellence
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>© 2025 INTGEN.AI. All rights reserved.</span>
            <span>•</span>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
      </main>

      <UserTypeModal 
        isOpen={isUserTypeModalOpen} 
        onUserTypeSelect={handleUserTypeSelection} 
      />

      {/* Consultation Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.1em]">Schedule Consultation</h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 border-2 border-black text-black px-4 py-3 text-sm font-black uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white px-4 py-3 text-sm font-black uppercase tracking-[0.1em] hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
