import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import {multimediaService} from "../_services/multimediaService";
import {formatSecondsTime} from "../_helpers";
import {multimediaAction} from "../_actions/multimedia.action";

const SongsResult = ({ dispatch, searchText }) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        multimediaService.search(searchText, 'songs').then((songs) => {
            setTracks(songs);
        });

        return function clear() {};
    }, [searchText]);

    const play = (e, item) => {
        e.preventDefault();
        dispatch(multimediaAction.addSounds([{ url: item.audio, title: item.name }]));
    };

    return (
        <>
            <table className="table table-striped">
                <tbody>
                { tracks && tracks.length > 0 && tracks.map(song => {
                    return (
                        <tr key={Math.random()}>
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

            { tracks && tracks.length === 0 && <div className="p-3 text-muted text-center">Empty track list</div> }
        </>
    );
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(SongsResult);