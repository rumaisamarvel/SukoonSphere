import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
const ProfessionalsProfile = lazy(() => import('../pages/professionalProfile/ProfessionalsProfile'));
const UserProfile = lazy(() => import('../pages/about/UserProfile'));
const UserPosts = lazy(() => import('../components/user/userProfile/UserPosts'));
const UserAnswers = lazy(() => import('../components/user/userProfile/UserAnswers'));
const UserFollowers = lazy(() => import('../components/user/userProfile/UserFollowing'));
const UserFollowing = lazy(() => import('../components/user/userProfile/UserFollowing'));

export const userRoutes = [
    {
        path: '/user-profile/:id',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <ProfessionalsProfile />
            </Suspense>
        ),
    },
    {
        path: 'about/user',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <UserProfile />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserPosts />
                    </Suspense>
                ),
            },
            {
                path: 'answers',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserAnswers />
                    </Suspense>
                ),
            },
            {
                path: 'followers',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserFollowers />
                    </Suspense>
                ),
            },
            {
                path: 'following',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserFollowing />
                    </Suspense>
                ),
            },
        ],
    },
];