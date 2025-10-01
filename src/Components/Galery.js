import React, { useState } from "react";

const images = [
    "/Assets/tech.jpg",
    "/Assets/tech.jpg",
    "/Assets/tech.jpg",
    "/Assets/tech.jpg",
    "/Assets/tech.jpg",
];

const Galery = () => {
  const [position, setPosition] = useState(0);

  const prevSlide = () => {
    setPosition(prev => prev - 1);
  };

  const nextSlide = () => {
    setPosition(prev => prev + 1);
  };

  // Create enough copies to ensure smooth infinite scrolling
  const repeatedImages = [];
  for (let i = 0; i < 100; i++) {
    repeatedImages.push(...images);
  }

  // Start from the middle set of images, but at the first image of that set
  const startingPosition = Math.floor(repeatedImages.length / 2) - Math.floor(images.length / 2);
  const currentPosition = startingPosition + position;

  return (
    <div className="relative w-full h-[600px]">
      {/* Top 2/3 - Cream background */}
      <div className="absolute top-0 w-full h-1/2" style={{ backgroundColor: "#e8e2d4" }}></div>
      
      {/* Bottom 1/3 - Purple background */}
      <div className="absolute bottom-0 w-full h-1/2" style={{ backgroundColor: "#422f40" }}></div>
      
      {/* Content layer */}
      <div className="relative z-10 w-full h-full py-8">
        <div className="flex w-full h-full">
          {/* Left text area - 1/3 of screen */}
          <div className="w-1/3 flex flex-col justify-start pt-16 px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Gallery</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
            Where design meets comfort and a little bit of nostalgia.

Our space was designed by Studio Karhard, the Berlin architects behind iconic places like Halle am Berghain. The interior blends soft lighting, textured surfaces, and warm tones inspired by a motorcycle trip through the Himalayas;  earthy greens, dusty reds, and natural wood.
There are subtle references to Arabic and Indian aesthetics, a living olive tree in the center, and a calm, grounding atmosphere that makes the practice feel less clinical — and more like a place you can exhale.

            </p>
          </div>
          
          {/* Right carousel area - 2/3 of screen */}
          <div className="w-2/3 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(-${currentPosition * 450}px + 50% - 225px))`,
                  width: `${repeatedImages.length * 450}px`,
                }}
              >
                {repeatedImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 flex justify-center items-center"
                    style={{ width: "450px", height: "440px" }}
                  >
                    <img
                      src={img}
                      alt={`Dental treatment gallery image ${idx + 1}`}
                      className=" object-cover w-[380px] h-[420px]"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center items-center space-x-10 mt-8">
              <button
                onClick={prevSlide}
                className="text-6xl text-gray-400 hover:text-gray-200 transition"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="text-6xl text-gray-400 hover:text-gray-200 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galery;
