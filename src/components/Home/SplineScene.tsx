import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export function SplineScene() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    // Disable scroll events on the canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'none';
    }
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden">
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
      
      {error ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-white text-center px-4 z-10"
        >
          <div>
            <p className="text-xl mb-4">Unable to load 3D scene</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Try again
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
          <Spline 
            scene="https://prod.spline.design/XDXLRz8yMEYMFWye/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{ 
              width: '100%', 
              height: '100%',
              transform: 'scale(1)',
              transformOrigin: 'center center',
              position: 'absolute'
            }}
          />
        </div>
      )}
    </div>
  );
}