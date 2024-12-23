import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isTransparent?: boolean;
}

export function Logo({ isTransparent = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <img 
          src="/skull-globe-logo.svg" 
          alt="Coder Solutions MSFG Logo" 
          className={`w-full h-full object-contain transition-opacity ${
            isTransparent ? 'opacity-90' : 'opacity-100'
          }`}
        />
      </div>
      <div className="flex flex-col">
        <span className={`text-xl font-bold hidden sm:inline transition-colors ${
          isTransparent ? 'text-white' : 'text-gray-900'
        }`}>
          Coder Solutions MSFG
        </span>
      </div>
    </Link>
  );
}