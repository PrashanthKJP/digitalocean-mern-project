import React from "react";
import Prashanth from "../images/Prashanth.jpeg";
import vinayaka from "../images/vinayaka.jpeg";
import { Helmet } from "react-helmet";

function Services() {
  let message = `
  Welcome to our exclusive Fancy Number service! We understand the importance of having a professional and attractive identity, which is why we offer a wide range of unique and eye-catching mobile numbers that you can maintain permanently. Our collection includes daily fresh numbers that we can provide to you based on your specific requirements.

  Here's what we offer:
  
  💫Numerology Numbers: Discover numbers aligned with numerological significance.
  
  💫Doubling Numbers: Get numbers that involve doubling patterns.
  
  💫Semimirror Numbers: Explore numbers with interesting semimirror patterns.
  
  💫143 or 420 Numbers: Choose between affectionate 143 or intriguing 420 numbers.
  
  💫Raising or Falling Numbers: Opt for 
  
  💫ascending (12345) or descending (54321) sequences.
  
  💫Special Symbolic Numbers: Embrace 786, 108, or 1008 for their special cultural significance.
  
  💫Date of Birth Numbers: Personalize with your birthdate for a unique touch.
  
  💫Sequel Numbers: Perfect for couples, friends, or colleagues to showcase connection.
  Benefits of our Fancy Numbers:
  
  💥 Memorable for Clients: Numbers that are easy to remember and share with your customers.
  
  💥 Aesthetic Appeal: Enhance your banners, posters, and business cards with an attractive look.
  
  💥 Royal Identity: Stand out and convey a sense of royalty with a fancy number.
  
  💥 Professionalism: Maintain a single standard official number for a professional image.
  
  Why Choose Us:
  
  💥 Diverse Selection: We offer a plethora of variety numbers to suit your preferences.
  
  💥 Competitive Pricing: Enjoy the lowest cost in the market for these exclusive numbers.
  
  💥 Swift Responses: Experience quick and responsive customer service.
  
  💥 Convenience: We offer door delivery for your convenience.
  
  Elevate your identity with our unique and attention-grabbing mobile numbers. Get in touch with us today to choose the perfect number that resonates with you and your brand. Your professional and attractive identity awaits!
  
  We're delighted to provide you with more details about our
  
  Welcome to Permanent VIP Fancy Mobile Numbers, where exclusivity meets connectivity. Our mission is to provide discerning individuals with the perfect blend of style and functionality through our curated collection of premium mobile numbers.

  At Permanent VIP Fancy Mobile Numbers, we understand that your mobile number is more than just a string of digits – it's an extension of your identity, a statement of sophistication. That's why we handpick each number in our collection, ensuring that they exude prestige and uniqueness.
  
  Whether you're a business professional looking to make a lasting impression, an entrepreneur seeking a memorable brand identity, or an individual who simply appreciates the finer things in life, we have the perfect number for you. From elegant combinations to lucky sequences, our diverse range caters to every taste and preference.
  
  With our seamless online platform, finding your ideal mobile number is effortless. Browse through our meticulously curated selection, filter by criteria such as digits, patterns, or themes, and discover the number that resonates with you. Plus, our user-friendly interface makes the purchasing process smooth and hassle-free.
  
  Experience the epitome of luxury and convenience with Permanent VIP Fancy Mobile Numbers. Elevate your communication style and make a lasting impression with a number that truly reflects your personality. Because when it comes to mobile numbers, why settle for ordinary when you can be extraordinary?
  
  Established in 2014, Permnent VIP Fancy Number continues to thrive with unwavering efficiency and dedication, serving as the ultimate destination for all mobile number solutions.

With immense pride, we announce that over the span of 8 years, we have catered to the needs of more than 100,000 customers nationwide, with the number steadily increasing. Our Permanent VIP Fancy numbers offer seamless roaming and portability across all states in India.

Our extensive clientele includes esteemed VIPs who have entrusted us with providing them with unique and eye-catching numbers, serving as a testament to our success and accomplishments.

In today's competitive landscape, having a memorable contact number is crucial for elevating business stature and potential. It's no wonder that many prominent companies opt for fancy numbers that are easy to recall.

At Lifetime Number, our operations are driven by a team of young, talented, and passionate professionals, setting us apart with our dynamic approach. We are committed to ensuring 100% consumer satisfaction and delivering top-notch service to our valued customers.
  `;
  return (
    <>
      <section style={{ marginBottom: "5vw" }}>
        <Helmet>
          <title>Permanent VIP Fancy Numbers Services</title>
          <meta
            name="description"
            content="Empower your business leaders with Life Time Fancy Numbers for People. Elevate the professional image of your company holders with personalized mobile identities that reflect authority and distinction. Each fancy number tells a story of corporate excellence, enhancing communication and leaving a lasting impression. Explore our premium collection and provide your company leaders with a unique digital signature. Transform your corporate identity—enquire now and secure a lifetime of distinction for your key personnel."
          />
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="section-title">The Team Behind Pacifico</h2>

              <p className="section-subtitle">{message}</p>
            </div>

            <div className="col-sm-6 col-md-6">
              <div className="team-item">
                <img
                  src={vinayaka}
                  className="team-img"
                  alt="fancy number team member"
                />
                <h3>Vinayaka KJ</h3>
                <div className="team-info">
                  <p>Head of SEO</p>
                </div>
                <p>
                  vinay is our co-founder and has developed search strategies
                  for a variety of clients from national brands to medium sized
                  businesses for over five years.
                </p>
              </div>
            </div>

            <div className="col-sm-6 col-md-6">
              <div className="team-item">
                <img
                  src={Prashanth}
                  className="team-img"
                  alt="fancy number team member"
                />

                <h3>Prashanth KJ</h3>

                <div className="team-info">
                  <p>Developer</p>
                </div>

                <p>
                  I, Prashanth KJ, founded this platform to offer a curated
                  selection of fancy phone numbers, adding a touch of
                  individuality to every call and message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "2vw 0vw",
          marginTop: "2vw",
          textAlign: "center",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        No 258, 19th Ward, Near Madiwalesheara temple, Hospet (Tq) Vijayanagara
        (Dist) - 583201
      </footer>
    </>
  );
}

export default Services;
