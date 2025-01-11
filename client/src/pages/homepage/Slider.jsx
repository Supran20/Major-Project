import React from 'react';

function Slider() {
  return (
    <div className="relative w-full">
      <div className="flex overflow-x-auto scroll-snap-x mandatory snap-mandatory">
        <img src="/src/assets/images/Frame 427320915.png" alt="Slide 1" className="w-full snap-start" />
        <img src="/src/assets/images/Frame 427320916.png" alt="Slide 2" className="w-full snap-start" />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <a href="#slide-1" className="w-2 h-2 bg-white rounded-full opacity-75 hover:opacity-100"></a>
        <a href="#slide-2" className="w-2 h-2 bg-white rounded-full opacity-75 hover:opacity-100"></a>
      </div>
    </div>
  );
}

export default Slider;

