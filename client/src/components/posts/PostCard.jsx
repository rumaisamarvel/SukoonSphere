import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { BsPersonDash, BsPersonPlus, BsThreeDotsVertical } from 'react-icons/bs';

import UserAvatar from '@/components/shared/UserAvatar';
import customFetch from '@/utils/customFetch';
import { useUser } from '@/context/UserContext';
import { AiOutlineComment } from 'react-icons/ai';
import { Follow, Like } from '@/components';
// Lazy load components that aren't immediately needed
const CommentSection = lazy(() => import('@/components/shared/Comments/CommentSection'));
const DeleteModal = lazy(() => import('@/components/shared/DeleteModal'));

/**
 * PostCard Component
 * Displays a single post with user interactions like comments, likes, and follow/unfollow functionality
 * 
 * @param {Object} post - The post object containing all post data
 * @param {Function} onPostDelete - Callback function executed when a post is deleted
 */
const PostCard = ({ post, onPostDelete }) => {
    const [showComments, setShowComments] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [comments, setComments] = useState([]);
    const { user } = useUser();
    const isAuthor = user?._id === post.createdBy;

    const handleCommentError = useCallback((error) => {
        console.error(error);
    }, []);

    const fetchComments = useCallback(async () => {
        try {
            const { data } = await customFetch.get(`/posts/${post._id}/comments`);
            setComments(data || []);
        } catch (error) {
            handleCommentError(error?.response?.data?.msg || 'Failed to fetch comments');
            throw error;
        }
    }, [post._id]);

    // Only fetch comments when they're shown
    useEffect(() => {
        if (showComments) {
            fetchComments();
        }
    }, [fetchComments, showComments]);

    const handleAddComment = useCallback(async (content) => {
        try {
            const { data } = await customFetch.post(`/posts/${post._id}/comments`, { content });
            setComments(prev => [data.comment, ...prev]); // Optimistic update
            setShowComments(true);
            return data.comment;
        } catch (error) {
            handleCommentError(error?.response?.data?.msg || 'Failed to add comment');
            throw error;
        }
    }, [post._id]);

    const handleDeleteComment = useCallback(async (commentId) => {
        try {
            await customFetch.delete(`/posts/comments/${commentId}`);
            setComments(prev => prev.filter(comment => comment._id !== commentId));
        } catch (error) {
            handleCommentError(error?.response?.data?.msg || 'Failed to delete comment');
            throw error;
        }
    }, []);

    const handleReplyToComment = useCallback(async (commentId, content) => {
        try {
            const { data } = await customFetch.post(`/posts/comments/${commentId}/replies`, { content });
            setComments(prev => prev.map(comment => {
                if (comment._id === commentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), data.reply]
                    };
                }
                return comment;
            }));
            return data.reply;
        } catch (error) {
            handleCommentError(error?.response?.data?.msg || 'Failed to add reply');
            throw error;
        }
    }, []);

    const handleDeleteReply = useCallback(async (replyId) => {
        try {
            await customFetch.delete(`/posts/comments/replies/${replyId}`);
            setComments(prev => prev.map(comment => ({
                ...comment,
                replies: (comment.replies || []).filter(reply => reply._id !== replyId)
            })));
        } catch (error) {
            handleCommentError(error?.response?.data?.msg || 'Failed to delete reply');
            throw error;
        }
    }, []);

    const handleDelete = useCallback(async () => {
        try {
            setIsDeleting(true);
            await customFetch.delete(`/posts/${post._id}`);
            setShowDeleteModal(false);
            onPostDelete?.(post._id);
        } catch (error) {
            handleCommentError('Error deleting post');
        } finally {
            setIsDeleting(false);
        }
    }, [post._id, onPostDelete]);

    const handleFollowOrUnfollow = useCallback(async () => {
        try {
            await customFetch.patch(`/user/follow/${post.createdBy}`);
            setIsFollowing(prev => !prev);
        } catch (error) {
            handleCommentError('Error following/unfollowing user');
        }
    }, [post.createdBy]);

    const handleLikePost = async () => {
        try {
            await customFetch.patch(`/posts/${post._id}/like`);
        } catch (error) {
            handleCommentError('Error liking post');
        }
    };

    const toggleComments = useCallback(() => {
        setShowComments(prev => !prev);
    }, []);

    return (
        <>
            <div className="mb-4 p-3 sm:p-4 border rounded-[10px] bg-[var(--white-color)]">
                <div className="flex items-center mb-4 justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <UserAvatar
                            user={{
                                picture: post?.avatar || '',
                                username: post?.username || ''
                            }}
                            size="medium"
                        />
                        <div >
                            <h4 className="font-semibold text-sm sm:text-base">{post?.username || 'Anonymous'}</h4>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                {post?.datePublished ? new Date(post?.datePublished).toLocaleDateString() : 'Date not available'}
                            </p>
                        </div>
                    </div>

                    {user && (
                        <div className="relative">
                            {!isAuthor && (
                                <Follow
                                    isFollowed={isFollowing}
                                    userId={post.createdBy}
                                    followers={post?.followers}
                                    onFollow={handleFollowOrUnfollow}
                                    onError={handleCommentError}
                                />
                            )}

                            {isAuthor && (
                                <>
                                    <BsThreeDotsVertical
                                        className="text-black cursor-pointer"
                                        onClick={() => setShowActionModal(!showActionModal)}
                                    />

                                    {showActionModal && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg  z-10">
                                            <button
                                                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg"
                                                onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setShowActionModal(false);
                                                }}
                                            >
                                                Delete Post
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                {post?.imageUrl && (
                    <div className="w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden mb-4">
                        <img
                            src={post.imageUrl}
                            alt="Post visual"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
                <p className="mb-4 text-sm sm:text-base">{post?.description || 'No description available'}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                    {post?.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between text-gray-500 text-sm mt-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Like
                            onLike={handleLikePost}
                            totalLikes={post?.totalLikes}
                            likes={post?.likes}
                            id={post?._id}
                            onError={handleCommentError}
                        />
                        <button
                            onClick={toggleComments}
                            className="flex items-center gap-1 hover:text-blue-500"
                        >
                            <AiOutlineComment className='w-5 h-5' />
                            <span className='text-sm font-medium text-[var(--grey--900)] hover:text-blue-500'>
                                {comments.length || 0} comments
                            </span>
                        </button>
                    </div>
                </div>

                {showComments && (
                    <Suspense fallback={<div className="mt-4 text-center">Loading comments...</div>}>
                        <div className="mt-4 border-t pt-4">
                            <CommentSection
                                comments={comments}
                                onAddComment={handleAddComment}
                                onDeleteComment={handleDeleteComment}
                                onReplyToComment={handleReplyToComment}
                                onDeleteReply={handleDeleteReply}
                                currentUser={user}
                                type="post"
                            />
                        </div>
                    </Suspense>
                )}
            </div>

            {showDeleteModal && (
                <Suspense fallback={<div>Loading...</div>}>
                    <DeleteModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={handleDelete}
                        title="Delete Post"
                        message="Are you sure you want to delete this post?"
                        itemType="post"
                        isLoading={isDeleting}
                    />
                </Suspense>
            )}
        </>
    );
};

export default PostCard;
