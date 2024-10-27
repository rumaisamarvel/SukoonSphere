import React from 'react';
import SectionTitle from '../sharedComponents/SectionTitle';
import bgImg from "../../assets/images/teams-bg.png"
import { Link } from 'react-router-dom';
const OurTeam = () => {
    return (
        <>
            <SectionTitle title={'Meet our team'}></SectionTitle>
            <div className=" max-w-7xl mx-auto flex flex-col items-center justify-center text-center pt-20" data-aos="fade-up" >
                <div className="flex justify-center mb-12 bg-contain md:bg-center object-bottom gap-12"
                    style={{
                        backgroundImage: `url(${bgImg}) `, width: '1200px',
                    }}>

                    <div className="w-72 h-72 rounded-lg overflow-hidden" data-aos="fade-up-left">
                        <img src="https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?semt=ais_hybrid"
                            alt="Team Member 1"
                            className="w-full h-full object-cover rounded-[20px]" />
                    </div>
                    <div className="w-72 h-72 rounded-lg overflow-hidden m-[-100px]" data-aos="fade-up" data-aos-duration="2000">
                        <img src="https://img.freepik.com/premium-photo/man-face-black-linear-cartoon-icon-user-isolated-white-background-ai-generated_1095381-16818.jpg?semt=ais_hybrid"
                            alt="Team Member 2"
                            className="w-full h-full object-cover rounded-[20px]" />
                    </div>
                    <div className="w-72 h-72 rounded-lg overflow-hidden" data-aos="fade-up-right">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg"
                            alt="Team Member 3"
                            className="w-full h-full object-cover rounded-[20px]" />
                    </div>
                </div>

                {/* Heading */}
                <Link to="/about/our-team" className='text-blue-700'>
                    <h1 className="text-[var(--grey--900)]  font-bold mb-4 h2" data-aos="fade" data-aos-duration="2000">
                        We're dedicated to one thing — <span className="text-[var(--primary)]">your inner peace</span>.
                    </h1>
                </Link>
                {/* Subheading */}
                <p className="text-[var(--grey--800)] text-lg mt-2" data-aos="fade" data-aos-duration="2000">
                    No matter your goals, we're here to guide and support you through all moments and milestones.
                    <Link to="/about/our-team" className='text-blue-700'>View all</Link>
                </p>
            </div>
        </>
    );
};

export default OurTeam;
