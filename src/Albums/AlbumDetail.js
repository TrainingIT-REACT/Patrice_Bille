import React, { useEffect } from "react";
import {connect} from "react-redux";
import AlbumViewDetail from "./AlbumViewDetail";
import {multimediaAction} from "../_actions/multimedia.action";

const AlbumDetail = ({ match, dispatch, data, loading, error }) => {
    const albumId = match.params.albumId;

    useEffect(() => {
        dispatch(multimediaAction.albumDetail(albumId));

        return function clear() {};
    }, []);

    const play = (payload) => {
        if (Array.isArray(payload)) {
            const songs = payload.map(song => ({ url: song.audio, title: song.name }));
            dispatch(multimediaAction.addSounds(songs));
            return;
        }

        dispatch(multimediaAction.addSounds([{ url: payload.audio, title: payload.name }]));
    };

    return (
        <section>
            <div className="container">
                <AlbumViewDetail playCallback={play} albumId={albumId} album={data} error={error} isLoading={loading} />
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    const { loading, data, error } = state.albumDetailReducer;

    return { loading, data, error };
};

export default connect(mapStateToProps)(AlbumDetail);