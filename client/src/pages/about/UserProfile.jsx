import { GroupsSidebar, ProfileCard, ProfileDetails } from '@/components'
import React from 'react'

const UserProfile = () => {
    const groups = [
        {
            id: 1,
            name: 'Mindfulness Practices 🧘‍♂️',
            image: 'https://example.com/image_mindfulness.jpg',
        },
        {
            id: 2,
            name: 'Coping with Anxiety 💭',
            image: 'https://example.com/image_anxiety.jpg',
        },
        {
            id: 3,
            name: 'Therapy Techniques 📖',
            image: 'https://example.com/image_therapy.jpg',
        },
        {
            id: 4,
            name: 'Depression Support Group ❤️',
            image: 'https://example.com/image_depression.jpg',
        },
        {
            id: 5,
            name: 'Stress Management Workshops 🌱',
            image: 'https://example.com/image_stress.jpg',
        }
    ];
    return (
        <>
            {/* <HeaderImg currentPage="Profile" bgImg={bgImg} /> */}
            <div className='relative grid  sm:grid-cols-12 grid-cols-12 max-w-7xl mx-auto p-4 '>
                <div className="sticky top-[12%] h-screen col-span-3 ">
                    <ProfileCard />
                </div>
                <div className='col-span-6 px-4 flex flex-col gap-2 bg-white'>
                    <ProfileDetails />
                </div>
                <div className='sticky top-[12%] h-screen col-span-3'>
                    <GroupsSidebar groups={groups} />
                </div>
            </div>
        </>
    )
}

export default UserProfile