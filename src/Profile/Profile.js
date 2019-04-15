import React, { useEffect } from "react";
import {connect} from "react-redux";
import {userActions} from "../_actions/user.actions";

const Profile = ({ dispatch, user }) => {
    useEffect(() => {
        dispatch(userActions.getUser());

        return function clear() {};
    }, []);

    return (
        <section>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="card" style={{ width: '20rem' }}>
                        <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/en/1/15/Diddy_-_Press_Play.jpg" alt="Me" />
                        <div className="card-body">
                            {user && user.email && <p className="text-dark">{user.user}</p>}
                            {user && user.email && <p className="text-muted">{ user.email }</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    const { user } = state.userReducer;

    return { user };
};

export default connect(mapStateToProps)(Profile);