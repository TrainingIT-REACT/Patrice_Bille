import React from "react";
import {connect} from "react-redux";

const AlbumSongs = () => {
    return (
        <div className="container">Album songs</div>
    );
};

const mapStateToProps = state => {
    // const { loggingIn } = state.loginReducer;

    return { };
};

const connectedAlbumSong = connect(mapStateToProps)(AlbumSongs);
export {connectedAlbumSong as default}