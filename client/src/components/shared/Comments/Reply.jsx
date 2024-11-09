import React, { useState, useEffect } from 'react';
import UserAvatar from '../UserAvatar';
import ContentEditor from '../ContentEditor';
import { Link } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteModal from '../DeleteModal';
import { IoMdClose } from 'react-icons/io';

const Reply = ({
    reply,
    onEdit,
    onLike,
    onDeleteReply,
    currentUser,
    type = 'post',
    onReply,
    commentId
}) => {
    // Get current user and check if they are the author
    const { user } = useUser();
    const isAuthor = user?._id === reply.createdBy;

    // State management
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Handle submitting a new reply
    const handleSave = async () => {
        try {
            setIsLoading(true);
            setShowReplyForm(false);
            setReplyContent('');
            await onReply(reply._id, replyContent);
        } catch (error) {
            console.error('Failed to submit reply:', error);
        } finally {
            setIsLoading(false);
        }
    };
    // Handle reply deletion
    const handleDeleteReply = async () => {
        try {
            setIsDeleting(true);
            await onDeleteReply(reply._id);
            setShowDeleteModal(false);
        } catch (error) {
            console.log({ error });
            throw error;
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="pl-4 py-2 border-l-2 border-gray-100">
            <div className="flex items-start space-x-2">
                <UserAvatar user={reply} size="small" />
                <div className="flex-1 min-w-0">
                    {/* Reply header with username, timestamp and actions */}
                    <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-1">
                            <h4 className="font-semibold text-xs">{reply.username}</h4>
                            <span className="text-xs text-gray-500">
                                {new Date(reply.createdAt).toLocaleString()}
                            </span>
                        </div>

                        {/* Action menu for reply author */}
                        <div className="flex items-center gap-2">
                            {isAuthor && (
                                <div className="relative">
                                    {showActionModal ? (
                                        <IoMdClose
                                            className="text-black cursor-pointer"
                                            onClick={() => setShowActionModal(false)}
                                        />
                                    ) : (
                                        <BsThreeDotsVertical
                                            className="text-black cursor-pointer rotate-90"
                                            onClick={() => setShowActionModal(true)}
                                        />
                                    )}
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
                    </div>

                    {/* Reply content with @mention and reply button */}
                    <div className="mt-1">
                        <p className="text-xs mt-1 break-words">
                            <Link to="#" className='text-blue-500 underline'>@{reply?.commentUsername}</Link> {reply?.content}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                            <button
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500"
                            >
                                <FaReply className="w-3 h-3" />
                                Reply
                            </button>
                        </div>
                    </div>

                    {/* Reply form */}
                    {showReplyForm && (
                        <div className="mt-2">
                            <ContentEditor
                                content={replyContent}
                                setContent={setReplyContent}
                                onSave={handleSave}
                                onCancel={() => setShowReplyForm(false)}
                                isLoading={isLoading}
                                type="reply"
                                buttonSize="xs"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Delete confirmation modal */}
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteReply}
                title="Delete Reply"
                message="Are you sure you want to delete this reply?"
                itemType="reply"
                isLoading={isDeleting}
            />
        </div>
    );
};

export default Reply;