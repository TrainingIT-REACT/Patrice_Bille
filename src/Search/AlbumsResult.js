import React, { useState, useEffect } from "react";
import {multimediaService} from "../_services/multimediaService";
import {NavLink} from "react-router-dom";
import {API_URL} from "../_constants/app.constants";

const AlbumsResult = ({ searchText }) => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        multimediaService.search(searchText, 'albums').then((albums) => {
            setAlbums(albums);
        });

        return function clear() {};
    }, [searchText]);

    return (
        <div className="row">
            { albums && albums.length > 0 && albums.map(album => {
                return (
                    <div className="col-6 col-lg-3" key={album.id}>
                        <div className="card border-0 pb-2">
                            <NavLink to={`/album/${album.id}`} className="text-dark">
                                <img className="card-img-top" src={`${API_URL}/${album.cover}`} alt={album.name} />
                            </NavLink>
                            <div className="card-body px-0 py-3">
                                <h5 className="card-title" style={{fontSize: '14px'}}>
                                    <NavLink to={`/album/${album.id}`} className="text-dark">{album.name}</NavLink>
                                </h5>
                                <p className="card-text text-muted">{album.artist}</p>
                            </div>
                        </div>
                    </div>
                )
            }) }

            { albums && albums.length === 0 && <div className="p-3 text-muted text-center">Albums list's empty</div> }
        </div>
    );
};

export default AlbumsResult;