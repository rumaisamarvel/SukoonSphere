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
                <div key={category?.id} className="mb-8 bg-white">
                    <h3 className="text-2xl font-bold text-[#0c2b64] mb-4">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                        {category.quizzes.map((quiz) => (
                            <div key={quiz.id} className="card bg-white shadow-xl ">
                                <Link to={`quiz/${quiz.quizId}`}>
                                    <figure>
                                        <img
                                            src={quiz.imageSrc || 'default_image_placeholder_url'}
                                            alt={quiz.imageAlt}
                                            className="h-48 w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                                        />
                                    </figure>
                                </Link>
                                <div className="card-body px-4">
                                    <Link to={`quiz/${quiz.quizId}`}>
                                        <h2 className="card-title text-[#0c2b64]">{quiz.title}</h2>
                                        <p className='line-clamp-2'>{quiz.description || "Take the quiz to find out more!"}</p>
                                    </Link>
                                    <div className="flex items-center  pb-4 justify-start gap-4 order-3 sm:order-none">
                                        <div className="flex items-center justify-center gap-2">
                                            <img
                                                className="rounded-full size-7 border-2 border-gray-400"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8zMzMxMTE1NTX8/PwuLi4oKCgrKyv5+fkmJiYjIyM4ODj19fXGxsYhISEeHh7o6Ojh4eGtra1TU1Oenp7Y2NhWVlbv7+9ISEi0tLQ+Pj5mZmbAwMBMTExycnJ5eXmNjY3FxcVjY2Pj4+OWlpaFhYWQkJB+fn6mpqbPz8+dQE4kAAAI4klEQVR4nO2dDXeiOhCGyTdfKqIgIEXXaiv//w/eTLB3u3arAhXCnnnOdrvtnvbkdSaZyWSCjoMgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCNINrmk+mb/HHs6Pw5sP3jD2aJ7AlSbu/oMiw2Vdxuv1+pyXyWbswfwgjbE29fpQ+Iu573me7y8W9OU9X5r/nrrHmvG79X4lpBSM/EYoWVTnV/DeyfvrptwGUgj2WZ/+NxVEquy45NczdGq4ZSWVIAEDyGfga+EFx9exh9iJi1lcZ7kz+ghlxnCfjUioFkmYX5zdi6NOy5hN1IsDacTdRFbJRxowIczsik5KqwtuqaP6D1UvZZMMjD3qVrjaQ7ceE+CLtyUyEgh21kvq2ENuiRb4ooiZfTeNCHNSBGR+nJgF9aRKMnVH2R8sji6/OPc04Mu0lUBC1Ho66jR8s5W0lUBKRTyp1eYk78WIK5hOepKJ6IO5FCvKWtqQCZVuppGj6jEmmbgb5/+Ct+cT2fq7775OyNrZEBBBPQmF3JmZjUQHI8oqnIRCt1ImGWuvkIl87NE/AHdK0V7bh8LUnUDY55UU9xK1b6BEzBz7Y2JCOiwyDQGRO8d+hUevS6QwJtRbERFZrlAPTsfCjiaEF8bP7RaoR5dATa2jETVqZ7dCHc3iBemjkBZ2F4s55++qW7T/34h259+cu6m4U7e4g+UTkTuvnUPFBW9vtUIdDWU/gToiWl2S0lm311OhOoRjq7iF6+R+T4UitXox1cFi3lfhKhpbxS24c+5twxfLFcZ9FVLbFfafhyvL52H5A2upxfFQD61uWer+gqysjhbcWZKeOY08WV2M4jzMeiqcn8cWcRO9t6h6uqk/szov1Q629jv7KaOMsSCy+qxUK6znnfeHWh9VB9dyhTwM6HVfyeMSCZuvbS/sc2fXfSLqF8ZLxlZwB/3yl6rzHp8xtZpA30mYdq3q65VGxWMP/xHOsmtJmInM6qT0g2ilup1bMGhXmAAcjNjNhmr1anW4/59N2r6gSHWQCbx4GgIdZ+aztlMxEIGS1SRmoTnh3EvWckHVL4koasvPnS5APNukbcum0G1ytv/416BHGTp10HKxYczyUvAV3Cnpvb7LT/Yz6dp2IpPQMRsMaA8W0I3xkEY9B6m3hUBhfcJm4E0HtBsrETy43FAmtcAQBE7CU13ndb0OHSdmj+XgjBIvjRyerC2P9x+Dc2e7wF+cQu7MMh8k3jKk6dcX3rt+QZJgwd5n7uUX2SjVTD8nLFMiKQ38XeQ4y50vCAuuryL8YT9KZRHrHywLQagkaa6dFbb59rmrGVZYHhQVFDIU7/Cqd1LnzKNUsG+vJFAiVJVog50DAUUMIeS2dO28DQX9vXUFG6fmegyTq1/Q7n0K5I0mNyFXsbbW5k0KU6eB60Kyqq2M/NpB36gKBDWlNgZZGDuGcK2rWvj0r9spKhbFGc5h6oPUyw1twotgUhxti43GqcrMv7aU91KCLZZvL75UUKCi1JgTzvqFXATbXDukszmJqxyP+vCDFpkRhhLuxfVyYpbRXQ2NzZvZ26GQvpRKaKSUvnjZnZewcG7izBNX7Q1MCLIPHYtWVO4sK49ep6LaNRnxit0MxupuknJ9qg6pZrs7xnVkDmCWcaq+TlJwca9a2iSwTn3yZb3UGQ18R6pt/HrpUOduqPkIBGG9L3xhKt3sWiKlflrbIzEvVMC+NHvp5R/ihNa4oId1vfljuG6Sn7I5rKCUfc3RtWgSqKK0wk91Bprr9OzWZklLoJ4s0h1ccv71q4zP74eMKKlu1sa1pwa5a0FgdHnJxO30sxFChdIrjVL6k15Z9c6DsduvC7T7l+NvNyDdgjL+rbHSJpY3XmzWlSZo3j6kAv2imI2sz4HbI4rd3QjSRuX/9mQfn24q1L9XZMmYNoSgHK06V7gfgBG1gvPEsVTCVftKso6N+Y9K3LkjrqjQEdz5sPARwLcXI5aJ9c6hYIp1vV3xAPp3C1aM1jXMwUdF0Ksj+K5EqKNW7mghIxedLwC1QIx3GyrqfBbaDnUYa7sYe89cZT4hRzoZDrN76drPoAN/NkJdSm+Hcq9vX/6DCCbz4RsYuBMeZPDEQPEbHTLkYXgj6l3vULMQwr6XDF1A1T5z9Mkg09Dc1ffXQ0dE19ms4I7aIBIZXJ/dDJzYuE49hLbf0OGLNuu+Dd3t8AbvtHH7dsq2g8lq6JUm6tvt3FIhzaJhJfKZeOqe4qtCMXTFJpaDKgyGz01PcqB438CI3A+scDvMxuk3YjuswHB1fV70XPRWfzXsXZqoGFbh8M21y6Dv7Z/WCovloAoTc+wwoEDtp8N28Seq7cO8ekKpVw+qkM9WnjbjEwv6n2E0UOI09K29aC8Uadtj2Q1KhJ+WA+elLjxdNpXDBEUmg/3gdW+44OREp2EqwirNwYDD173hTux2bp63w26253WDXXrFPHaMRjubcZ0wXyka6DXnGUU36PmTdDdsHLyW6DqbdSZB4zMUUkG3M3fUo3w4I+XLfdb3gSZ/R5G0DPmobZjQUmqeBLkn8x83opqneXO+PXo7BhCtMx+6f5qHBndM6BjkENQ0YRBPVaUNwho4eFIUb6mEQTZ9Ip0UNh0bVAiv2NfcEuM1mJGE5bsxJJiik8LG+FQFh/XSHm0G8wYI8PEaH6jscUuWCKGKd9PMaJMBL+G4GRFfrg/C80we8CWEXD9Z39gMuqUghadU+IvsvWzk2dCy9y3uMt5l0lMiYKZ3remKNinK5z5L84XZZYJXKylZ+jZrnk1jszrn8o450WxdZQT69MjfesKaVj5irAdNw4odTnESTuZaUPNmQG7067xLC6EE6IQ+9T90mgcoAMHL9i1ONvzjxob9InlzIN0M1I3q/FgdMir9xWLuay5vNKMRxct2H8+WG/7xY471DvotfPOa1GUen89reLOgc17OkuXABxHP5Fu7jJtz/jD8A+cfeAek7/j0dmv/qEIEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQQbgP7HycOf8FODgAAAAAElFTkSuQmCC"
                                                alt="alt"
                                            />
                                            <span className="text-sm">{"Sartaj Ashraf" || "auther"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <AiOutlineFieldTime />
                                            <span className="text-sm"> {"20-05-2024" || "date"}</span>
                                        </div>
                                        <div className="hidden sm:flex items-center justify-between sm:justify-center gap-4">

                                            |
                                            <div className=" flex items-center justify-center gap-2 ">
                                                <AiOutlineLike />
                                                <span className="text-xs">140</span>
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
