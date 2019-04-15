import React, { useState, useEffect } from "react";
import { history } from "../_helpers";

const SearchBar = ({ hide, hideCallback }) => {
    const input$ = React.createRef();
    const [error, setError] = useState(false);

    const hideSearchBar = (e) => {
        e.preventDefault();
        setError(false);
        hideCallback(true);
    };

    const doSearch = (e) => {
        e.preventDefault();

        if (input$.current.value.length === 0) {
            setError(true);
            return;
        }

        setError(false);
        history.push(`/search?text=${encodeURI(input$.current.value)}`);
    };

    useEffect(() => {
        if (false === hide) {
            input$.current.focus();
        }

        return function clear() {};
    }, [hide]);

    return (
        <div className={`fixed-top pt-1 pb-3 bg-white ${hide === true ? 'd-none' : ''}`}>
            <div className="input-group input-group-lg py-1 border-bottom border-top">
                <input
                    className="form-control border-0"
                    placeholder="Type something"
                    aria-label="Search songs and albums"
                    aria-describedby="search-input"
                    type="text" ref={input$} />

                <div className="input-group-append bg-white btn-group-lg">
                    { error === true && <span role="button" className="btn btn-white border-0 text-danger">Type at least one character</span> }
                    <button className="btn btn-light text-secondary" type="button" onClick={doSearch}>Search</button>
                    <button className="btn btn-light text-muted" type="button" onClick={hideSearchBar}>&times;</button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;