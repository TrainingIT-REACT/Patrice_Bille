import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {userActions} from "../_actions/user.actions";
import {connect} from "react-redux";
import AudioPlayer from "react-responsive-audio-player";

import 'react-responsive-audio-player/dist/audioplayer.css';

const controls = [ 'spacer', 'backskip', 'playpause', 'forwardskip', 'spacer', 'progress' ];
const onMediaEvent = {
    "loadeddata": (e) => {
        setTimeout(() => e.target.play(), 99);
    }
};

const Header = ({ dispatch, playlist }) => {

    useEffect(() => {
        return function clear() {};
    }, [playlist]);

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    return (
        <header className="fixed-top bg-dark pb-2 pt-1 px-2">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-8 pt-1">
                    <AudioPlayer
                        playlist={[...playlist].concat([])}
                        controls={controls}
                        cycle={false}
                        onMediaEvent={onMediaEvent}
                        style={{
                            background: '#343a40',
                            color: '#444',
                            opacity: playlist.length === 0 ? .3 : 1
                        }} />
                </div>

                <div className="col-4 d-flex justify-content-end align-items-center">
                    <a className="text-white" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img"
                             viewBox="0 0 24 24" focusable="false"><title>Search</title>
                            <circle cx="10.5" cy="10.5" r="7.5"/>
                            <path d="M21 21l-5.2-5.2"/>
                        </svg>
                    </a>

                    <NavLink exact className="text-link pr-3" activeClassName="text-danger" to="/">Reactify</NavLink>
                    <NavLink exact className="text-link pr-3" activeClassName="text-danger" to="/albums">Albums</NavLink>
                    <NavLink exact className="text-link pr-3" activeClassName="text-danger" to="/me">Me</NavLink>
                    <NavLink className="text-link" to="/login" onClick={onLogout}>&times; Logout</NavLink>
                </div>
            </div>
        </header>
    );
};

/**
 * @param state
 * @returns {{loggedIn: loginReducer.loggedIn}}
 */
const mapStateToProps = state => {
    const { loggedIn } = state.loginReducer;
    const { playlist } = state.playerReducer;

    return { loggedIn, playlist };
};

export default connect(mapStateToProps)(Header);