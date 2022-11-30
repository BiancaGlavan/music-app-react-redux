import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface IArtist {
    name: string;
    picture_big: string;
    nb_album: number;
    nb_fan: number;
    picture: string;
    type: string;
    id: number;
}

interface IRelatedArtistsResponse {
    data: IArtist[];
    total: number;
}

interface IUser {
    name: string;
}

export interface IPlaylist {
    id: number;
    title: string;
    picture: string;
    user: IUser;
    picture_medium: string;
}

interface IArtistPlaylistsResponse {
    data: IPlaylist[];
    total: number;
}

interface IAlbum {
    id: number;
    title: string;
    cover: string;
    cover_medium: string;
    cover_small: string;
}

interface ISong {
    id: number;
    title: string;
    preview: string;
    explicit_lyrics: boolean;
    type: string;
    duration: number;
    album: IAlbum;
}

interface IArtistTopSongsResponse {
    data: ISong[];
    total: number;
}

export interface IArtistAlbum extends IAlbum {
    genre_id: number;
    fans: number;
    release_date: string;
    type: string;
}

interface IArtistAlbumsResponse {
    data: IArtistAlbum[];
    total: number;
}

export const deezerApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cors-anywhere-iw1d.onrender.com/https://api.deezer.com/',
    }),
    endpoints: (builder) => ({

        getArtistById: builder.query<IArtist, number | string>({
            query: (artistId: number | string) => `artist/${artistId}`,
        }),
        getRelatedArtists: builder.query<IRelatedArtistsResponse, number | string>({
            query: (artistId: number | string) => `artist/${artistId}/related`
        }),
        getArtistPlaylists: builder.query<IArtistPlaylistsResponse, number | string>({
            query: (artistId: number | string) =>`artist/${artistId}/playlists`
        }),
        getArtistTopSongs: builder.query<IArtistTopSongsResponse, number | string>({
            query: (artistId: number | string) =>`artist/${artistId}/top`
        }),
        getArtistAlbums: builder.query<IArtistAlbumsResponse, number | string>({
            query: (artistId: number | string) =>`artist/${artistId}/albums`
        }),

       
    }),
});

export const {
    useGetArtistByIdQuery,
    useGetRelatedArtistsQuery,
    useGetArtistPlaylistsQuery,
    useGetArtistAlbumsQuery,
    useGetArtistTopSongsQuery,
} = deezerApi;

export default deezerApi;