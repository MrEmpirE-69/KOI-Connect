import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            About King’s Own Institute (KOI)
          </h1>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <img
              src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=60"
              alt="KOI Campus"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />

            {/* Intro Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                A Modern Institution with Deep Roots
              </h2>
              <p className="text-gray-600 leading-relaxed">
                King’s Own Institute (KOI) is a leading private institution of
                higher education located in central Sydney, Australia. We offer
                high-quality, accredited diploma, undergraduate, and
                postgraduate courses in Accounting, Business, Management,
                Information Technology (IT), and TESOL (Teaching English to
                Speakers of Other Languages).
              </p>
            </div>
          </div>

          {/* Historical/Philosophy Section */}
          <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                A Name with Legacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Named after a regiment of the British army with which our CEO
                and Dean was associated as an exchange officer, KOI adopts a
                similar spirit and values. We’re proud of our traditions and
                reputation for developing successful leaders.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60"
              alt="KOI Tradition"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>

          {/* Symbolism Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              The Meaning Behind “KOI”
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The initials KOI also symbolize the wild carp fish “koi” known
              across Asia. Energetic and resilient, the koi swims upstream— and
              according to legend, if it passes the Dragon Gate on the Yellow
              River, it transforms into a dragon. This story reflects
              perseverance and strength of purpose.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              At KOI, we nurture students who overcome challenges with courage,
              aiming high and achieving excellence in their careers. We believe
              the journey of education is as important as the degree itself.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
