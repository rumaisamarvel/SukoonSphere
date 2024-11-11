import React, { useState } from 'react'
import { FaRegHeart, FaRegComment, FaEllipsisV, FaUserPlus, FaUserMinus } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'
import { useUser } from '@/context/UserContext'
import DeleteModal from '../shared/DeleteModal'
import customFetch from '@/utils/customFetch'
import { Link } from 'react-router-dom'
import UserAvatar from '../shared/UserAvatar'
import PostActions from '../shared/PostActions'

const PostCard = ({ post, user, comment = "link", totalComments, onCommentClick }) => {
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id))
    const [showDropdown, setShowDropdown] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [likesCount, setLikesCount] = useState(post.totalLikes || 0)
    const [isLoading, setIsLoading] = useState(false)
    const [follow, setFollow] = useState({ isLoading: false, isFollowing: post.likes.includes(user?._id) })

    const handleDelete = () => {
        setShowDeleteModal(true)
        setShowDropdown(false)
    }
    const handleDeletePost = async () => {
        try {
            await customFetch.delete(`/posts/${post._id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    const handleLike = async () => {
        setIsLoading(true)
        try {
            await customFetch.patch(`/posts/${post._id}/like`)
            setIsLiked(!isLiked)
            setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    console.log({ post })
    const handleFollow = async () => {
        setFollow(prev => ({ ...prev, isLoading: true }))
        try {
            await customFetch.patch(`/user/follow/${post.createdBy}`)
            setFollow(prev => ({ ...prev, isFollowing: !prev.isFollowing }))
        } catch (error) {
            console.log(error)
        } finally {
            setFollow(prev => ({ ...prev, isLoading: false }))
        }
    }


    return (
        <div className="bg-white rounded-[10px] shadow-sm mb-6 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <UserAvatar username={post.username} userAvatar={post.userAvatar} createdAt={post.createdAt} />
                {post.createdBy === user?._id ? (
                    <PostActions handleDelete={handleDelete} />
                ) : (
                    <button className="text-blue-500 hover:text-blue-600" onClick={handleFollow} disabled={follow.isLoading}>
                        {follow.isFollowing ? <FaUserMinus size={20} /> : <FaUserPlus size={20} />}
                    </button>
                )}
            </div>

            {/* Content */}
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt="Post content"
                    className="w-full h-auto rounded-[10px] mb-4"
                />
            )}
            <p className="text-gray-800 mb-4">{post.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-6">
                <button className={`flex items-center gap-2 text-gray-500 hover:text-blue-500 ${isLiked ? 'text-red-500' : ''}`} onClick={handleLike} disabled={isLoading}>
                    <FaRegHeart size={20} />
                    <span>{likesCount}</span>
                </button>

                {comment === "link" ?
                    <Link to={`/posts/${post._id}`} className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                        <FaRegComment size={20} />
                        <span>{post.totalComments || 0}</span>
                    </Link>
                    :
                    <span className="flex items-center gap-2 text-gray-500 hover:text-blue-500" onClick={onCommentClick}>
                        <FaRegComment size={20} />
                        <span>{totalComments || 0}</span>
                    </span>}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeletePost}
                title="Delete Post"
                message="Are you sure you want to delete this post?"
                itemType="post"
            />
        </div>
    )
}

export default PostCard
