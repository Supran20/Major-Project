//   <div className="mt-12">
//           <h3 className="text-xl font-bold mb-4">You May Also Like</h3>
//           <div className="grid grid-cols-4 gap-4">
//             <div className="p-4 bg-white shadow">
//               <img
//                 src="src/assets/images/glass4.png"
//                 alt="Related Product"
//                 className="w-full h-auto mb-2"
//               />
//               <p className="text-center text-sm">Aviator Classic</p>
//             </div>
//             <div className="p-4 bg-white shadow">
//               <img
//                 src="src/assets/images/glass1.png"
//                 alt="Related Product"
//                 className="w-full h-auto mb-2"
//               />
//               <p className="text-center text-sm">Outdoorsman</p>
//             </div>
//             <div className="p-4 bg-white shadow">
//               <img
//                 src="src/assets/images/glass5.png"
//                 alt="Related Product"
//                 className="w-full h-auto mb-2"
//               />
//               <p className="text-center text-sm">Shooter</p>
//             </div>
//             <div className="p-4 bg-white shadow">
//               <img
//                 src="src/assets/images/glass6.png"
//                 alt="Related Product"
//                 className="w-full h-auto mb-2"
//               />
//               <p className="text-center text-sm">Aviator Gradient</p>
//             </div>
//           </div>
//         </div>

// import React, { useState } from 'react';

// const Carousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const images = [
//     '/docs/images/carousel/carousel-1.svg',
//     '/docs/images/carousel/carousel-2.svg',
//     '/docs/images/carousel/carousel-3.svg',
//     '/docs/images/carousel/carousel-4.svg',
//     '/docs/images/carousel/carousel-5.svg',
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
//   };

//   return (
//     <div id="default-carousel" className="relative w-full" data-carousel="slide">
//       {/* Carousel wrapper */}
//       <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`${
//               index === currentSlide ? 'block' : 'hidden'
//             } duration-700 ease-in-out`}
//             data-carousel-item
//           >
//             <img
//               src={image}
//               className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//               alt={`carousel item ${index + 1}`}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Slider indicators */}
//       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             type="button"
//             className={`w-3 h-3 rounded-full ${
//               currentSlide === index ? 'bg-white' : 'bg-gray-300'
//             }`}
//             aria-current={currentSlide === index ? 'true' : 'false'}
//             aria-label={`Slide ${index + 1}`}
//             onClick={() => setCurrentSlide(index)}
//             data-carousel-slide-to={index}
//           ></button>
//         ))}
//       </div>

//       {/* Slider controls */}
//       <button
//         type="button"
//         className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         onClick={prevSlide}
//         data-carousel-prev
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg
//             className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 1 1 5l4 4"
//             />
//           </svg>
//           <span className="sr-only">Previous</span>
//         </span>
//       </button>
//       <button
//         type="button"
//         className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//         onClick={nextSlide}
//         data-carousel-next
//       >
//         <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//           <svg
//             className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 6 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m1 9 4-4-4-4"
//             />
//           </svg>
//           <span className="sr-only">Next</span>
//         </span>
//       </button>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState } from "react";

const relatedProducts = [
  { id: 1, name: "Aviator Classic", image: "src/assets/images/glass4.png" },
  { id: 2, name: "Outdoorsman", image: "src/assets/images/glass1.png" },
  { id: 3, name: "Shooter", image: "src/assets/images/glass5.png" },
  { id: 4, name: "Aviator Gradient", image: "src/assets/images/glass6.png" },
  { id: 5, name: "Sporty Vision", image: "src/assets/images/glass7.png" },
  { id: 6, name: "Polarized Shades", image: "src/assets/images/glass8.png" },
  { id: 7, name: "Vintage Glasses", image: "src/assets/images/glass9.png" },
  { id: 8, name: "Classic Round", image: "src/assets/images/glass10.png" },
  // Add more products as needed
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % Math.ceil(relatedProducts.length / 6)
    ); // Adjust based on items per slide
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + Math.ceil(relatedProducts.length / 6)) %
        Math.ceil(relatedProducts.length / 6)
    ); // Adjust based on items per slide
  };

  // Split the products into groups of 6 for each slide
  const productsPerSlide = 4;
  const productSlides = Array.from(
    { length: Math.ceil(relatedProducts.length / productsPerSlide) },
    (_, index) =>
      relatedProducts.slice(
        index * productsPerSlide,
        (index + 1) * productsPerSlide
      )
  );

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Dynamically Render Related Products in Carousel */}
        {productSlides.map((products, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? "block" : "hidden"
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto mb-2 rounded-md object-cover"
                  />
                  <p className="text-center text-sm">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 -bottom-6 left-1/2 space-x-3 rtl:space-x-reverse">
        {productSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-300"
            }`}
            aria-current={currentSlide === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 -start-14 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 -end-14 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
