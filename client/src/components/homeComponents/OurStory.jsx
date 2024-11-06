import React from "react";
import SectionTitle from "../sharedComponents/SectionTitle";
import IntroVideo from "../../assets/videos/Story Video.mp4";
import { Link } from "react-router-dom";
import bgImg from "../../assets/images/teams-bg.png";
import { MdOutlineReadMore } from "react-icons/md";

const OurStory = () => {
  return (
    <>
      <SectionTitle title={"Our Story"}></SectionTitle>
      <div
        className=" max-w-7xl mx-auto px-4 md:px-0 bg-[--primary] text-white rounded-[20px]"
        data-aos="fade-up"
      >
        <div className="flex flex-col-reverse  md:flex-row items-center justify-between  md:space-y-0 md:space-x-8">
          <div
            className="md:w-1/2 space-y-6 py-4 sm:py-0 sm:p-8"
            data-aos="fade-up"
          >
            <div className="bg-[var(--grey--900)] text-[--gray-700] text-sm hidden sm:inline-flex items-center py-2 px-3 rounded-full mb-4 glossy-effect-bar">
              <span className="bg-[#01427a] text-white rounded-full w-4 h-4 flex items-center justify-center mr-2">
                N
              </span>
              <Link
                to={
                  "https://www.nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359"
                }
                target="_blank"
                className="hover:text-[var(--ternery)]"
              >
                NMHP: National Mental Health Programme
              </Link>
            </div>
            <h2
              className=" font-bold text-[1.6rem] sm:text-[3rem] sm:leading-[3.5rem]"
              data-aos="fade-up"
            >
              {" "}
              Committed to Your Mental Health and Wellness Journey
            </h2>
            <p
              className="text-lg font-light mb-4 text-[var(--grey--600)]"
              data-aos="fade"
              data-aos-duration="1500"
            >
              We're passionate about supporting individuals in achieving
              emotional well-being through personalized care and guidance.
            </p>
            <hr />
            <div>
              <Link to="/about-us">
                <button className="btn-4 glossy-effect-bar mb-4 sm:mb-0">
                  Know more
                  <MdOutlineReadMore className="ml-2" size={20} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Video Section */}
          <div
            className="w-full relative md:w-1/2 flex flex-col justify-center items-center sm:p-12"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <div className="sm:hidden bg-[var(--grey--900)] mt-4 text-[--gray-700] text-sm inline-flex items-center py-2 px-3 rounded-full mb-4 glossy-effect-bar">
              <span className="bg-[#01427a] text-white rounded-full w-4 h-4 flex items-center justify-center mr-2">
                N
              </span>
              <Link
                to={
                  "https://www.nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359"
                }
                target="_blank"
                className="hover:text-[var(--ternery)]"
              >
                NMHP: National Mental Health Programme
              </Link>
            </div>
            <div
              className={`w-full h-[20rem] bg-contain bg-center flex justify-center items-center sm:h-[30rem] bg-[url(${bgImg})]`}
            >
              <div className="relative w-full h-72 md:h-96 flex justify-center items-center ">
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-[10px]"
                  src={IntroVideo}
                  loop
                  muted
                  controls
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
