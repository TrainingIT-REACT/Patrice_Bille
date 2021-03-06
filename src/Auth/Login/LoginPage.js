import React, { useEffect} from 'react';
import { connect } from 'react-redux';

import { userActions } from "../../_actions/user.actions";
import "./login.css";

const htmlSelector$ = document.querySelector('html');

const LoginPage = ({ dispatch, loggingIn, error }) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    useEffect(() => {
        htmlSelector$.classList.add('login-page');

        return function cleanup() {
            htmlSelector$.classList.remove('login-page')
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.login(emailRef.current.value, passwordRef.current.value));
    };

    return (
        <div className="container-fluid login-page">
            <div className="container">
                <form className="form-signin" onSubmit={onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center pb-3">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required ref={emailRef} />

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required ref={passwordRef} />

                    {
                        error && error.message && <div className={`alert ${error.type} my-3`}>{error.message}</div>
                    }

                    <div className="pt-3">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={loggingIn}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const { loggingIn } = state.loginReducer;
    const { type, message } = state.notifyReducer

    return {
        loggingIn,
        error: { type, message }
    };
};

export default connect(mapStateToProps)(LoginPage);