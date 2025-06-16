"use client"

import Link from "next/link"
import { useState } from "react"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual email submission
    setIsSubmitted(true)
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
              href="/"
              className="text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium"
            >
              Tools
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">COMING SOON</h1>
            <div className="w-32 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl font-light text-gray-700 mb-8 leading-relaxed">
              We're working hard to bring you the most advanced compliance tools. 
              Be the first to know when they launch.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-black uppercase tracking-[0.1em] text-gray-700 mb-3">
                    Join the Waitlist
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 border-4 border-black focus:outline-none focus:border-gray-600 text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
                >
                  Notify Me When Available
                </button>
              </form>
            ) : (
              <div className="text-center p-8 border-4 border-green-500 bg-green-50">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-[0.1em] text-green-800 mb-2">
                  You're on the list!
                </h3>
                <p className="text-green-700 font-light">
                  We'll notify you as soon as this tool becomes available.
                </p>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.1em] mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm font-light">
                Advanced AI algorithms for accurate compliance assessments
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.1em] mb-2">Secure</h3>
              <p className="text-gray-600 text-sm font-light">
                Enterprise-grade security for your sensitive compliance data
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.1em] mb-2">Real-time</h3>
              <p className="text-gray-600 text-sm font-light">
                Get instant results and updates on regulatory changes
              </p>
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