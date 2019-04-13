import React, { useEffect } from "react";
import {connect} from "react-redux";
import {formatSecondsTime} from "../_helpers/utils";
import {multimediaAction} from "../_actions/multimedia.action";
import {API_URL} from "../_constants/app.constants";

/**
 * @param playCallback
 * @param albumId
 * @param album
 * @param error
 * @param isLoading
 * @returns {null|*}
 * @constructor
 */
const ViewDetail = ({ playCallback, albumId, album, error, isLoading }) => {
    if (!albumId || isNaN(albumId)) {
        return <div className="alert alert-danger">Invalid album id { albumId }</div>;
    }

    if (true === isLoading) {
        return <div className="text-center text-muted">Loading albums</div>;
    }

    if (error === true) {
        return <div className="text-center alert alert-danger">Can not load albums list</div>;
    }

    if(typeof album !== 'object') {
        return null;
    }

    /**
     * @param event
     * @param song
     */
    const addSound = (event, song) => {
        event.preventDefault();
        playCallback(song);
    };

    const playAlbum = (event) => {
        event.preventDefault();
        playCallback(album.songs);
    };

    return (
        <div className="row">
            <div className="col-4 text-center">
                <div className="">
                    <img src={`${API_URL}/${album.cover}`} alt={album.name} className="img-fluid" />
                </div>
                <div className="text-dark pt-3 pb-2">{ album.name }</div>
                <div className="text-muted">{ album.artist }</div>
                <p className="pt-3">
                    <button type="button" className="btn btn-success btn-lg" onClick={playAlbum}>Play album</button>
                </p>
            </div>
            <div className="col-8 text-left pr-0">
                <table className="table table-striped">
                    <tbody>
                    { album && album.songs && album.songs.map(song => {
                        return (
                            <tr key={song.id}>
                                <td className="text-left" >
                                    <a className="text-dark" href="#" onClick={e => addSound(e, song)}>{song.name}</a>
                                </td>
                                <td className="text-right text-muted">{formatSecondsTime(song.seconds)}</td>
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

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
                <ViewDetail playCallback={play} albumId={albumId} album={data} error={error} isLoading={loading} />
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    const { loading, data, error } = state.albumDetailReducer;

    return { loading, data, error };
};

export default connect(mapStateToProps)(AlbumDetail);