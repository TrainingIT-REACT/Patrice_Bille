import React, { useState, useEffect } from "react";
import {multimediaService} from "../_services/multimediaService";
import {NavLink} from "react-router-dom";
import {formatSecondsTime} from "../_helpers";
import {multimediaAction} from "../_actions/multimedia.action";
import {connect} from "react-redux";
import {API_URL} from "../_constants/app.constants";

/**
 * @param item
 * @param isArtist
 * @returns {*}
 * @constructor
 */
const View = ({ item, isArtist }) => {
    return (
        <div className="col-12 col-sm-5 col-lg-3 p-0">
            <div className="card">
                <NavLink to={`/album/${item.id}`}>
                    <img className="card-img-top" src={`${API_URL}/${item.cover}`} alt={item.name} />
                </NavLink>

                <div className="p-2 position-absolute" style={{ position: 'bottom', bottom: '2px', width: '100%' }}>
                    { true === isArtist ? (
                        <>
                            <h5 className="text-white mb-0">{item.artist}</h5>
                            <div className="text-white">{item.name}</div>
                        </>
                    ) : (
                        <h5 className="text-white mb-0">
                            <strong>{item.name}</strong>
                        </h5>
                    ) }
                </div>
            </div>
        </div>
    );
};

const DefaultResult = ({ dispatch, searchText }) => {
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        multimediaService.search(searchText).then(([Songs, Artists, Albums]) => {
            setTracks(Songs);
            setArtists(Artists);
            setAlbums(Albums);
        });

        return function clear() {};
    }, [searchText]);

    const play = (e, item) => {
        e.preventDefault();
        dispatch(multimediaAction.addSounds([{ url: item.audio, title: item.name }]));
    };

    return (
        <div className="">
            <h5>Artists</h5>
            <div className="pb-5">
                <div className="row">
                    { artists && artists.length > 0 && artists.map(artist => <View item={artist} isArtist={true} key={artist.id} />) }
                </div>
            </div>

            <h5>Albums</h5>
            <div className="pb-5">
                <div className="row">
                    { albums && albums.length > 0 && albums.map(album => <View item={album} isArtist={false} key={album.id} />) }
                </div>
            </div>

            <h5 className="mb-3">Songs</h5>
            <table className="table table-striped">
                <tbody>
                { tracks && tracks.length > 0 && tracks.map(song => {
                    return (
                        <tr key={song.id}>
                            <td className="text-left p-1" >
                                <button type="button" className="btn btn-light mr-2" onClick={e => play(e, song)}>Play</button>
                                <span className="text-dark">{song.name}</span>
                            </td>
                            <td className="text-right text-muted p-1">{formatSecondsTime(song.seconds)}</td>
                        </tr>
                    );
                }) }
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(DefaultResult);