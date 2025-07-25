import React, { useState, useEffect, useRef } from 'react';

const LightweightGallery = ({ 
  items = [], 
  textColor = "#422f40", 
  borderRadius = "5%",
  scrollSpeed = 2 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Default items if none provided
  const defaultItems = [
    { image: `https://picsum.photos/seed/1/800/600`, text: "Bridge" },
    { image: `https://picsum.photos/seed/2/800/600`, text: "Desk Setup" },
    { image: `https://picsum.photos/seed/3/800/600`, text: "Waterfall" },
    { image: `https://picsum.photos/seed/4/800/600`, text: "Strawberries" },
    { image: `https://picsum.photos/seed/5/800/600`, text: "Deep Diving" },
    { image: `https://picsum.photos/seed/16/800/600`, text: "Train Track" },
  ];

  const galleryItems = items.length > 0 ? items : defaultItems;

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Mouse/Touch event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * scrollSpeed;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel event handler
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const scrollAmount = 300 * delta;
    containerRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ minHeight: '600px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {isVisible && (
        <div className="flex gap-6 p-4 h-full items-center">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
              style={{ 
                width: '400px', 
                height: '300px',
                borderRadius: borderRadius
              }}
            >
              <div className="relative w-full h-full group">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  style={{ borderRadius: borderRadius }}
                  loading="lazy"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg"
                  style={{ 
                    borderBottomLeftRadius: borderRadius,
                    borderBottomRightRadius: borderRadius
                  }}
                >
                  <h3 className="text-lg font-bold">{item.text}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LightweightGallery; 