import React, { Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import NoMatch from "../Layout/NoMatch";

const Home = React.lazy(() => import(/* webpackChunkName: "search-page" */ '../Home/Home'));
const Profile = React.lazy(() => import(/* webpackChunkName: "search-page" */ '../Profile/Profile'));
const Albums = React.lazy(() => import(/* webpackChunkName: "search-page" */ '../Albums/Albums'));
const AlbumDetail = React.lazy(() => import(/* webpackChunkName: "search-page" */ '../Albums/AlbumDetail'));
const SearchPage = React.lazy(() => import(/* webpackChunkName: "search-page" */ '../Search/SearchPage'));

const RestrictedArea = () => {
    return (
        <Fragment>
            <Header />

            <main role="main" className="pt-5 my-5">
                <Suspense fallback="loading...">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/me" component={Profile}/>
                        <Route exact path="/albums" component={Albums}/>
                        <Route exact path="/album/:albumId" component={AlbumDetail}/>
                        <Route exact path={['/search', '/search/artists', '/search/songs', '/search/albums']} component={SearchPage}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Suspense>
            </main>

            <Footer />
        </Fragment>
    );
};

export default RestrictedArea;