import React from 'react'
import { Form } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { FaEllipsisV, FaRegComment, FaRegHeart, FaReply } from 'react-icons/fa'
import UserAvatar from '../UserAvatar'
import PostActions from '../PostActions'

const CommentSection = ({ addComment, comments, handleDeleteComment }) => {
    console.log({ helloooo: comments })
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <Form onSubmit={addComment} className="relative">
                <input
                    name="content"
                    placeholder='Write a comment...'
                    className="w-full p-4 pr-16 border-none rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[120px] placeholder-gray-400"
                />
                <button
                    type='submit'
                    className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </Form>



            <div className="space-y-4 mt-6 px-4 pb-4">
                {comments && comments.map((comment) => (
                    <div key={comment._id} className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <UserAvatar username={comment.username} userAvatar={comment.userAvatar} createdAt={comment.createdAt} size='small' />
                            <PostActions />
                        </div>

                        <div className="ml-13">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-gray-800">{comment.content}</p>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                                    <FaRegHeart className="w-4 h-4" />
                                    <span className="text-sm">{comment.totalLikes || 0}</span>
                                </button>

                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                                    <FaReply className="w-4 h-4" />
                                    <span className="text-sm">{comment.totalReplies || 0}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CommentSection
