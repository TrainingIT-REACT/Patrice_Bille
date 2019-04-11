import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Layout/Header";
import Home from "../Home/Home";
import Footer from "../Layout/Footer";
import Profile from "../Profile/Profile";
import Albums from "../Albums/Albums";
import AlbumDetail from "../Albums/AlbumDetail";
import AlbumSongs from "../Albums/AlbumSongs";
import NoMatch from "../Layout/NoMatch";

const RestrictedArea = () => {
    return (
        <Fragment>
            <Header />

            <main role="main" className="pt-5 my-5">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/me" component={Profile}/>
                    <Route exact path="/albums" component={Albums}/>
                    <Route exaxt path="/album/:albumId" component={AlbumDetail}/>
                    <Route exact path="/song:/songId" component={AlbumSongs}/>
                    <Route component={NoMatch}/>
                </Switch>
            </main>

            <Footer />
        </Fragment>
    );
};

export default RestrictedArea;