import React, { useState, useEffect } from 'react';
import QuizQuestions from '@/components/quizComponents/QuizQuestions';
import QuizList from '@/components/quizPageComponents/QuizList';
import QuizSummary from '@/components/quizPageComponents/QuizSummary';
import { Quizzes } from '@/utils/Quizzes';
import bgImg from '../../assets/images/bg_podcast.jpg'
import { HeaderImg } from '@/components';
import { useLoaderData } from 'react-router-dom';


function Quiz() {
    const { quiz, quizDetails, quizQuestions } = useLoaderData()
    return (
        <>
            {/* <HeaderImg currentPage="Quiz" bgImg={bgImg} /> */}
            <div className="max-w-full mx-auto px-4 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Quiz Questions Section */}
                    <div className="lg:col-span-4 sticky top-16 h-[450px] grid gap-6 rounded-[20px] bg-[var(--white-color)] order-2 lg:order-1">
                        <div>
                            <QuizQuestions
                                quizQuestionsList={quizQuestions}
                            />
                        </div>
                    </div>

                    {/* Quiz Summary Section */}
                    <div className="lg:col-span-5 grid gap-6  rounded lg:sticky lg:top-20 order-1 lg:order-2">
                        <QuizSummary data={quizDetails} />
                    </div>

                    {/* Sidebar */}
                    <div
                        className="lg:col-span-3 bg-[#F7F9F9] p-4 rounded flex flex-col gap-8 lg:sticky lg:top-20 order-3"
                        style={{ height: "max-content" }}>
                        <h3 className='text-lg font-bold text-gray-900 text-center'>Related Quizzes</h3>
                        <QuizList />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;
