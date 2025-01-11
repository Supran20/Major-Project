import React from 'react';

function MidSection() {
  return (
    <div className="flex justify-between items-center bg-[#FAEFEE] px-4 py-8">
      <img src="/src/assets/images/spec.PNG" alt="Spec" className="w-1/3" />
      <div className="text-[#010034] flex flex-col items-center space-y-4">
        <div className="text-lg font-light">The More, The Better!</div>
        <div className="text-2xl font-semibold">BUY 1 GET 1 FREE</div>
        <div className="text-sm">Starting at $59 with Anti-Glare Lenses</div>
        <button className="bg-[#010034] text-white px-6 py-2 rounded-lg">Shop Now</button>
      </div>
      <img src="/src/assets/images/person.PNG" alt="Person" className="w-1/3" />
    </div>
  );
}

export default MidSection;

