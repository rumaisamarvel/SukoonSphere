import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import {
  ProfileSidebar,
  QuestionModal,
  Spinner,
} from "@/components";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import customFetch from "@/utils/customFetch";
import QuestionCard from "./components/QuestionCard";
import { useUser } from "@/context/UserContext";


export const questionsAction = async ({ request }) => {
  const result = await request.formData();
  const questionText = result.get("questionText")
  const context = result.get("context")
  const tags = result.getAll("tags")

  try {
    const response = await customFetch.post("/qa-section", { questionText, context, tags });
    return { success: response.data.msg };
  } catch (error) {
    return { error: error?.response?.data?.msg || "An error occurred during posting question." };
  }
};

export const questionsLoader = async () => {
  try {
    const { data } = await customFetch.get("/qa-section");
    console.log({ data });
    return { questions: data.questions };
  } catch (error) {
    return { error: error?.response?.data?.msg || "An error occurred during fetching questions." };
  }
};

const QaSection = () => {
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();
  const { questions } = useLoaderData();

  const isLoading = navigation.state === "loading";

  const getAnswerByQuestionId = async (questionId) => {
    try {
      const { data } = await customFetch.get(`/qa-section/question/${questionId}/answers`);
      return data?.answers || [];
    } catch (error) {
      console.error('Error loading answers:', error);
      return [];
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {showToast && (
        <div className="toast toast-center toast-bottom z-50 fixed">
          <div className="alert alert-success">
            <span>Your question has been posted!</span>
          </div>
        </div>
      )}
      <div className="relative max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-2">
          {/* Left sidebar */}
          <div className="sticky top-[10%] col-span-3 h-screen overflow-y-auto">
            <ProfileSidebar
              username={user ? user.name : "Anonymous"}
              userTag="Mental Health Advocate"
              questionsPosted={33}
              answersPosted={44}
              savedItems={["Mindfulness Techniques", "Stress Reduction"]}
              recentItems={["Mental Health", "Mindfulness Practices"]}
              groups={["Mindfulness and Meditation", "Therapy Techniques"]}
              followedHashtags={["#mentalhealth", "#mindfulness", "#selfcare"]}
              events={["Mental Wellness Workshop", "Mindfulness Session"]}
            />
          </div>

          {/* Middle section */}
          <div className="col-span-6">
            {/* Header */}
            <div className="mb-3 text-center bg-white pb-4 rounded-[10px]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Have a Question or Insight? Share it with Us!
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-1"
                >
                  <FaQuestionCircle className="mr-2" />
                  Ask
                </button>
                <Link
                  to="/answer"
                  className="btn-2"
                >
                  <AiOutlineComment className="mr-2" />
                  Answer
                </Link>
              </div>
            </div>

            {/* Questions List */}
            {questions?.length > 0 ? (
              questions.map((question) => (
                <QuestionCard
                  question={question}
                  onLoadMore={getAnswerByQuestionId}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-[var(--primary-color)]">No questions available! Start asking questions.</p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          {/* <div className="sticky top-[10%] col-span-3 h-screen overflow-y-auto">
            <GroupsSidebar groups={groups} />
          </div> */}
        </div>

        {/* Question Modal */}
        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

export default QaSection;
