import React from "react";
import {API_URL} from "../../_constants/app.constants";
import {NavLink} from "react-router-dom";

const TopArtist = ({ item }) => {
    return (
        <div className="col-4 col-lg-2">
            <div className="card border-0">
                <img className="card-img-top rounded-circle"
                     alt={item.song.name}
                     src={`${API_URL}/${item.album.cover}`} />
                <div className="card-body">
                    <div className="card-title">
                        <a href="#" className="text-dark font-weight-bold" style={{fontSize: '14px'}}>{item.song.name}</a>
                    </div>
                    <p className="card-text text-muted" style={{fontSize: '14px'}}>{item.album.artist}</p>
                </div>
            </div>
        </div>
    );
};

const ListAlbums = ({ album }) => {
    return (
        <div className="col-4 col-lg-2">
            <div className="card border-0">
                <NavLink to={`/album/${album.id}`}>
                    <img className="card-img-top rounded-circle"
                         alt={album.name}
                         src={`${API_URL}/${album.cover}`} />
                </NavLink>
                <div className="card-body">
                    <div className="card-title">
                        <NavLink to={`/album/${album.id}`} className="text-dark font-weight-bold" style={{fontSize: '14px'}}>{album.name}</NavLink>
                    </div>
                    <p className="card-text text-muted" style={{fontSize: '14px'}}>{album.artist}</p>
                </div>
            </div>
        </div>
    );
};


export {
    TopArtist,
    ListAlbums
}