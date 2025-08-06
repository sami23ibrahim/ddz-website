// Font loading utility for RH-Zak font
export const loadRHZakFont = () => {
  return new Promise((resolve, reject) => {
    if (document.fonts && document.fonts.load) {
      document.fonts.load('bold 1em RH-Zak').then(() => {
        resolve();
      }).catch(reject);
    } else {
      // Fallback for browsers that don't support Font Loading API
      setTimeout(resolve, 100);
    }
  });
};

export const isRHZakLoaded = () => {
  if (document.fonts && document.fonts.check) {
    return document.fonts.check('bold 1em RH-Zak');
  }
  return true; // Fallback
}; 