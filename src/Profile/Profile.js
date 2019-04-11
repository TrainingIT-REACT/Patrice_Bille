import React from "react";
import {connect} from "react-redux";

const Profile = () => {
    return (
        <div className="container">Profile!!</div>
    );
};

const mapStateToProps = state => {
    const { user } = state.userReducer;

    return { user };
};

const connectedProfile = connect(mapStateToProps)(Profile);
export {connectedProfile as default}