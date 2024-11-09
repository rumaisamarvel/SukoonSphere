// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash, FaReply, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// import { BsThreeDots } from 'react-icons/bs';
// import Reply from './Reply';
// import { useAuth0 } from '@auth0/auth0-react';
// import customFetch from '@/utils/customFetch';
// import UserAvatar from '../shared/UserAvatar';
// import ActionButtons from '../shared/ActionButtons';
// import ContentEditor from '../shared/ContentEditor';
// import ReactionButtons from '../shared/ReactionButtons';
// import { useUser } from '@/context/UserContext';

// const Comment = ({ comment, onDelete, onEdit, postId }) => {
//     const { user } = useUser();
//     const isAuthor = user?._id === comment.createdBy;
//     console.log({ comment })
//     const { isAuthenticated } = useAuth0();
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedContent, setEditedContent] = useState(comment.content);
//     const [showReplyForm, setShowReplyForm] = useState(false);
//     const [replyContent, setReplyContent] = useState('');
//     const [replies, setReplies] = useState(comment.replies || []);
//     const [showReplies, setShowReplies] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [likes, setLikes] = useState(comment.likes || 0);
//     const [dislikes, setDislikes] = useState(comment.dislikes || 0);
//     const [userReaction, setUserReaction] = useState(comment.userReaction || null);

//     const handleReaction = async (type) => {
//         if (!isAuthenticated) return;

//         try {
//             const { data } = await customFetch.post(`/posts/${postId}/comments/${comment._id}/reaction`, {
//                 type,
//                 userId: user.sub
//             });

//             setLikes(data.likes);
//             setDislikes(data.dislikes);
//             setUserReaction(data.userReaction);
//         } catch (error) {
//             console.error('Failed to update reaction:', error);
//         }
//     };

//     const handleEdit = async () => {
//         try {
//             await onEdit(comment._id, editedContent);
//             setIsEditing(false);
//         } catch (error) {
//             console.error('Failed to edit comment:', error);
//         }
//     };

//     const handleAddReply = async (e) => {
//         // e.preventDefault();
//         if (!replyContent.trim()) return;

//         try {
//             setIsLoading(true);
//             const { data } = await customFetch.post(`posts/comments/${comment._id}/replies`, {
//                 content: replyContent,
//             });
//             console.log({ datareply: data });

//             if (data.reply) {
//                 setReplies(prevReplies => [data.reply, ...prevReplies]);
//                 setReplyContent('');
//                 setShowReplyForm(false);
//             }
//         } catch (error) {
//             console.error('Failed to add reply:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     const fetchReplies = async () => {
//         const { data } = await customFetch.get(`posts/comments/${comment._id}/replies`);
//         console.log({ data });
//         setReplies(data.replies);
//     };
//     useEffect(() => {
//         fetchReplies();
//     }, []);

//     const handleDeleteReply = async (replyId) => {
//         try {
//             await customFetch.delete(`posts/comments/replies/${replyId}`);
//             setReplies(prevReplies => prevReplies.filter(reply => reply._id !== replyId));
//         } catch (error) {
//             console.error('Failed to delete reply:', error);
//         }
//     };

//     const handleEditReply = async (replyId, newContent) => {
//         try {
//             const { data } = await customFetch.put(
//                 `posts/comments/${comment._id}/replies/${replyId}`,
//                 { content: newContent }
//             );

//             if (data.reply) {
//                 setReplies(prevReplies =>
//                     prevReplies.map(reply =>
//                         reply._id === replyId ? { ...reply, content: newContent } : reply
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to edit reply:', error);
//         }
//     };

//     return (
//         <div className="px-4">
//             <div className="flex gap-3">
//                 <UserAvatar user={comment} size="medium" />

//                 <div className="flex-grow">
//                     {/* Comment Header */}
//                     <div className="flex items-start justify-start">
//                         <div className="flex items-start justify-between w-full">
//                             <div>
//                                 <h4 className="font-semibold text-sm">{comment.username}</h4>
//                                 <p className="text-xs text-gray-500">
//                                     {new Date(comment.createdAt).toLocaleString()}
//                                     {comment.isEdited && ' (edited)'}
//                                 </p>
//                             </div>
//                             {isAuthor && (
//                                 <div className="ml-auto">
//                                     <button
//                                         onClick={() => onDelete(comment._id)}
//                                         className="text-red-500 hover:text-red-600 transition-colors"
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                                             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Comment Body */}
//                     {isEditing ? (
//                         <ContentEditor
//                             content={editedContent}
//                             setContent={setEditedContent}
//                             onSave={handleEdit}
//                             onCancel={() => setIsEditing(false)}
//                             isLoading={isLoading}
//                         />
//                     ) : (
//                         <>
//                             <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
//                             <ReactionButtons
//                                 likes={likes}
//                                 dislikes={dislikes}
//                                 userReaction={userReaction}
//                                 onLike={handleReaction}
//                                 onDislike={handleReaction}
//                                 onReply={() => setShowReplyForm(!showReplyForm)}
//                             />
//                         </>
//                     )}

//                     {/* Reply Form */}
//                     {showReplyForm && (
//                         <ContentEditor
//                             content={replyContent}
//                             setContent={setReplyContent}
//                             onSave={handleAddReply}
//                             onCancel={() => setShowReplyForm(false)}
//                             isLoading={isLoading}
//                             buttonSize="xs"
//                             type="reply"
//                         />
//                     )}

//                     {/* Replies Section - Fixed */}
//                     {replies.length > 0 && (
//                         <div className="mt-3 pl-4 border-l-2 border-gray-100">
//                             <button
//                                 onClick={() => setShowReplies(!showReplies)}
//                                 className="text-sm text-blue-600 hover:text-blue-700 mb-2"
//                             >
//                                 {showReplies ? '▼' : '►'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
//                             </button>

//                             {showReplies && (
//                                 <div className="space-y-3">
//                                     {replies.map(reply => (
//                                         <Reply
//                                             key={reply._id}
//                                             reply={reply}
//                                             onDelete={handleDeleteReply}
//                                             onEdit={handleEditReply}
//                                             isAuthor={isAuthenticated && user?.sub === reply.createdBy}
//                                             postId={postId}
//                                             commentId={comment._id}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Comment;