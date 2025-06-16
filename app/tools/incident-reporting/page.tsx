"use client"

import Link from "next/link"
import { useState } from "react"

export default function IncidentReportingPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative">
        <div className="flex justify-between items-center px-4 md:px-12 py-6 md:py-8 border-b-4 border-black">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4">
            <div className="text-2xl md:text-4xl font-black">INTGEN</div>
            <div className="text-2xl md:text-4xl font-light">AI</div>
            <div className="ml-2 md:ml-4 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-600 leading-tight">
              Compliance
              <br />
              Excellence
            </div>
          </Link>
          
          <div className="flex items-center space-x-4 md:space-x-12">
            <Link
              href="/tools"
              className="text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium"
            >
              All Tools
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block bg-gray-100 text-gray-600 text-xs font-black uppercase tracking-[0.1em] px-4 py-2 border-2 border-gray-400">
                  Coming Soon
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                  INCIDENT
                  <br />
                  REPORTING
                  <br />
                  <span className="font-light italic">Tool</span>
                </h1>
                
                <div className="w-24 h-0.5 bg-black"></div>
                
                <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
                  Streamline your incident reporting process with our AI-powered tool. Ensure compliance with GDPR's 72-hour 
                  notification requirement and manage data breaches effectively across multiple regulatory frameworks.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.1em]">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Automated incident classification and severity assessment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">72-hour notification timeline tracking and alerts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Multi-framework compliance (GDPR, NIS 2, DORA)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Automated regulatory authority notification templates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Comprehensive incident response documentation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              {/* Framework Coverage */}
              <div className="border-4 border-black p-8">
                <h3 className="text-lg font-black mb-6 uppercase tracking-[0.1em]">Framework Coverage</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-black pl-4">
                    <h4 className="font-black text-sm uppercase tracking-[0.05em] mb-1">GDPR</h4>
                    <p className="text-sm text-gray-600">General Data Protection Regulation compliance</p>
                  </div>
                  <div className="border-l-4 border-black pl-4">
                    <h4 className="font-black text-sm uppercase tracking-[0.05em] mb-1">NIS 2</h4>
                    <p className="text-sm text-gray-600">Network and Information Security Directive</p>
                  </div>
                  <div className="border-l-4 border-black pl-4">
                    <h4 className="font-black text-sm uppercase tracking-[0.05em] mb-1">DORA</h4>
                    <p className="text-sm text-gray-600">Digital Operational Resilience Act</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="text-sm text-gray-500 italic">Other major frameworks coming soon</p>
                  </div>
                </div>
              </div>

              {/* Email Signup */}
              <div className="bg-black text-white p-8">
                <h3 className="text-xl font-black mb-4 uppercase tracking-[0.1em]">Get Early Access</h3>
                <p className="text-gray-300 mb-6 font-light">
                  Be the first to know when our Incident Reporting Tool launches.
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white text-black px-4 py-3 text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-black px-6 py-3 font-black text-sm uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors"
                    >
                      Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-400 font-black">Thank you!</p>
                    <p className="text-gray-300 text-sm mt-2">We'll notify you when the tool is ready.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="px-4 md:px-12 py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-[0.1em]">Why Automated Incident Reporting?</h2>
          <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="text-center">
              <div className="text-4xl font-black mb-3">72h</div>
              <p className="text-sm uppercase tracking-[0.1em] font-black text-gray-600 mb-2">GDPR Deadline</p>
              <p className="text-sm text-gray-600">Mandatory notification window for data breaches</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-3">€20M</div>
              <p className="text-sm uppercase tracking-[0.1em] font-black text-gray-600 mb-2">Max GDPR Fine</p>
              <p className="text-sm text-gray-600">Or 4% of global annual revenue</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-3">24/7</div>
              <p className="text-sm uppercase tracking-[0.1em] font-black text-gray-600 mb-2">AI Monitoring</p>
              <p className="text-sm text-gray-600">Continuous incident detection and response</p>
            </div>
          </div>
        </div>
      </section>

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
  )
}