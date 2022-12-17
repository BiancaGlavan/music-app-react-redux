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
interface IAlbumPayload {
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
  tagTypes: ["Profile", "Artists", "Albums"],

  endpoints: (builder) => ({
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
    addAlbumToFav: builder.mutation<IAddToFavResponse, { album: IAlbumPayload }>({
      query({ album }) {
        return {
          url: `favourites/add/album`,
          method: "POST",
          body: album,
        };
      },
      invalidatesTags: ["Profile", "Albums"],
    }),
    getFavoriteArtists: builder.query<IArtist[], any>({
      query: () => "favourites/artists",
      providesTags: ["Artists"],
    }),
    getFavoriteAlbums: builder.query<IAlbumPayload[], any>({
      query: () => "favourites/albums",
      providesTags: ["Albums"],
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
} = backendApi;

export default backendApi;
