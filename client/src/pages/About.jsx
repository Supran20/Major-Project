import { NavLink } from "react-router-dom";
// import { Analytics } from "../components/Analytics";
// import { useAuth } from "../store/auth";

export const About = () => {
  // const { user } = useAuth();

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}

              <h1 class="heading-highlight">Why Choose Us?</h1>
              <section class="expertise-section">
                <div class="feature">
                  <i class="icon fas fa-user-tie"></i>
                  
                  <h3>Expertise</h3>
                  <p>
                    Our team consists of experienced IT professionals who are
                    passionate about staying up-to-date with the latest industry
                    trends.
                  </p>
                </div>

                <div class="feature">
                  <i class="icon fas fa-cogs"></i>
                  <h3>Customization</h3>
                  <p>
                    We understand that every business is unique. That’s why we
                    create solutions tailored to your specific needs and goals.
                  </p>
                </div>

                <div class="feature">
                  <i class="icon fas fa-headset"></i>
                  <h3>Customer-Centric Approach</h3>
                  <p>
                    We prioritize your satisfaction and provide top-notch
                    support to address your IT concerns.
                  </p>
                </div>

                <div class="feature">
                  <i class="icon fas fa-money-bill-wave"></i>
                  <h3>Affordability</h3>
                  <p>
                    We offer competitive pricing without compromising on the
                    quality of our services.
                  </p>
                </div>

                <div class="feature">
                  <i class="icon fas fa-shield-alt"></i>
                  <h3>Reliability</h3>
                  <p>
                    Count on us to be there when you need us. We are committed
                    to ensuring your IT environment is reliable and available
                    24/7.
                  </p>
                </div>
              </section>

              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="button-container"> Connect Now</button>
                </NavLink>
                {/* <button className="btn secondary-btn">learn more</button> */}
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.jpg"
                alt="coding buddies "
                width="700"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
