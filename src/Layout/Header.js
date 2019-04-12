import React from 'react';
import { NavLink } from "react-router-dom";
import {userActions} from "../_actions/user.actions";
import {connect} from "react-redux";

const Header = ({ dispatch, loggedIn }) => {
    const onLogout = () => {
        dispatch(userActions.logout());
    };

    return (
        <header className="fixed-top bg-dark py-3 px-2">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-4 pt-1">
                    <a className="text-white" href="#">[Player]</a>
                </div>
                <div className="col-2 text-center">
                    <NavLink className="blog-header-logo text-white" to="/">Reactify</NavLink>
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
    return { loggedIn };
};

export default connect(mapStateToProps)(Header);