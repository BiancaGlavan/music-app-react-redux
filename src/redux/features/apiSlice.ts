import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface IAddArtistToFavResponse {}
interface IArtistPayload {
  deezer_id: number;
  name: string;
  picture_big: string;
  nb_fan: number;
  picture: string;
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
  albums: string[];
  artists: string[];
  songs: string[];
  playlists: string[];
}

interface ILoginResponse {
  access_token: string;
}

interface ICustomArtist {
  name: string;
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
  endpoints: (builder) => ({
    addArtistToFav: builder.mutation<IAddArtistToFavResponse, { artist: IArtistPayload }>({
      query({ artist }) {
        return {
          url: `favourites/add/artist`,
          method: "POST",
          body: artist,
        };
      },
    }),

    getFavoriteArtists: builder.query<ICustomArtist[], any>({
      query: () => "favourites/artists",
    }),
    getMyProfile: builder.query<IUser, any>({
      query: () => "auth/profile",
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
} = backendApi;

export default backendApi;
