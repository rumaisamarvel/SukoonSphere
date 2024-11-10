import { useState, useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { postAPI } from '@/utils/apiCalls';

const LikePost = ({ totalLikes = 0, id }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(totalLikes);

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const response = await postAPI.checkPostLike(id);
                setIsLiked(response.isLiked);
            } catch (error) {
                console.error('Error checking post like status:', error);
            }
        };
        checkIfLiked();
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await postAPI.likePost(id);
            if (response.success) {
                setIsLiked(!isLiked);
                setLikes(prev => isLiked ? prev - 1 : prev + 1);
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className="flex items-center">
            <span className="text-sm sm:text-base mr-1">{likes}</span>
            {isLiked ? (
                <FaHeart className="text-red-500 cursor-pointer size-4 sm:size-6" onClick={handleLike} />
            ) : (
                <CiHeart className="hover:text-blue-500 cursor-pointer size-4 sm:size-6 text-[var(--primary)]" onClick={handleLike} />
            )}
        </div>
    );
};

export default LikePost;
