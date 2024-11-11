import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { RxReset } from 'react-icons/rx';
import { Form, Link, useLoaderData } from "react-router-dom";
function SearchFilters() {
    const { category } = useLoaderData()
    return (
        <Form className='flex flex-col md:grid md:grid-cols-12 gap-4 justify-center items-end'>
            <label className="w-full md:col-span-3 input bg-transparent flex items-center gap-2" style={{ borderBottom: '2px solid #13404f', borderRadius: '0px' }}>
                <input
                    type="text"
                    className="grow text-[var(--black-color)]"
                    placeholder="Search by name or category"
                    name="search"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
            <label className='w-full md:col-span-2'>
                <select
                    name="category"
                    className="w-full select bg-transparent cursor-pointer"
                    style={{ borderBottom: '2px solid #13404f', borderRadius: '0px' }}
                >
                    <option disabled selected>
                        Category
                    </option>
                    {category.map((tag) => {
                        return <option key={tag} className='text-[var(--primary)] cursor-pointer'>{tag}</option>;
                    })}
                </select>
            </label>
            <div className='flex gap-2 w-full md:w-auto justify-start md:justify-start'>
                <button
                    type="submit"
                    className="btn btn-outline btn-[red] btn-sm"
                >
                    <FaSearch className="text-[var(--primary)] text-6 hover:text-[var(--ternery)] size-5" />

                </button>
                <Link to="/media/all-videos" className='btn btn-outline btn-[red] btn-sm' >
                    <RxReset className="font-extrabold text-[var(--primary)] text-6 hover:text-[var(--ternery)] size-6" />
                </Link>
            </div>
        </Form>
    );
}

export default SearchFilters
