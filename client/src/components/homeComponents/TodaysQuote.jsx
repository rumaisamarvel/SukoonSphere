import React, { useEffect, useState, useCallback, memo } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "../../assets/styles/TodaysQuote.css"
import "../../assets/styles/global.css"
import SectionTitle from "../sharedComponents/SectionTitle";

// Move widget data outside component to prevent recreation on each render
const widgets = [
    { id: 1, color: "bg-yellow-400", text: "Positivity", description: "You are not a drop in the ocean. You are the entire ocean in a drop.", navLInk: 'QA-section', buttonText: 'Ask a question' },
    { id: 2, color: "bg-blue-500", text: "Courage", description: "Healing takes time, and asking for help is a courageous step.", navLInk: 'articles', buttonText: 'Read an article' },
    { id: 3, color: "bg-green-400", text: "Gratitude", description: "Every day may not be good, but there is something good in every day.", navLInk: 'all-quizzes', buttonText: 'Attempt a quiz' },
    { id: 4, color: "bg-red-400", text: "Empowerment", description: "Embrace your individuality, for you hold immense power within.", navLInk: 'Posts', buttonText: 'Share a post' },
    { id: 5, color: "bg-purple-400", text: "Hope", description: "Focus on the positives, even in challenging times.", navLInk: 'podcast/playlists', buttonText: 'Listen to a podcast' },
    { id: 6, color: "bg-teal-400", text: "Resilience", description: "Do not rush the process of healing. Seeking support is a sign of strength, not weakness.", navLInk: 'media/all-videos', buttonText: 'Watch some videos' },
];

const Widget = memo(({ widget, isActive, isVisible, onClick }) => (
    <div
        id={`widget-${widget.id}`}
        onClick={onClick}
        className={`scroll-widget absolute flex items-center justify-center cursor-pointer shadow-2xl ${widget.color} 
        ${isActive
                ? "w-[280px] sm:w-80 h-36 sm:h-64 rounded-[20px] z-20"
                : "w-36 sm:w-52 h-12 sm:h-16 p-2 rounded-full z-10"} 
        transition-[width,height,transform,opacity]  duration-700 ease-in-out transform hover:scale-105 hover:shadow-xl 
        ${isVisible ? "animate-float" : "opacity-0"}`}
        style={{
            top: `${(widget.id) * (window.innerWidth < 640 ? 50 : 50)}px`,
            left: `${window.innerWidth < 640 ?
                // Mobile positions centered more
                widget.id === 1 ? "2%" :
                    widget.id === 2 ? "20%" :
                        widget.id === 3 ? "1%" :
                            widget.id === 4 ? "22%" :
                                widget.id === 5 ? "4%" :
                                    "20%"
                :
                // Desktop positions
                widget.id === 1 ? "5%" :
                    widget.id === 2 ? "65%" :
                        widget.id === 3 ? "40%" :
                            widget.id === 4 ? "10%" :
                                widget.id === 5 ? "55%" :
                                    "30%"}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            transform: window.innerWidth < 640 ? 'scale(0.85)' : 'none',
            transformOrigin: 'center center'
        }}
    >
        <div className="glossy-effect relative w-full h-full flex justify-between items-center pl-1">
            <div className="absolute top-1 right-0 flex items-center">
                {isActive ? (
                    <FaArrowCircleLeft size={24} className="text-black hover:text-gray-700 p-1 mb-2" />
                ) : (
                    <FaArrowCircleRight size={28} className="text-black hover:text-gray-700 p-1 mb-2" />
                )}
            </div>
            <div className={`text-black text-center transition-all duration-300 flex flex-col justify-center items-center p-2 sm:p-4 
                ${isActive ? "text-sm sm:text-lg" : "text-sm sm:text-lg"}`}>
                {isActive ? (
                    <h4 className="text-xs sm:text-base">{widget.description}</h4>
                ) : (
                    <h4>{widget.text}</h4>
                )}
                {isActive && (
                    <Link to={widget.navLInk} className="mt-2 sm:mt-4 text-xs sm:text-sm text-white px-3 py-1 rounded-full transition">
                        <button className="btn-1">
                            {widget.buttonText}
                            <FaLongArrowAltRight className='ml-2' />
                        </button>
                    </Link>
                )}
            </div>
        </div>
    </div>
));

const TodaysQuote = () => {
    const [activeWidget, setActiveWidget] = useState(null);
    const [isVisible, setIsVisible] = useState({});

    const handleWidgetClick = useCallback((id) => {
        setActiveWidget((prevId) => (prevId === id ? null : id));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
            });
        });

        const elements = document.querySelectorAll(".scroll-widget");
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section className="max-w-7xl mx-auto text-center px-4 md:px-6 sm:px-0">
            <SectionTitle title={"Quotes"} />
            <div className="bg-[var(--light-bg)] text-[--gray-700] text-sm inline-flex items-center py-2 px-3 rounded-full mb-4 glossy-effect-bar">
                <span className="bg-[#01427a] text-white rounded-full w-4 h-4 flex items-center justify-center mr-2">S</span>
                <Link to={"https://nhm.gov.in/images/pdf/National_Health_Mental_Policy.pdf"} target='_blank' className='hover:text-[var(--ternery)]'>
                    SukoonSphere: Personalized Quotes
                </Link>
            </div>
            <h2 className="font-bold text-[var(--grey--900)] text-xl md:text-[2.5rem] lg:text-[3.5rem] lg:leading-[3.5rem] px-2" data-aos="fade-up">
                Open a Quote to get started!
            </h2>
            <div className="relative w-full h-[80vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
                {widgets.map((widget) => (
                    <Widget
                        key={widget.id}
                        widget={widget}
                        isActive={activeWidget === widget.id}
                        isVisible={isVisible[`widget-${widget.id}`]}
                        onClick={() => handleWidgetClick(widget.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default memo(TodaysQuote);
