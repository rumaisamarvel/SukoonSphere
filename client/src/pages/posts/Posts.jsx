import React, { useState } from 'react';
import { GroupsSidebar, ProfileSidebar } from '@/components';
import { PostModal } from '@/components';
import { useAuth0 } from '@auth0/auth0-react';
import customFetch from '@/utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import PostCard from '@/components/posts/PostCard';

export const postsAction = async ({ request }) => {
  const result = await request.formData();
  try {
    const response = await customFetch.post("/posts", result);
    console.log({ response });
    window.location.href = '/posts';
    return { success: response.data.msg };
  } catch (error) {
    console.log({ error });
    return { error: error?.response?.data?.msg || "An error occurred during signup." };
  }
  return null;
};

export const postsLoader = async () => {
  try {
    const { data } = await customFetch.get("/posts");
    console.log({ data });
    return { posts: data };
  } catch (error) {
    console.log(error);
    return { error: error?.response?.data?.msg || "Could not fetch posts." };
  }
  return null;
};

const Posts = () => {
  const { user } = useAuth0();
  const { posts: _posts } = useLoaderData();
  const [posts, setPosts] = useState(_posts.posts);
  const [showModal, setShowModal] = useState(false);

  const groups = [
    {
      id: 1,
      name: 'Mindfulness Practices 🧘‍♂️',
      image: 'https://example.com/image_mindfulness.jpg',
    },
    {
      id: 2,
      name: 'Coping with Anxiety 💭',
      image: 'https://example.com/image_anxiety.jpg',
    },
    {
      id: 3,
      name: 'Therapy Techniques 📖',
      image: 'https://example.com/image_therapy.jpg',
    },
    {
      id: 4,
      name: 'Depression Support Group ❤️',
      image: 'https://example.com/image_depression.jpg',
    },
    {
      id: 5,
      name: 'Stress Management Workshops 🌱',
      image: 'https://example.com/image_stress.jpg',
    }
  ];

  const handlePostDelete = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 mt-2">
      <div className='grid grid-cols-12 gap-2'>
        {/* Left Sidebar - Groups */}
        <div className="rounded-[10px] shadow-sm hidden lg:block lg:col-span-3 sticky top-[10%] h-screen overflow-y-auto">
          <GroupsSidebar groups={groups} />
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          {/* Add Post Card */}
          <div className=" mb-6 p-4 sm:p-6 bg-blue-50 rounded-[10px] shadow-sm text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Share Your Thoughts!</h2>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              Got something on your mind? Share your experiences, tips, and thoughts with the community.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="action-button w-full sm:w-auto"
            >
              Add Post
            </button>
          </div>

          {/* Posts List */}
          {posts?.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onPostDelete={handlePostDelete}
              />
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-[10px] shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
              <p className="text-gray-600">Be the first one to share your thoughts with the community!</p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Profile */}
        <div className="hidden shadow-sm lg:block lg:col-span-3 sticky top-[10%] h-screen overflow-y-auto rounded-[10px]">
          <ProfileSidebar
            username={user ? user.name : "Anonymous"}
            userTag="Mental Health Advocate"
            questionsPosted={33}
            answersPosted={44}
            savedItems={['Mindfulness Techniques', 'Stress Reduction']}
            recentItems={['Mental Health', 'Mindfulness Practices']}
            groups={['Mindfulness and Meditation', 'Therapy Techniques']}
            followedHashtags={['#mentalhealth', '#mindfulness', '#selfcare']}
            events={['Mental Wellness Workshop', 'Mindfulness Session']}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && <PostModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Posts;
