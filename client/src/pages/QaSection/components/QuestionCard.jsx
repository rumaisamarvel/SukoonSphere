import React, { useState } from 'react';
import Answer from './Answer';
import DeleteModal from '@/components/shared/DeleteModal';
import customFetch from '@/utils/customFetch';
import { useUser } from '@/context/UserContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Like } from '@/components';

const QuestionCard = ({ question, onLoadMore }) => {
    console.log({ question })
    const [answers, setAnswers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useUser();
    const isAuthor = user?._id === question.author?.userId;

    const handleLoadMore = async () => {
        const loadedAnswers = await onLoadMore(question._id);
        setAnswers(loadedAnswers);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await customFetch.delete(`/qa-section/question/${question._id}`);
            setShowDeleteModal(false);
            window.location.reload();

        } catch (error) {
            console.error('Error deleting question:', error);
        } finally {
            setIsDeleting(false);
        }
    };
    // const handleLikeQuestion = async () => {
    //     try {
    //         await customFetch.patch(`/qa-section/question/${question._id}/like`);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // };

    return (
        <div
            key={question._id}
            className="mb-8 p-6 rounded-lg bg-white transition duration-300 shadow-1 hover:shadow-2"
        >
            <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center">
                    <img
                        src={question.author?.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWXzCSPkpN-TPug9XIsssvBxZQHkZEhjoGfg&s"}
                        alt={`${question.author?.username}'s avatar`}
                        className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500"
                    />
                    <div>
                        <p className="font-semibold text-[var(--primary)]">
                            {question.author?.username}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {/* {question.createdAt} */}
                            {new Date(Date.now()).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {isAuthor && (
                    <div className="relative">
                        <BsThreeDotsVertical
                            className="text-black cursor-pointer"
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

            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {question.questionText}
            </h2>
            <p className="text-gray-700 mb-4">{question.context}</p>

            <div className="flex flex-wrap mb-4">
                {question.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-3 py-1 rounded-full transition duration-200 hover:bg-blue-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            {/* <Like totalLikes={question.totalLikes} id={question._id} likes={question.likes} onLike={handleLikeQuestion} /> */}

            {/* Display most liked answer first */}
            {question.mostLikedAnswer && <Answer answer={question.mostLikedAnswer} />}

            {/* Display other answers only after loading more */}
            {answers.map((answer) => (
                <Answer key={answer._id} answer={answer} />
            ))}

            {answers.length < question.answers?.length
                && (
                    <button
                        className="text-blue-500"
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>

                )}

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                title="Delete Question"
                message="Are you sure you want to delete this question?"
                itemType="question"
                isLoading={isDeleting}
            />
        </div>

    );
};

export default QuestionCard;