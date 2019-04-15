import React from "react";
import {API_URL} from "../_constants/app.constants";
import {NavLink} from "react-router-dom";
import {formatSecondsTime} from "../_helpers";

/**
 * @param playCallback
 * @param albumId
 * @param album
 * @param error
 * @param isLoading
 * @returns {null|*}
 * @constructor
 */
const AlbumViewDetail = ({ playCallback, albumId, album, error, isLoading }) => {
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
                                    <NavLink className="text-dark" to="#" onClick={e => addSound(e, song)}>{song.name}</NavLink>
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

export default AlbumViewDetail;