import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface IArtist {
    name: string;
    picture_big: string;
    nb_album: number;
    nb_fan: number;
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

       
    }),
});

export const {
    useGetArtistByIdQuery,
    
} = deezerApi;

export default deezerApi;