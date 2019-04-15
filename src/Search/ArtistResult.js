import React, { useEffect, useState } from "react";
import {multimediaService} from "../_services/multimediaService";
import {API_URL} from "../_constants/app.constants";
import {NavLink} from "react-router-dom";

const ArtistResult = ({ searchText }) => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        multimediaService.search(searchText, 'artists').then((artists) => {
            setArtists(artists);
        });

        return function clear() {};
    }, [searchText]);

    return (
        <>
            <ul className="list-unstyled">
                { artists && artists.length > 0 && artists.map(artist => {
                    return (
                        <li className="media pb-2" key={Math.random()}>
                            <NavLink to={`/album/${artist.id}`}>
                                <img className="mr-3" src={`${API_URL}/${artist.cover}`} alt={artist.artist} style={{ width: '66px' }} />
                            </NavLink>
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">
                                    <NavLink to={`/album/${artist.id}`} className="text-dark">
                                        {artist.artist}
                                    </NavLink>
                                </h5>
                                <div className="text-muted">{artist.name}</div>
                            </div>
                        </li>
                    );
                }) }
            </ul>

            { artists && artists.length === 0 && <div className="p-3 text-muted text-center">Empty artist list</div> }
        </>
    );
};

export default ArtistResult;
