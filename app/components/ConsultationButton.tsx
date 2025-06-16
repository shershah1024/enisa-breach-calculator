'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ConsultationButtonProps {
  className?: string;
  compact?: boolean;
}

const ConsultationButton: React.FC<ConsultationButtonProps> = ({ className = '', compact = false }) => {
  const handleClick = () => {
    // Check if we're on the homepage
    if (window.location.pathname === '/') {
      // Scroll to the consultation form
      const consultationForm = document.getElementById('consultation-form');
      if (consultationForm) {
        consultationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // Navigate to homepage and then scroll
      window.location.href = '/#consultation-form';
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors ${className}`}
        title="Schedule a consultation with our compliance experts"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Need Help?</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-3 px-6 py-3 bg-black text-white text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors ${className}`}
    >
      <MessageSquare className="w-5 h-5" />
      <span>Schedule Expert Consultation</span>
    </button>
  );
};

export default ConsultationButton;