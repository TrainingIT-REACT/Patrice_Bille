import React, {Suspense, lazy} from "react";

const RecommendationPage = lazy(() => import(/* webpackChunkName: "artists-recommendations" */ './Recommendations/Recommendations'));

const Home = () => {
    return (
        <Suspense fallback={<div className="container text-center text-muted">Loading recommendations page</div>}>
            <RecommendationPage />
        </Suspense>
    );
};

export default Home;