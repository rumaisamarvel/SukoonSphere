// src/routes.js or src/AppRoutes.js

import React, { lazy, Suspense } from 'react';
import { homeRoutes } from './homeRoutes';
import { userRoutes } from './userRoutes';
import { mediaRoutes } from './mediaRoutes';
import { aboutRoutes } from './aboutRoutes';
import { authRoutes } from './authRoutes';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const HomeLayout = lazy(() => import('@/layouts/HomeLayout'));

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomeLayout />
      </Suspense>
    ),
    children: [
      ...homeRoutes,
      ...userRoutes,
      ...mediaRoutes,
      ...aboutRoutes,
    ],
  },
  ...authRoutes,
];
