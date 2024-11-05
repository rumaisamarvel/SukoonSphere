import React from 'react'

function SectionTitle({ title }) {
    return (
        <div className="sectionHeader px-6 sm:px-0 flex items-center pt-8 mb-8 pb-6 max-w-7xl mx-auto ">
            <h3 className="text-lg font-normal uppercase text-[var(--primary)]" style={{ fontFamily: "Luxurious Roman", fontWeight: 400, fontStyle: 'normal' }}>
                {title}
            </h3>
            <div className="flex-grow h-0.5 bg-[var(--sec-color)] ml-4"></div>
        </div>
    )
}

export default SectionTitle
