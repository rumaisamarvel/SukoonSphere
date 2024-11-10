import React from "react";
import CompanyLogo from "../../assets/images/SukoonSphere_Logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import links from "@/utils/SharedComp/PageLinks";
import { FaCircleDot } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-slate-900 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Subscribe to People First Dispatch
            </h2>
            <p className="text-slate-300">
              A weekly digest of latest news, articles and resources
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                className="flex-1 rounded-[6px] px-4 py-3 bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-6 py-3 rounded-[6px] transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-slate-400">
              By continuing, you agree to NovaBenefits{" "}
              <Link className="text-blue-400 hover:text-blue-300">Terms of Use</Link> and{" "}
              <Link className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
            </p>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-slate-300">Follow us on</span>
              <div className="flex gap-4">
                <FaFacebook className="w-6 h-6 text-slate-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer" />
                <FaTwitter className="w-6 h-6 text-slate-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer" />
                <AiFillInstagram className="w-6 h-6 text-slate-400 hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="h-full w-px bg-slate-700 mx-auto"></div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={`${link.name}-${index}`}>
                      <span 
                        className="text-slate-300  font-medium"
                      >
                        {link.name}
                      </span>
                      {link.sublinks && (
                        <ul className="mt-2 ml-4 space-y-2">
                          {link.sublinks.map((sublink) => (
                            <li key={sublink.name} className="flex items-center gap-2">
                              <FaCircleDot className="w-2 h-2 text-slate-500" />
                              <NavLink
                                to={sublink.address}
                                className="text-slate-400 hover:text-amber-400 text-sm"
                              >
                                {sublink.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Know Us */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Know Us
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="about/mental-health"
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      About Mental Health
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="about/mental-health"
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/our-team"
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      Our Review Board
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      Contact Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* RECO BY NMHP */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                  RECO BY NMHP
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="https://www.nmhp.org/"
                      target="_blank"
                      className="text-slate-300 hover:text-amber-400 font-medium"
                    >
                      National Mental Health Program
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="text-slate-400 space-y-4">
            <p className="text-sm">
              SukoonSphere's content is for informational and educational purposes
              only. Our website is not intended to be a substitute for
              professional medical advice, diagnosis, or treatment.
            </p>
            <p className="text-sm">© 2024 Inc. — All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};



export default Footer;
