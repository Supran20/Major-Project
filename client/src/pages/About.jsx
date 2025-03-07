import { NavLink } from "react-router-dom";

export const About = () => {
  return (
    <>
      <main>
        <section className="section-hero py-16 bg-gray-100">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="hero-content space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                Why Choose Us?
              </h2>
              <section className="expertise-section grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="feature space-y-4 text-center">
                  <i className="icon fas fa-user-tie text-4xl text-blue-600"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Expertise
                  </h3>
                  <p className="text-gray-600">
                    Our team consists of experienced IT professionals who are
                    passionate about staying up-to-date with the latest industry
                    trends.
                  </p>
                </div>

                <div className="feature space-y-4 text-center">
                  <i className="icon fas fa-cogs text-4xl text-blue-600"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Customization
                  </h3>
                  <p className="text-gray-600">
                    We understand that every business is unique. That’s why we
                    create solutions tailored to your specific needs and goals.
                  </p>
                </div>

                <div className="feature space-y-4 text-center">
                  <i className="icon fas fa-headset text-4xl text-blue-600"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Customer-Centric Approach
                  </h3>
                  <p className="text-gray-600">
                    We prioritize your satisfaction and provide top-notch
                    support to address your IT concerns.
                  </p>
                </div>

                <div className="feature space-y-4 text-center">
                  <i className="icon fas fa-money-bill-wave text-4xl text-blue-600"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Affordability
                  </h3>
                  <p className="text-gray-600">
                    We offer competitive pricing without compromising on the
                    quality of our services.
                  </p>
                </div>

                <div className="feature space-y-4 text-center">
                  <i className="icon fas fa-shield-alt text-4xl text-blue-600"></i>
                  <h3 className="font-semibold text-xl text-gray-900">
                    Reliability
                  </h3>
                  <p className="text-gray-600">
                    Count on us to be there when you need us. We are committed
                    to ensuring your IT environment is reliable and available
                    24/7.
                  </p>
                </div>
              </section>

              <div className="btn btn-group flex justify-center md:justify-start space-x-4">
                <NavLink to="/contact">
                  <button className="button-container px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
                    Connect Now
                  </button>
                </NavLink>
                {/* <button className="btn secondary-btn bg-gray-300 text-gray-800 px-6 py-3 rounded-md">Learn More</button> */}
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.jpg"
                alt="coding buddies"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
