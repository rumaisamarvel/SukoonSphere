/**
 * CommentSection component handles displaying and managing comments
 * Allows users to:
 * - Add new comments
 * - Delete comments 
 * - Reply to comments
 * - Delete replies
 */
import React, { useState } from 'react';
import Comment from './Comment';
import ContentEditor from '../ContentEditor';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';

/**
 * CommentSection component for managing comment functionality
 * @param {Object[]} comments - Array of comment objects to display
 * @param {Function} onAddComment - Callback to add a new comment
 * @param {Function} onEditComment - Callback to edit an existing comment
 * @param {Function} onDeleteComment - Callback to delete a comment
 * @param {Function} onLikeComment - Callback to like/unlike a comment
 * @param {Function} onReplyToComment - Callback to add a reply to a comment
 * @param {Function} onDeleteReply - Callback to delete a reply
 * @param {Object} currentUser - Currently logged in user object
 * @param {string} type - Type of content being commented on (default: 'post')
 */
const CommentSection = ({
    comments,
    onAddComment,
    onEditComment,
    onDeleteComment,
    onLikeComment,
    onReplyToComment,
    onDeleteReply,
    currentUser,
    type
}) => {
    // State for managing new comment input and submission status
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useUser();

    /**
     * Handles submission of a new comment
     * Validates comment content and manages loading state
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            await onAddComment(newComment);
            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Handles editing of an existing comment
     * @param {string} commentId - ID of comment to edit
     * @param {string} content - New content for the comment
     * @returns {Promise<void>}
     */
    const handleEditComment = async (commentId, content) => {
        try {
            await onEditComment(commentId, content);
        } catch (error) {
            console.error('Failed to edit comment:', error);
            throw error;
        }
    };

    /**
     * Handles deletion of a comment
     * @param {string} commentId - ID of comment to delete
     * @returns {Promise<void>}
     */
    const handleDeleteComment = async (commentId) => {
        try {
            await onDeleteComment(commentId);
        } catch (error) {
            console.error('Failed to delete comment:', error);
            throw error;
        }
    };

    /**
     * Handles liking/unliking a comment
     * @param {string} commentId - ID of comment to like/unlike
     * @returns {Promise<void>}
     */
    const handleLikeComment = async (commentId) => {
        try {
            await onLikeComment(commentId);
        } catch (error) {
            console.error('Failed to like comment:', error);
            throw error;
        }
    };

    return (
        <div className="mt-6">
            <div className="mt-4">
                {/* Render comment form for logged in users, otherwise show sign in message */}
                {user ? (
                    <ContentEditor
                        content={newComment}
                        setContent={setNewComment}
                        onSave={handleSubmit}
                        onCancel={() => setNewComment('')}
                        isLoading={isSubmitting}
                        type="comment"
                        buttonSize="sm"
                    />
                ) : (
                    <p className="text-center text-gray-500 my-4 text-sm">
                        Please sign in to comment
                        <Link to="/sign-in" className="text-blue-500 hover:underline ml-1">
                            Sign in
                        </Link>
                    </p>
                )}
            </div>

            {/* Loading indicator shown when submitting first comment */}
            {isSubmitting && comments.length === 0 && (
                <div className="text-center text-gray-500 my-4">
                    Loading comments...
                </div>
            )}

            {/* List of existing comments */}
            <div className="mt-6 space-y-4">
                {comments?.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                        onLike={handleLikeComment}
                        onReply={onReplyToComment}
                        onDeleteReply={onDeleteReply}
                        currentUser={currentUser}
                        type={type}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentSection;