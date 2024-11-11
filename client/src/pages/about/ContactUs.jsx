import React from 'react';
import contactImg from "../../assets/images/ContactImg.jpg"
import call_Icon from "../../assets/icons/call.png"
import chat_Icon from "../../assets/icons/chat.png"
import crisis_Icon from "../../assets/icons/crisis.png"
import { HeaderImg } from '@/components';
import bgImg from "../../assets/images/ContactImg.jpg"
const ContactUs = () => {
    return (
        <>
            {/* <HeaderImg currentPage="Contact" bgImg={bgImg} /> */}
            <div className="flex flex-col lg:flex-row text-white rounded-lg overflow-hidden  max-w-7xl mx-auto " data-aos="fade" data-aos-duration="1500">
                <div className="lg:w-1/2 px-4 py-8 space-y-6">
                    <h1 className=" font-boldtext-[1.6rem] md:text-[2.5rem] sm:text-[3.5rem] sm:leading-[3.5rem] text-[var(--grey--900)]">SukoonSphere HelpLine</h1>
                    <p className="text-base text-[var(--grey--800)]">The SukoonSphere HelpLine provides the one-on-one help and information necessary to tackle tough challenges that you, your family or friends are facing. Call, Text or Chat with the HelpLine M-F, 10 a.m. - 10 p.m. ET. 988 crisis service available 24/7.</p>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <img src={call_Icon} alt="" />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-[var(--grey--900)]">Call</h2>
                                <p className='text-[var(--black-color)]'>1-800-950-6264</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <img src={chat_Icon} alt="" />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-[var(--grey--900)]">Chat or Text</h2>
                                <p className='text-[var(--black-color)]'>Text 'helpline' to 62640</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <img src={crisis_Icon} alt="" />

                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-[var(--grey--900)]">In a crisis?</h2>
                                <p className='text-[var(--black-color)]'>Call or Text 988</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div className="lg:w-1/2 rounded-[20px]" >
                    <ContactForm />
                </div>
            </div>
        </>
    );
};

export default ContactUs;

const ContactForm = () => {
    return (
        <div className="flex justify-center  items-center p-4">
            <div className="bg-[var(--primary)] shadow-lg px-4  lg:px-8 py-8 w-full rounded-[20px]">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--white-color)] ">Tell us about your situations</h2>
                <form className="space-y-2 text-[var(--grey--800)]  ">
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text ">Your name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="input input-bordered w-full bg-gray-100 text-[var(--black-color)]"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Your email address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="input input-bordered w-full bg-gray-100 text-[var(--black-color)]"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your phone number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your phone number"
                            className="input input-bordered w-full bg-gray-100 text-[var(--black-color)]"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Your message</span>
                        </label>
                        <textarea
                            placeholder="Your message"
                            className="textarea textarea-bordered w-full bg-gray-100 text-[var(--black-color)]"
                        />
                    </div>

                    <div className="mt-6">
                        <button className="btn w-full action-button">
                            SEND MESSAGE
                        </button>
                    </div>

                    <p className="mt-4 text-gray-500 text-sm text-center">
                        We usually reply within a day. We may need more details from you. We will be in touch by phone or email if required.
                    </p>
                </form>
            </div>
        </div>
    );
};



