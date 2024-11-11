import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const UserAvatar = ({ username, userAvatar, createdAt, size = "medium" }) => {
    const sizeClasses = {
        small: {
            image: "w-4 h-4 sm:w-6 sm:h-6",
            text: "text-xs sm:text-sm",
            gap: "gap-2"
        },
        medium: {
            image: "w-8 h-8 sm:w-10 sm:h-10",
            text: "text-sm sm:text-base",
            gap: "gap-3"
        },
        large: {
            image: "w-10 h-10 sm:w-12 sm:h-12",
            text: "text-base sm:text-lg",
            gap: "gap-4"
        },
        verySmall: {
            image: "w-4 h-4 sm:w-6 sm:h-6",
            text: "text-xs sm:text-sm",
            gap: "gap-2"
        }
    };

    return (
        <div className={`flex items-center ${sizeClasses[size].gap}`}>
            <img
                src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(username || 'Anonymous')}&background=random`}
                alt={username || 'User'}
                className={`${sizeClasses[size].image} rounded-full`}
            />
            <div>
                <h3 className={`font-semibold ${sizeClasses[size].text}`}>{username}</h3>
                <p className={`${sizeClasses[size].text} text-gray-500`}>
                    {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
};

export default UserAvatar;