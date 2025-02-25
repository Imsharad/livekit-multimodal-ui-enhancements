import React from 'react';

interface CompanyLogoProps {
  className?: string;
}

/**
 * Placeholder company logo component
 * TODO: Replace with actual company logo when received from the team
 */
export function CompanyLogo({ className = '' }: CompanyLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Placeholder logo - replace with actual logo when available */}
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-xl">AI</span>
      </div>
    </div>
  );
}