import React from 'react';
import Image from 'next/image';

interface CompanyLogoProps {
  className?: string;
}

/**
 * CompanyLogo component that displays the company logo
 * Currently using a placeholder that should be replaced with the actual logo
 * when received from the team
 */
const CompanyLogo: React.FC<CompanyLogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <Image
        src="/images/placeholder-logo.svg"
        alt="Company Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default CompanyLogo;