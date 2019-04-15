import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import SearchResultStrategy from "./SearchResultViewStrategy";

const SearchPage = ({ location, match }) => {
    const [view, setView] = useState('default');

    const params = new URLSearchParams(location.search);
    const searchText = params.get('text');

    const generatePath = (path) => {
        const parts = match.path.split('/');
        return `/${parts[1]}${path ? `/${path}` : ''}`;
    };

    const activeLink = (path) => {
        const url = generatePath(path);
        return `${url === match.path ? 'text-danger font-weight-bold' : ''}`;
    };

    useEffect(() => {
        const parts = match.path.split('/');
        const viewType = parts[2] || 'default';

        setView(viewType);

        return function clear() {};
    }, [match.path]);

    return (
        <section>
            <div className="container">
                <h4 className="text-dark">
                    Search result for <strong className="text-secondary">{searchText}</strong>
                </h4>

                <div className="pt-3">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink
                                className={`nav-link text-secondary pl-0 ${activeLink()}`}
                                to={`${generatePath(null)}${location.search}`}>Best result</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={`nav-link text-secondary ${activeLink('songs')}`}
                                to={`${generatePath('songs')}${location.search}`}>Music</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={`nav-link text-secondary ${activeLink('artists')}`}
                                to={`${generatePath('artists')}${location.search}`}>Artists</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={`nav-link text-secondary ${activeLink('albums')}`}
                                to={`${generatePath('albums')}${location.search}`}>Albums</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <hr/>

            <div className="container pt-4">
                <SearchResultStrategy viewType={view} searchText={searchText} />
            </div>
        </section>
    );
};

export default SearchPage;