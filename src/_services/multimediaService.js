import {API_QUERY_LIMIT, API_URL} from "../_constants/app.constants";
import {getUniqueItems} from "../_helpers";

/**
 * @param paths
 * @param query
 * @returns {string}
 */
const _buildApiUrl = (paths = [], query = null) => {
    paths = !Array.isArray(paths) ? [paths] : paths;

    return `${API_URL}/${paths.join('/')}${null === query ? '' : `?${query}`}`;
};

/**
 * @returns {Promise<any>}
 */
const fetchAlbums = (page = 1) => {
    page = page < 1 ? 1 : page;
    const url = _buildApiUrl(['albums'], `_page=${page}&_limit=${API_QUERY_LIMIT}`);

    return fetch(url)
        .then(res => res.json());
};

/**
 * @param id
 * @param addSong
 * @returns {Promise<any>}
 */
const fetchAlbum = (id, addSong = true) => {
    const addQuery = addSong === true ? '_embed=songs' : '';
    const url = _buildApiUrl(['albums', id], addQuery);

    return fetch(url)
        .then(res => res.json());
};

/**
 * @param id
 * @returns {Promise<any>}
 */
const fetchSong = (id) => {
    const url = _buildApiUrl(['songs', id], '_expand=album');

    return fetch(url)
        .then(res => res.json());
};

/**
 * @returns {Promise<any>}
 */
const fetchMostVotedAlbums = () => {
    const url = _buildApiUrl(['albums_votes'], '_expand=album&_sort=vote&_order=desc');

    return fetch(url)
        .then(res => res.json());
};

/**
 * @param text
 * @param type
 * @returns {Promise<any | Response>|Promise<any[] | Response[]>|Promise<*[] | Response>}
 */
const doSearch = (text, type = 'default') => {
    if (type === 'songs') {
        const _songsUrl = _buildApiUrl(['songs'], `q=${text}&_limit=20`);
        return fetch(_songsUrl).then(res => res.json());
    } else if (type === 'albums') {
        const _albumsUrl = _buildApiUrl(['albums'], `q=${text}&_limit=15`);
        return fetch(_albumsUrl).then(res => res.json());
    } else if (type === 'artists') {
        const _artistUrl = _buildApiUrl(['albums'], `artist_like=${text}&_limit=8`);
        return fetch(_artistUrl).then(async (res) => {
            const data = await res.json();
            return getUniqueItems(data, 'artist');
        });
    }

    const songsUrl = _buildApiUrl(['songs'], `q=${text}&_limit=10`);
    const artistUrl = _buildApiUrl(['albums'], `artist_like=${text}&_limit=8`);
    const albumsUrl = _buildApiUrl(['albums'], `q=${text}&_limit=8`);

    return Promise.all([
        fetch(songsUrl),
        fetch(artistUrl),
        fetch(albumsUrl),
    ]).then(async ([songs, artists, albums]) => {
        const waitSongs = await songs.json();
        const waitArtists = await artists.json();
        const waitAlbums = await albums.json();

        return [
            waitSongs,
            getUniqueItems(waitArtists, 'artist'),
            waitAlbums
        ];
    });
};

/**
 * @returns {Promise<any>}
 */
const fetchMostVotedSongs = () => {
    const url = _buildApiUrl(['songs_votes'], '_expand=song&_sort=vote&_order=desc&_limit=12');

    return fetch(url)
        .then(res => res.json());
};

export const multimediaService = {
    listAlbums: fetchAlbums,
    albumDetail: fetchAlbum,
    songDetail: fetchSong,
    mostVotedAlbums: fetchMostVotedAlbums,
    mostVotedSongs: fetchMostVotedSongs,
    search: doSearch
};