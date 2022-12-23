import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IArtist } from "./apiDeezerSlice";

interface IAddToFavResponse {
  message: string;
}
interface IArtistPayload {
  deezer_id: number;
  name: string;
  picture_big: string;
  nb_fan: number;
  picture: string;
}
export interface IAlbumCustom {
  deezer_id: number;
  title: string;
  artist: string;
  cover_medium: string;
}

interface IFavoriteObject {
  _id: string;
  deezer_id: number;
}
export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  imageThumb?: string;
  role: string;

  albums: IFavoriteObject[];
  artists: IFavoriteObject[];
  songs: IFavoriteObject[];
  playlists: IFavoriteObject[];
}

interface ILoginResponse {
  access_token: string;
}

export interface IPlaylistCustom {
  deezer_id: number;
  title: string;
  picture_medium: string;
  creator: string;
}

export interface ISongCustom {
  deezer_id: number;
  title: string;
  preview: string;
  duration: number;
  album_cover: string;
  artist_id: number;
  artist_name: string;
}

export const backendApi = createApi({
  reducerPath: "backendapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://different-fish-battledress.cyclic.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Artists", "Albums", "Playlists", "Songs"],

  endpoints: (builder) => ({
    uploadImage: builder.mutation<string, FormData>({
      query(data) {
        return {
          url: `upload`,
          method: "POST",
          body: data,
          mode: 'cors',
          credentials: 'same-origin',
          cache: 'no-cache',
        };
      }
    }),
    updateProfile: builder.mutation<IUser, Partial<IUser>>({
      query(data) {
        return {
          url: `auth/profile`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["Profile"],
    }),
    addArtistToFav: builder.mutation<IAddToFavResponse, { artist: IArtistPayload }>({
      query({ artist }) {
        return {
          url: `favourites/add/artist`,
          method: "POST",
          body: artist,
        };
      },
      invalidatesTags: ["Profile", "Artists"],
    }),
    addAlbumToFav: builder.mutation<IAddToFavResponse, { album: IAlbumCustom }>({
      query({ album }) {
        return {
          url: `favourites/add/album`,
          method: "POST",
          body: album,
        };
      },
      invalidatesTags: ["Profile", "Albums"],
    }),
    addPlaylistToFav: builder.mutation<IAddToFavResponse, { playlist: IPlaylistCustom }>({
      query({ playlist }) {
        return {
          url: `favourites/add/playlist`,
          method: "POST",
          body: playlist,
        };
      },
      invalidatesTags: ["Profile", "Playlists"],
    }),
    addSongToFav: builder.mutation<IAddToFavResponse, { song: ISongCustom }>({
      query({ song }) {
        return {
          url: `favourites/add/song`,
          method: "POST",
          body: song,
        };
      },
      invalidatesTags: ["Profile", "Songs"],
    }),
    getFavoriteArtists: builder.query<IArtist[], any>({
      query: () => "favourites/artists",
      providesTags: ["Artists"],
    }),
    getFavoriteAlbums: builder.query<IAlbumCustom[], any>({
      query: () => "favourites/albums",
      providesTags: ["Albums"],
    }),
    getFavoritePlaylists: builder.query<IPlaylistCustom[], any>({
      query: () => "favourites/playlists",
      providesTags: ["Playlists"],
    }),
    getFavoriteSongs: builder.query<ISongCustom[], any>({
      query: () => "favourites/songs",
      providesTags: ["Songs"],
    }),
    getMyProfile: builder.query<IUser, any>({
      query: () => "auth/profile",
      providesTags: ["Profile"],
    }),
    loginUser: builder.mutation<ILoginResponse, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation<IUser, { data: Partial<IUser> }>({
      query: ({ data }) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useAddArtistToFavMutation,
  useGetFavoriteArtistsQuery,
  useAddAlbumToFavMutation,
  useGetFavoriteAlbumsQuery,
  useAddPlaylistToFavMutation,
  useGetFavoritePlaylistsQuery,
  useAddSongToFavMutation,
  useGetFavoriteSongsQuery,
  useUploadImageMutation,
  useUpdateProfileMutation,
} = backendApi;

export default backendApi;
