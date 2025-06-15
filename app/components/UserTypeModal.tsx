"use client"

interface UserTypeModalProps {
  isOpen: boolean
  onUserTypeSelect: (userType: 'client' | 'compliance') => void
}

export default function UserTypeModal({ isOpen, onUserTypeSelect }: UserTypeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-8 md:p-12 max-w-lg w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.1em] mb-4">
            Welcome to INTGEN AI
          </h2>
          <div className="w-16 h-0.5 bg-black mx-auto mb-6"></div>
          <p className="text-gray-700 leading-relaxed font-light text-base md:text-lg">
            To provide you with the most relevant experience, please tell us which best describes you:
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onUserTypeSelect('client')}
            className="w-full bg-black text-white p-6 text-left hover:bg-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-black uppercase tracking-[0.1em] mb-2">
                  Client / Business Owner
                </div>
                <div className="text-sm text-gray-300 font-light">
                  Looking for compliance solutions for your business
                </div>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          
          <button
            onClick={() => onUserTypeSelect('compliance')}
            className="w-full border-4 border-black text-black p-6 text-left hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-black uppercase tracking-[0.1em] mb-2">
                  Compliance Professional
                </div>
                <div className="text-sm text-gray-600 font-light">
                  Join our network of expert consultants
                </div>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}