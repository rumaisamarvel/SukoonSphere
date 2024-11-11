import React, { lazy, Suspense } from 'react';
const Home = lazy(() => import('../pages/Home'));
const QaSection = lazy(() => import('../pages/QaSection/QaSection'));
const Articles = lazy(() => import('../pages/articles/Articles'));
const Posts = lazy(() => import('../pages/posts/Posts'));
const Answer = lazy(() => import('../pages/answer/Answer'));
const Article = lazy(() => import('../pages/articles/Article'));

// Keep the loader as is
import { ArticlesLoader } from '../pages/articles/Articles';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { questionsAction, questionsLoader } from '@/pages/QaSection/QaSection';
import { answerAction, answersLoader } from '@/pages/answer/Answer';
import AllPosts, { allPostsAction, allPostsLoader } from '@/pages/posts/AllPosts';
import SinglePost, { singlePostLoader } from '@/pages/posts/SinglePost';

export const homeRoutes = [
    {
        index: true,
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Home />
            </Suspense>
        ),
    },
    {
        path: '/QA-section',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <QaSection />
            </Suspense>
        ),
        action: questionsAction,
        loader: questionsLoader
    },
    {
        path: '/answer',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Answer />
            </Suspense>
        ),
        loader: answersLoader,
        action: answerAction
    },
    {
        path: '/articles',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Articles />
            </Suspense>
        ),
        loader: ArticlesLoader,
    },
    {
        path: '/articles/article',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Article />
            </Suspense>
        ),
    },
    {
        path: '/posts',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Posts />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AllPosts />
                    </Suspense>
                ),
                loader: allPostsLoader,
                action: allPostsAction
            },
            {
                path: '/posts/:id',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <SinglePost />
                    </Suspense>
                ),
                loader: singlePostLoader
            },
        ],

    },

];
