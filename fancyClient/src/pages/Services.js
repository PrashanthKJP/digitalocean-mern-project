import React from "react";
import Prashanth from "../images/Prashanth.JPG";
import vinayaka from "../images/vinayaka.jpeg";
import { Helmet } from "react-helmet";

function Services() {
  let message = `There are many variations of passages of Lorem Ipsum available but the \n majority have suffered alteration in some injected humour.`;

  return (
    <section>
      <Helmet>
        <title>Life Time Fancy Number person's</title>
        <meta
          name="description"
          content="Empower your business leaders with Life Time Fancy Numbers for People. Elevate the professional image of your company holders with personalized mobile identities that reflect authority and distinction. Each fancy number tells a story of corporate excellence, enhancing communication and leaving a lasting impression. Explore our premium collection and provide your company leaders with a unique digital signature. Transform your corporate identity—enquire now and secure a lifetime of distinction for your key personnel."
        />
      </Helmet>
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2 class="section-title">The Team Behind Pacifico</h2>

            <p class="section-subtitle">{message}</p>
          </div>

          <div class="col-sm-6 col-md-6">
            <div class="team-item">
              <img
                src={vinayaka}
                class="team-img"
                alt="fancy number team member"
              />
              <h3>Vinayaka KJ</h3>
              <div class="team-info">
                <p>Head of SEO</p>
              </div>
              <p>
                vinay is our co-founder and has developed search strategies for
                a variety of clients from international brands to medium sized
                businesses for over five years.
              </p>
            </div>
          </div>

          <div class="col-sm-6 col-md-6">
            <div class="team-item">
              <img
                src={Prashanth}
                class="team-img"
                alt="fancy number team member"
              />

              <h3>Prashanth KJ</h3>

              <div class="team-info">
                <p>Developer</p>
              </div>

              <p>
                I, Prashanth KJ, founded this platform to offer a curated
                selection of fancy phone numbers, adding a touch of
                individuality to every call and message.
              </p>
            </div>
          </div>

          {/* <div class="col-sm-6 col-md-4">
            <div class="team-item">
              <img
                src="https://demo.epic-webdesign.com/tf-pacifico/v1/images/team3a.jpg"
                class="team-img"
                alt="pic"
              />

              <h3>ELISA JOHANSON</h3>

              <div class="team-info">
                <p>Marketing Manager</p>
              </div>

              <p>
                Elisa first fell in love with digital marketing at the
                university. He loves to learn, and looks forward to being part
                of this new exciting industry for many years.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Services;
