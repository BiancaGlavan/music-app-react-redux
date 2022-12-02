import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface IArtist {
    id: number;
    name: string;
    picture_big: string;
    nb_album: number;
    nb_fan: number;
    picture: string;
    type: string;

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

interface ISongAlbum {
    id: number;
    title: string;
    cover: string;
    cover_medium: string;
    cover_small: string;
}

export interface ISong {
    id: number;
    title: string;
    preview: string;
    explicit_lyrics: boolean;
    type: string;
    duration: number;
    album: ISongAlbum;
    artist: {
        id: number;
        name: string;
    };
}

interface IArtistTopSongsResponse {
    data: ISong[];
    total: number;
}

export interface IArtistAlbum extends ISongAlbum {
    genre_id: number;
    fans: number;
    release_date: string;
    type: string;
}

interface IArtistAlbumsResponse {
    data: IArtistAlbum[];
    total: number;
}

export type IChartsArtist  = Omit<IArtist, "nb_fan" | "nb_album">;

export interface IChartsAlbum extends ISongAlbum {
    artist: IChartsArtist;
}

export interface IChartsPlaylist extends IPlaylist {
    public: boolean;
    nb_tracks: number;
    creation_date: string;
    type: string;
}

export interface IChartsTrack {
    id: number;
    title: string;
    duration: number;
    preview: string;
    artist: IChartsArtist;
    album: IChartsAlbum;
    type: string;
}

interface IChartsResponse {
    albums: {
        data: IChartsAlbum[];
        total: number;
    };
    playlists: {
        data: IChartsPlaylist[];
        total: number;
    };
    artists: {
        data: IChartsArtist[];
        total: number;
    };
    tracks: {
        data: IChartsTrack[];
        total: number;
    }
    
}

export interface IGenre {
    id: number;
    name: string;
    picture: string;
    picture_medium: string;
}

interface IGenresResponse {
    data: IGenre[];
    total: number;
}

export interface IAlbumResponse {
    id: number;
    title: string;
    cover_medium: string;
    cover_small: string;
    genres: {
        data: Omit<IGenre, 'picture_medium'>[];
    };
    nb_tracks: number;
    label: string;
    fans: number;
    duration: number;
    release_date: string;
    available: boolean;
    artist: IChartsArtist;
    tracks: {
        data: ISong[];
    };
}

export interface IPlaylistResponse {
    id: number;
    title: string;
    description: string;
    public: boolean;
    duration: number;
    nb_tracks: number;
    fans: number;
    picture: string;
    picture_medium: string;
    creation_date: string;
    creator: {
        id: number;
        name: string;
    };
    tracks: {
        data: ISong[];
    };
    
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
        getCharts: builder.query<IChartsResponse, void>({
            query: () => 'chart'
        }),
        getGenres: builder.query<IGenresResponse, void>({
            query: () => 'editorial'
        }),
        getAlbumById: builder.query<IAlbumResponse, number | string>({
            query: (albumId: number | string) => `album/${albumId}`,
        }),
        getPlaylistById: builder.query<IPlaylistResponse, number | string>({
            query: (playlistId: number | string) => `playlist/${playlistId}`,
        }),

       
    }),
});

export const {
    useGetArtistByIdQuery,
    useGetRelatedArtistsQuery,
    useGetArtistPlaylistsQuery,
    useGetArtistAlbumsQuery,
    useGetArtistTopSongsQuery,
    useGetChartsQuery,
    useGetGenresQuery,
    useGetAlbumByIdQuery,
    useGetPlaylistByIdQuery,
} = deezerApi;

export default deezerApi;