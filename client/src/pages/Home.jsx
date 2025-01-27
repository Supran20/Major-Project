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

                  {/* <a href="/card" className="virtual-try-on">
                    Virtual Try-On
                  </a> */}
                  <a href="/card" class="shop-now">
                    Shop Now
                  </a>
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

                  {/* <a href="/card" className="virtual-try-on">
                    Virtual Try-On
                  </a> */}
                  <a href="/card" class="shop-now">
                    Shop Now
                  </a>
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

                  {/* <a href="/card" className="virtual-try-on">
                    Virtual Try-On
                  </a> */}
                  <a href="/card" class="shop-now">
                    Shop Now
                  </a>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        {/* Main Content */}
        <section className="section-hero">
          <div className="container grid bg-gray">
            <section className="py-16">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {/* <p
                    style={{
                      textDecoration: "underline",
                      color: "#4169E1",
                      fontWeight: "600",
                      marginBottom: "15px",
                      marginTop:"20px",
                      textAlign:"left",
                      
                    }}
                  >
                    Premium Eyewear Collection
                  </p> */}
                  <h1 className="text-4xl font-bold text-gray-900 ">
                    Find Your Perfect Frame
                  </h1>
                  <div className="grid grid-two-cols">
                    <div className="description">
                      <p className="text-gray-600 text-lg mb-50">
                        Explore our curated collection of designer eyewear,
                        featuring the latest trends and timeless classics. From
                        sophisticated optical frames to stylish sunglasses, we
                        offer premium quality eyewear for every style and
                        preference.
                      </p>

                      <a href="/book-appointment" className="try-on ">
                          Try-on
                        </a>
                    </div>

                    <div>
                      <img src="/images/cat_eye_sunglasses.jpg" alt="eyewear" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-1 md:order-2">
                  <div grid grid-two-cols></div>

                  <div className="grid grid-two-cols">
                    <div className="vintage-round">
                      <img src="/images/vintage_round_glasses.jpg" />
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold text-gray-900 ">
                        Our Services for Customers
                      </h1>
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
                      {/* </div> */}
                      {/* <div className="buttons-container"> */}
                      <div className="grid grid-two-cols">
                        <a href="/book-appointment" className="virtual-try-on ">
                          Appointment
                        </a>
                        <a href="/Contact" className="virtual-try-on">
                          Contact
                        </a>
                      </div>
                    </div>
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
