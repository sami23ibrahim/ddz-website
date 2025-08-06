import { useState, useEffect } from 'react';

export const useFontLoader = (fontFamily, isArabic) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!isArabic) {
      setFontLoaded(true);
      return;
    }

    const loadFont = async () => {
      try {
        // Check if font is already loaded
        if (document.fonts && document.fonts.check) {
          const isLoaded = document.fonts.check(`bold 1em ${fontFamily}`);
          if (isLoaded) {
            setFontLoaded(true);
            return;
          }
        }

        // Load the font
        if (document.fonts && document.fonts.load) {
          await document.fonts.load(`bold 1em ${fontFamily}`);
        }

        // Force a small delay to ensure font is applied
        setTimeout(() => {
          setFontLoaded(true);
        }, 100);
      } catch (error) {
        console.error('Font loading error:', error);
        setFontLoaded(true); // Fallback to default font
      }
    };

    loadFont();
  }, [fontFamily, isArabic]);

  return fontLoaded;
}; 