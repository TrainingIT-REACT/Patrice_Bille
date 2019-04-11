import React, { Fragment, useEffect, useState } from "react";
import {connect} from "react-redux";
import {multimediaAction} from "../../_actions/multimedia.action";
import {ListAlbums, TopArtist} from "./recommendationsViews";

const Recommendations = ({ dispatch, recommendations, albums }) => {
    const [showRecommendations, canShowRecommendations] = useState(false);
    const [showBestAlbums, canShowBestAlbums] = useState(false);

    setTimeout(() => {
        canShowRecommendations(true);
        canShowBestAlbums(true);
    }, 1899);

    useEffect(() => {
        dispatch(multimediaAction.listRecommendations());
        dispatch(multimediaAction.listBestAlbums(1));

        return function clear() { };
    }, []);

    return (
        <Fragment>
            <section>
                <div className="container">
                    <h2 className="pb-4">Top Artists</h2>

                    { !showRecommendations && <div className="text-muted text-center">Loading top artist list</div> }

                    <div className="row">
                        { showRecommendations && recommendations.data.map(item => {
                            return <TopArtist item={item} key={item.id} />;
                        }) }
                    </div>
                </div>
            </section>

            <section className="pt-5">
                <div className="container">
                    <h2 className="pb-4">Best albums</h2>

                    { !showBestAlbums && <div className="text-muted text-center">Loading best album list</div> }

                    <div className="row">
                        { showBestAlbums && albums.data.map(album => {
                            return <ListAlbums album={album} key={album.id} />;
                        }) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

const mapStateToProps = state => {
    const getStates = (state) => {
        const { loading, data, error } = state;

        return {
            loading, data, error
        };
    };

    const recommendations = getStates(state.recommendationReducer);
    const albums = getStates(state.bestAlbumsReducer);

    return {
        recommendations,
        albums
    };
};

const connectedRecommendations = connect(mapStateToProps)(Recommendations);
export {connectedRecommendations as default}