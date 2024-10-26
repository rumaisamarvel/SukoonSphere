import { videos } from '@/utils/Vidoes/AllVidoes'
import { VideoCard } from '@/components'
import React from 'react'
import SectionTitle from '../sharedComponents/SectionTitle'

const TrendingVideos = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto' >
                <SectionTitle title={'recent videos'} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade"  >
                    <VideoCard videos={videos.slice(0, 4)} />
                </div>
            </div>
        </>
    )
}
export default TrendingVideos
