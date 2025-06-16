"use client"

import Link from "next/link"

export default function ToolsPage() {
  const tools = [
    {
      id: "data-breach-calculator",
      title: "Data Breach Calculator",
      description: "Evaluate the severity of personal data breaches and determine your notification obligations under GDPR.",
      status: "available",
      link: "/calculator",
      frameworks: ["GDPR"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "incident-reporting",
      title: "Incident Reporting Tool",
      description: "Streamline incident reporting and manage data breaches in compliance with major frameworks.",
      status: "coming-soon",
      link: "/coming-soon",
      frameworks: ["GDPR", "NIS 2", "DORA"],
      additionalInfo: "Other major frameworks if any.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: "compliance-checker",
      title: "Compliance Checker",
      description: "Verify your compliance status across multiple regulatory frameworks with AI-powered assessments.",
      status: "coming-soon",
      link: "/coming-soon",
      frameworks: ["GDPR", "EU AI ACT", "DORA", "NIS"],
      additionalInfo: "Other major frameworks if any.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "policy-contract-generators",
      title: "Policy Contract Generators",
      description: "Generate compliant privacy policies, data processing agreements, and records of processing.",
      status: "coming-soon",
      link: "/coming-soon",
      frameworks: ["Privacy Policy", "Data processing agreement (DPA)", "Record of processing agreement (RPA)", "Company File (EU AI ACT)"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: "integrated-risk-management",
      title: "Integrated Risk Management",
      description: "Comprehensive risk assessment and management across major regulatory frameworks.",
      status: "coming-soon",
      link: "/coming-soon",
      frameworks: ["GDPR", "ISO 27001"],
      additionalInfo: "Other major frameworks if any.",
      additional: "* as discussed, the set of laws under development",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

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
              href="/calculator"
              className="hidden md:block text-sm uppercase tracking-[0.2em] text-gray-700 hover:text-black transition-colors font-medium"
            >
              Calculator
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">COMPLIANCE TOOLS</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light italic mb-8 tracking-tight">AI-Powered Solutions</h2>
            <div className="w-32 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-light text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Transform your compliance management with our suite of intelligent tools designed for European regulations.
              From GDPR compliance to risk management, we've got you covered.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tools.map((tool) => (
              <article key={tool.id} className="border-4 border-black bg-white hover:shadow-lg transition-shadow">
                <Link href={tool.link} className="block p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-black flex items-center justify-center text-white">
                      {tool.icon}
                    </div>
                    {tool.status === "available" ? (
                      <span className="bg-green-100 text-green-800 text-xs font-black uppercase tracking-[0.1em] px-3 py-1 border-2 border-green-800">
                        Available
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 text-xs font-black uppercase tracking-[0.1em] px-3 py-1 border-2 border-gray-400">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black mb-3 uppercase tracking-[0.05em]">{tool.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed font-light">{tool.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-[0.1em] font-black text-gray-500">
                      Select framework:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tool.frameworks.map((framework) => (
                        <span key={framework} className="text-xs bg-gray-100 px-2 py-1 border border-gray-300">
                          {framework}
                        </span>
                      ))}
                    </div>
                    {tool.additionalInfo && (
                      <p className="text-xs text-gray-500 italic mt-2">{tool.additionalInfo}</p>
                    )}
                    {tool.additional && (
                      <p className="text-xs text-gray-500 italic">{tool.additional}</p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-center text-black font-medium text-sm uppercase tracking-[0.1em]">
                    <span>{tool.status === "available" ? "Use Tool" : "Learn More"}</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-12 py-12 md:py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-[0.1em]">Need Custom Solutions?</h2>
          <p className="text-lg md:text-xl font-light text-gray-300 mb-8 leading-relaxed">
            Our team of compliance experts can help you build tailored solutions for your specific regulatory needs.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-white text-black px-8 py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors"
          >
            Schedule Consultation
            <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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