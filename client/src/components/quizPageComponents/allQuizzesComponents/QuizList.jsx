import React from 'react'
import {
    AiOutlineComment,
    AiOutlineLike,
    AiOutlineFieldTime,
} from "react-icons/ai";
import { Link } from 'react-router-dom';

function QuizList({ quizCategories, }) {
    return (
        <>
            {quizCategories?.map((category) => (
                <div key={category?.id} className="mb-8 ">
                    <h2 className="text-xl font-bold text-[var(--black-color)] mb-4">{category.category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                        {category.quizzes.map((quiz) => (
                            <div key={quiz.id} className="card bg-white shadow-lg rounded-[4px] transform transition-transform duration-300 ease-in-out hover:scale-[101%]">
                                <Link to={`quiz/${quiz.quizId}`}>
                                    <figure>
                                        <img
                                            src={quiz.imageSrc || 'default_image_placeholder_url'}
                                            alt={quiz.imageAlt}
                                            className="h-48 w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                                        />
                                    </figure>
                                </Link>
                                <div className="card-body p-3">
                                    <Link to={`quiz/${quiz.quizId}`}>
                                        <h1 className="card-title text-[var(--primary)] hover:text-[var(--ternery)] pt-0 mb-3">{quiz.title}</h1>
                                        <p className='line-clamp-2 text-[var(--black-color)]'>{quiz.description || "Take the quiz to find out more!"}</p>
                                    </Link>
                                    <div className="flex items-center pb-4 justify-start gap-2 order-3 sm:order-none">
                                        <div className="flex items-center mt-1 col-span-2 justify-start gap-8 order-3 sm:order-none">
                                            <div className="flex items-center justify-center gap-2  cursor-pointer">
                                                <img
                                                    className="rounded-full size-7 border-2 border-[var(--ternery)]"
                                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                    alt="alt"
                                                />
                                                <span className="text-sm text-[var(--primary)]"> Sartaj Ashraf</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2">
                                                <AiOutlineFieldTime color="var(--ternery)" />
                                                <span className="text-sm text-[var(--primary)]">20-12-2012</span>
                                            </div>
                                            <div className="hidden sm:flex items-center justify-between sm:justify-center gap-4">
                                                <div className=" flex items-center justify-center gap-2 ">
                                                    <AiOutlineLike color="var(--ternery)" />
                                                    <span className="text-xs text-[var(--primary)]">1290</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div >

            ))
            }
        </>
    )
}

export default QuizList
