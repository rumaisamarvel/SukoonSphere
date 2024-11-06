import React, { Fragment, lazy, Suspense } from "react";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

// Lazy load components
const Podcasts = lazy(() => import("../components/homeComponents/Podcasts"));
const TopIntro = lazy(() => import("../components/homeComponents/TopIntro"));
const TodaysQuote = lazy(() => import("../components/homeComponents/TodaysQuote"));
const TodaysQuiz = lazy(() => import("../components/homeComponents/TodaysQuiz"));
const OurStory = lazy(() => import("../components/homeComponents/OurStory"));
const Infography = lazy(() => import("../components/homeComponents/Infography"));
const TrendingVideos = lazy(() => import("../components/homeComponents/TrendingVideos"));
const CampusPartners = lazy(() => import("../components/homeComponents/CampusPartners"));
const DisorderTags = lazy(() => import("../components/homeComponents/DisorderTags"));
const OurTeam = lazy(() => import("../components/homeComponents/OurTeam"));
const TrendingArticles = lazy(() => import("../components/homeComponents/TrendingArticles"));

const Home = () => {
  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <TopIntro />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <DisorderTags />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <OurStory />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TodaysQuote />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Infography />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TrendingArticles />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TodaysQuiz />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TrendingVideos />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Podcasts />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CampusPartners />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <OurTeam />
      </Suspense>
    </Fragment>
  );
};

export default Home;




