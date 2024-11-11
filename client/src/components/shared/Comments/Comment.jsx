/**
 * Comment Component
 * 
 * A versatile component for displaying and managing comments with nested replies.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.comment - The comment object containing details like id, content, author etc.
 * @param {Function} props.onEdit - Callback function to handle comment editing
 * @param {Function} props.onDelete - Callback function to handle comment deletion
 * @param {Function} props.onLike - Callback function to handle liking a comment
 * @param {Function} props.onReply - Callback function to handle replying to a comment
 * @param {Function} props.onDeleteReply - Callback function to handle deletion of replies
 * @param {Object} props.currentUser - Currently logged in user object
 * @param {string} props.type - Type of the comment section ('post' by default)
 * 
 * Key Features:
 * - Nested replies with collapsible thread view
 * - Rich text editing for comments and replies
 * - Delete confirmation modal
 * - Action menu for comment authors
 * 
 * Common Usage:
 * ```jsx
 * <Comment
 *   comment={commentData}
 *   onEdit={(id, content) => handleEdit(id, content)}
 *   onDelete={id => handleDelete(id)}
 *   currentUser={user}
 * />
 * ```
 * 
 * Key Functions:
 * 
 * handleDelete():
 * Manages the comment deletion process with loading states
 * ```js
 * const handleDelete = async () => {
 *   setIsDeleting(true);
 *   await onDelete(comment._id);
 *   setShowDeleteModal(false);
 * };
 * ```
 * 
 * handleAddReply():
 * Handles adding new replies to comments
 * ```js
 * const handleAddReply = async () => {
 *   if (!replyContent.trim()) return;
 *   await onReply(comment._id, replyContent);
 *   setReplyContent('');
 * };
 * ```
 * 
 * handleDeleteReply():
 * Manages deletion of nested replies
 * ```js
 * const handleDeleteReply = async (replyId) => {
 *   await onDeleteReply(comment._id, replyId);
 * };
 * ```
 */




import React, { useState, useEffect } from 'react';
import UserAvatar from '../UserAvatar';
import ReactionButtons from '../ReactionButtons';
import ContentEditor from '../ContentEditor';
import Reply from './Reply';
import customFetch from '@/utils/customFetch';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteModal from '../DeleteModal';
import { useUser } from '@/context/UserContext';

const Comment = ({
    comment,
    onEdit,
    onDelete,
    onLikeComment,
    onReply,
    onDeleteReply,
    currentUser,
    type = 'post'
}) => {
    // State for managing replies
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replies, setReplies] = useState([]);
    const user = useUser();

    // State for managing action and delete modals
    const [showActionModal, setShowActionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Handler for deleting a comment
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(comment._id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    // Handler for adding a reply to a comment
    const handleAddReply = async () => {
        if (!replyContent.trim()) return;
        try {
            await onReply(comment._id, replyContent);
            setReplyContent('');
            setShowReplyForm(false);
            setShowReplies(true);
            fetchReplies();
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
    };

    // Handler for deleting a reply
    const handleDeleteReply = async (replyId) => {
        try {
            await onDeleteReply(replyId);
        } catch (error) {
            console.error('Failed to delete reply:', error);
            throw error;
        }
    }
    const handleLikeComment = async () => {
        await onLikeComment();
    }

    // Fetch replies for a comment
    const fetchReplies = async () => {
        try {
            const endpoint = type === 'post'
                ? `/posts/comments/${comment._id}/replies`
                : `/qa-section/answer/comments/${comment._id}/replies`;

            const { data } = await customFetch.get(endpoint);
            setReplies(data.replies || []);
        } catch (error) {
            console.error('Failed to fetch replies:', error);
        }
    };


    // Fetch replies when comment loads
    useEffect(() => {
        fetchReplies();
    }, [comment._id]);

    return (
        <div className="ml-4 mt-4 border-l-2 border-gray-200 pb-4">
            <div className="flex items-start gap-3">
                <UserAvatar user={comment.user} size="medium" />
                <div className="flex-1">
                    {/* Comment Header */}
                    <div className="flex items-center justify-between">
                        <div className="font-semibold ">
                            <p className="text-sm">{comment.username}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Action Menu for Comment Author */}
                        {user?._id === comment.createdBy && (
                            <div className="relative">
                                <BsThreeDotsVertical
                                    className="text-black cursor-pointer rotate-90"
                                    onClick={() => setShowActionModal(!showActionModal)}
                                />
                                {showActionModal && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                        <button
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg"
                                            onClick={() => {
                                                setShowDeleteModal(true);
                                                setShowActionModal(false);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Comment Content and Actions */}
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                        <div className="mt-3">
                            <div className="mt-2 flex items-center gap-4">
                                <ReactionButtons
                                    likes={0}
                                    onLike={() => handleLikeComment}
                                    onReply={() => setShowReplyForm(!showReplyForm)}
                                />
                            </div>

                            {/* Reply Form */}
                            {showReplyForm && (
                                <div className="mt-3">
                                    {user ? (
                                        <ContentEditor
                                            content={replyContent}
                                            setContent={setReplyContent}
                                            onSave={handleAddReply}
                                            onCancel={() => setShowReplyForm(false)}
                                            isLoading={false}
                                            buttonSize="xs"
                                            type="reply"
                                        />
                                    ) : (
                                        <p className="text-center text-gray-500 my-4 text-sm">
                                            Please sign in to comment
                                            <Link to="/login" className="text-blue-500 underline ml-1">
                                                Sign in
                                            </Link>
                                        </p>
                                    )}

                                </div>
                            )}
                        </div>

                        {/* Replies Section */}
                        {replies.length > 0 && (
                            <div className="mt-3 pl-4 border-l-2 border-gray-100">
                                <button
                                    onClick={() => setShowReplies(!showReplies)}
                                    className="text-sm text-blue-600 hover:text-blue-700 mb-2"
                                >
                                    {showReplies ? '▼' : '►'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                                </button>

                                {showReplies && (
                                    <div className="space-y-3">
                                        {replies.map(reply => (
                                            <Reply
                                                key={reply._id}
                                                onReply={onReply}
                                                reply={reply}
                                                onEdit={onEdit}
                                                onDeleteReply={handleDeleteReply}
                                                currentUser={currentUser}
                                                type={type}
                                                commentId={comment._id}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                title="Delete Comment"
                message="Are you sure you want to delete this comment?"
                itemType="comment"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default Comment;