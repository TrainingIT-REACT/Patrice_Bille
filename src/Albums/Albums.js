import React, { useEffect } from "react";
import {connect} from "react-redux";
import {multimediaAction} from "../_actions/multimedia.action";
import {API_URL} from "../_constants/app.constants";
import {NavLink} from "react-router-dom";

const Albums = ({ dispatch, loading, data, error }) => {
    useEffect(() => {
        dispatch(multimediaAction.listAlbums(1));

        return function clear() {};
    }, []);

    return (
        <section>
            <div className="container">
                <h2 className="pb-4">Albums</h2>

                { loading === true && <div className="text-center text-muted">Loading albums</div> }

                { error === true && <div className="text-center alert alert-danger">Can not load albums list</div> }

                <div className="row">
                    { data && data.map(album => {
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
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    const { data, loading, error } = state.albumsReducer;

    return { loading, data, error};
};

const connectedAlbums = connect(mapStateToProps)(Albums);
export {connectedAlbums as default}