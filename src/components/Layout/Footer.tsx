import React from 'react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full py-4 text-center text-white/80 bg-transparent backdrop-blur-sm z-10">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Coder Solutions MSFG GmbH. All rights reserved.</p>
      </div>
    </footer>
  );
}