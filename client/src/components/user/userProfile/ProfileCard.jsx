import React from 'react';
import { useUser } from '@/context/UserContext';
const ProfileCard = () => {
    const { user, isLoading } = useUser();
    console.log({ user });
    if (isLoading) {
        return (
            <div className="bg-white shadow rounded-lg p-4">
                <div className="animate-pulse">
                    <div className="flex flex-col items-center">
                        <div className="rounded-full w-20 h-20 bg-gray-200"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3 mt-2"></div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'Anonymous')}&background=random`}
                        alt="Profile"
                        className="rounded-full w-20 h-20 border-2 border-gray-200 object-cover"
                    />
                    <h1 className="text-lg font-bold mt-2 text-[var(--black-color)]">
                        {user?.name || 'Anonymous'}
                    </h1>
                    <p className="text-sm text-[var(--black-color)]">
                        @{user?.name?.toLowerCase().replace(/\s+/g, '_') || 'anonymous'}
                    </p>
                </div>
                <p className="text-sm text-center mt-2 px-1 text-[var(--black-color)]">
                    {user?.bio || 'No bio available'}
                </p>
                <div className="grid grid-cols-2 mt-3 text-left p-1 gap-2">
                    <div className='text-[var(--black-color)]'>
                        <strong>{user?.followers?.length || 0}</strong> Followers
                    </div>
                    <div className='text-[var(--black-color)]'>
                        <strong>{user?.following?.length || 0}</strong> Following
                    </div>
                    <div className='text-[var(--black-color)]'>
                        <strong>{user?.answers?.length || 0}</strong> Answers
                    </div>
                    <div className='text-[var(--black-color)]'>
                        <strong>{user?.posts?.length || 0}</strong> Posts
                    </div>
                    <div className='text-[var(--black-color)]'>
                        <strong>{user?.questions?.length || 0}</strong> Questions
                    </div>
                </div>
                {user?.subscription && (
                    <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
                        <p>🔔 Subscribed: {user.subscription.status}</p>
                        <p>🔴 Expires: {new Date(user.subscription.expiryDate).toLocaleDateString()}</p>
                    </div>
                )}
                {/* Additional Stats */}
                <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-[var(--black-color)]">
                            <strong>{user?.totalLikes || 0}</strong> Total Likes
                        </div>
                        <div className="text-[var(--black-color)]">
                            <strong>{user?.totalComments || 0}</strong> Comments
                        </div>
                    </div>
                </div>
                {/* User Status */}
                <div className="mt-4 text-sm">
                    <span className={`px-2 py-1 rounded-full ${user?.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {user?.isActive ? '🟢 Active' : '⚫ Offline'}
                    </span>
                </div>
            </div>
        </div>

    );

};



export default ProfileCard;


