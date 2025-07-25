// Performance monitoring utilities
export const performanceMonitor = {
  // Track component load times
  trackComponentLoad: (componentName) => {
    const startTime = performance.now();
    return () => {
      const loadTime = performance.now() - startTime;
      console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      
      // Log warning if component takes too long
      if (loadTime > 100) {
        console.warn(`⚠️ ${componentName} took ${loadTime.toFixed(2)}ms to load - consider optimization`);
      }
    };
  },

  // Track scroll performance
  trackScrollPerformance: () => {
    let lastScrollTime = 0;
    let scrollCount = 0;
    
    const handleScroll = () => {
      const now = performance.now();
      scrollCount++;
      
      if (now - lastScrollTime > 1000) {
        console.log(`Scroll events per second: ${scrollCount}`);
        scrollCount = 0;
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },

  // Check for memory leaks
  checkMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
      
      console.log(`Memory usage: ${usedMB}MB / ${totalMB}MB`);
      
      if (usedMB > 100) {
        console.warn('⚠️ High memory usage detected');
      }
    }
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Auto-start performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  // Check memory usage every 30 seconds
  setInterval(() => {
    performanceMonitor.checkMemoryUsage();
  }, 30000);
  
  // Start scroll performance tracking
  performanceMonitor.trackScrollPerformance();
} 