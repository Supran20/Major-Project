import React from 'react';

function NewYorkSection() {
  return (
    <div className="flex mt-0">
      <img src="/src/assets/images/girl1.PNG" alt="Girl 1" className="w-1/3" />
      <div className="bg-[#FBF9F7] text-[#010034] flex flex-col items-center justify-center w-1/3 py-8">
        <div className="text-lg font-light">As Seen At </div>
        <div className="text-lg font-light">New York Fashion Week</div>
        <button className="bg-[#010034] text-white px-6 py-2 rounded-lg mt-4">
          Shop Now
        </button>
      </div>
      <img src="/src/assets/images/girl2.PNG" alt="Girl 2" className="w-1/3" />
      
    </div>
  );
}

export default NewYorkSection;

