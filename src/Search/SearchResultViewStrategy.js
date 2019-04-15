import React from "react";

const SearchResultViewStrategy = ({ viewType, searchText }) => {
    let Component;
    switch (viewType) {
        case "artists":
            Component = React.lazy(() => import(/* webpackChunkName: "search-artists-result" */ './ArtistResult'));
            break;
        case "albums":
            Component = React.lazy(() => import(/* webpackChunkName: "search-albums-result" */ './AlbumsResult'));
            break;
        case "songs":
            Component = React.lazy(() => import(/* webpackChunkName: "search-songs-result" */ './SongsResult'));
            break;
        default:
            Component = React.lazy(() => import(/* webpackChunkName: "search-default-result" */ './DefaultResult'));
    }

    return (
        <React.Suspense fallback="">
            <Component searchText={searchText} />
        </React.Suspense>
    );
};

export default SearchResultViewStrategy;