import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <main>
        {/* Carousel Section with Centered Text */}
        <section className="section-hero">
          <Carousel fade>
            <Carousel.Item>
              <img
                src="/images/FREEPICK-3.avif" // Add a valid image path here
                alt="First slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption className="carousel-caption">
                <div className="hero-content">
                  <h1>Shades That Speak Your Style.</h1>
                  <p>Your Style, Your Vision, Our Craft</p>
                  <div className="hero-buttons">
                    <a href="#shop" className="btn">Shop Now</a>
                    <a href="#virtual-try-on" className="btn">Virtual Try On</a>
                    {/* <a href="#contact-us" className="btn">Contact Us</a> */}
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                src="/images/FREEPICK-1.jpg" // Add a valid image path here
                alt="Second slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption className="carousel-caption">
                <div className="hero-content">
                  <h1>Shades That Speak Your Style.</h1>
                  <p>Your Style, Your Vision, Our Craft</p>
                  <div className="hero-buttons">
                    <a href="#shop" className="btn">Shop Now</a>
                    <a href="#virtual-try-on" className="btn">Virtual Try On</a>
                    {/* <a href="#contact-us" className="btn">Contact Us</a> */}
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                src="/images/UNSPLASH-1.jpeg" // Add a valid image path here
                alt="Third slide"
                width="100%"
                height="500"
              />
              <Carousel.Caption className="carousel-caption">
                <div className="hero-content">
                  <h1>Shades That Speak Your Style.</h1>
                  <p>Your Style, Your Vision, Our Craft</p>
                  <div className="hero-buttons">
                    <a href="#shop" className="btn">Shop Now</a>
                    <a href="#virtual-try-on" className="btn">Virtual Try On</a>
                    {/* <a href="#contact-us" className="btn">Contact Us</a> */}
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Main Content */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <section className="py-16">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-gray-600 font-semibold">
                    Premium Eyewear Collection
                  </p>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Find Your Perfect Frame
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Explore our curated collection of designer eyewear,
                    featuring the latest trends and timeless classics. From
                    sophisticated optical frames to stylish sunglasses, we offer
                    premium quality eyewear for every style and preference.
                  </p>
                  {/* <div className="button-container">
                    <a href="/card">
                      <button className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors !important">
                        Shop Now
                      </button>
                    </a>
                    <a href="/virtual-try-on">
                      <button className="border-2 border-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors !important">
                        Virtual Try-On
                      </button>
                    </a>
                  </div> */}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-1 md:order-2">
                  <p className="text-gray-600 font-bold">Why Choose Us?</p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Expert Eye Care Services
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      ✓ Free eye examination with every purchase
                    </p>
                    <p className="text-gray-600">
                      ✓ Wide selection of designer frames
                    </p>
                    <p className="text-gray-600">
                      ✓ Professional fitting services
                    </p>
                    <p className="text-gray-600">
                      ✓ 30-day satisfaction guarantee
                    </p>
                    <p className="text-gray-600">✓ Insurance accepted</p>
                  </div>
                  <div className="button-container">
                    <a href="/book-appointment">
                      <button className="bg-gray-600 text-white px-8 py-7 rounded-md hover:bg-gray-700 transition-colors mr-4">
                        Book Appointment
                      </button>
                    </a>
                    <a href="/Contact">
                      <button className="border-2 border-gray-600 text-white-600 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};
