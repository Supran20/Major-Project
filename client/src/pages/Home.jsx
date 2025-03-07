import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  return (
    <main>
      {/* Carousel Section */}
      <section className="relative w-full">
        <Carousel fade>
          {[
            "/images/carousel3.jpg",
            "/images/corousel5.jpg",
            "/images/corousel4.jpg",
            "/images/UNSPLASH-1.jpeg",
          ].map((src, index) => (
            <Carousel.Item key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px] object-cover"
              />
              <Carousel.Caption className="absolute bottom-12 left-10 text-white text-left">
                <div className="space-y-4">
                  <h1 className="text-5xl font-extrabold tracking-wide uppercase">
                    Shades That Speak Your Style
                  </h1>
                  <p className="text-lg font-light text-gray-200">
                    Your Vision, Your Style, Our Craft.
                  </p>
                  <a
                    href="/card"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg uppercase font-semibold tracking-wide shadow-md hover:bg-blue-700 transition"
                  >
                    Shop Now
                  </a>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide">
              Find Your Perfect Frame
            </h1>
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              Explore our curated collection of designer eyewear, featuring the
              latest trends and timeless classics. From sophisticated optical
              frames to stylish sunglasses, we offer premium quality eyewear for
              every style and preference.
            </p>
            <a
              href="/book-appointment"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg uppercase font-semibold tracking-wide shadow-md hover:bg-blue-700 transition"
            >
              Try-On
            </a>
          </div>

          <div>
            <img
              src="/images/round_metal_sunglasses.jpg"
              alt="Eyewear"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 order-1 md:order-2">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide">
              Our Commitment to You
            </h1>
            <ul className="space-y-4 text-lg text-gray-700 font-light">
              <li>✓ Free eye examination with every purchase</li>
              <li>✓ Handpicked luxury and designer frames</li>
              <li>✓ Personalized fitting services</li>
              <li>✓ 30-day hassle-free return policy</li>
              <li>✓ Insurance & warranty coverage</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <a
                href="/book-appointment"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg uppercase font-semibold tracking-wide shadow-md hover:bg-blue-700 transition"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg uppercase font-semibold tracking-wide shadow-md hover:bg-gray-800 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <img
              src="/images/Rayban_violet_gun.jpg"
              alt="Luxury eyewear"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
