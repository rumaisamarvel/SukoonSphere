import React, { useState, useEffect } from 'react';
import customFetch from '@/utils/customFetch';
import { useUser } from '@/context/UserContext';

const UserFollowers = () => {
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                setIsLoading(true);
                const { data } = await customFetch.get('/user/followers');
                console.log({ data })
                setFollowers(data.followers);
            } catch (error) {
                setError(error.response?.data?.msg || 'Error fetching followers');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-[var(--black-color)] text-center">Followers</h2>
            <div className="divide-y divide-gray-200">
                {followers.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No followers yet</p>
                ) : (
                    followers.map((follower) => (
                        <div key={follower._id} className="py-2 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-lg">
                                    {follower.avatar ? (
                                        <img
                                            src={follower.avatar}
                                            alt={follower.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <h1 className='text-xl text-[var(--primary)]'>
                                            {follower.username[0]}
                                        </h1>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-base text-[var(--primary)]">{follower.username}</p>
                                    <p className="text-sm text-gray-600">{follower.email}</p>
                                </div>
                            </div>
                            <button
                                className="action-button btn-sm"
                                onClick={() => handleFollowBack(follower._id)}
                            >
                                {user?.following?.includes(follower._id) ? 'Unfollow' : 'Follow Back'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserFollowers;
