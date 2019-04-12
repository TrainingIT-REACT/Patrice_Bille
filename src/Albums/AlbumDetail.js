import React, { useEffect } from "react";
import {connect} from "react-redux";
import {formatSecondsTime} from "../_helpers/utils";
import {multimediaAction} from "../_actions/multimedia.action";
import {API_URL} from "../_constants/app.constants";

/**
 * @param albumId
 * @param album
 * @param error
 * @param isLoading
 * @returns {null|*}
 * @constructor
 */
const ViewDetail = ({ albumId, album, error, isLoading }) => {

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

    return (
        <div className="row">
            <div className="col-4 text-center">
                <div className="">
                    <img src={`${API_URL}/${album.cover}`} alt={album.name} className="img-fluid" />
                </div>
                <div className="text-dark pt-3 pb-2">{ album.name }</div>
                <div className="text-muted">{ album.artist }</div>
            </div>
            <div className="col-8 text-left pr-0">
                <table className="table table-striped">
                    <tbody>
                    { album && album.songs && album.songs.map(song => {
                        return (
                            <tr key={song.id}>
                                <td className="text-left"  scope="row">{song.name}</td>
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

    return (
        <section>
            <div className="container">
                <ViewDetail albumId={albumId} album={data} error={error} isLoading={loading} />
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    const { loading, data, error } = state.albumDetailReducer;

    return { loading, data, error };
};

export default connect(mapStateToProps)(AlbumDetail);