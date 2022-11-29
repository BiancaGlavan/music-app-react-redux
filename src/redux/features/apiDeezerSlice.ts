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
}

interface IPlaylistsResponse {
    data: IPlaylist[];
    total: number;
}

export const deezerApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mighty-sands-34031.herokuapp.com/https://api.deezer.com/',
    }),
    endpoints: (builder) => ({

        getArtistById: builder.query<IArtist, number | string>({
            query: (artistId: number | string) => `artist/${artistId}`,
        }),
        getRelatedArtists: builder.query<IRelatedArtistsResponse, number | string>({
            query: (artistId: number | string) => `artist/${artistId}/related`
        }),
        getArtistPlaylists: builder.query<IPlaylistsResponse, number | string>({
            query: (artistId: number | string) =>`artist/${artistId}/playlists`
        })

       
    }),
});

export const {
    useGetArtistByIdQuery,
    useGetRelatedArtistsQuery,
    useGetArtistPlaylistsQuery,
} = deezerApi;

export default deezerApi;