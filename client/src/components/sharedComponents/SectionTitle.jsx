import React from 'react'

function SectionTitle({ title }) {
    return (
        <div className="sectionHeader px-4 flex items-center py-6 lg:pt-8 lg:mb-8 lg:pb-6 max-w-7xl mx-auto ">
            <h3 className="text-lg font-normal uppercase text-[var(--primary)]" style={{ fontFamily: "Luxurious Roman", fontWeight: 400, fontStyle: 'normal' }}>
                {title}
            </h3>
            <div className="flex-grow h-0.5 bg-[var(--sec-color)] ml-4"></div>
        </div>
    )
}

export default SectionTitle
