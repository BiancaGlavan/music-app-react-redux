import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './apiSlice';


export interface AuthState {
  isAuth: boolean;
  token: string;
  user: IUser | null;
  favorites: {
    albums: number[];
    artists: number[];
    songs: number[];
    playlists: number[];
  }
}

const initialState: AuthState = {
    isAuth: false,
    token: '',
    user: null,
    favorites: {
      albums: [],
      artists: [],
      songs: [],
      playlists: [],
    }
};



export const authSlice = createSlice({
  name: 'authmusicapp',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {

      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;

      // convert from  array of objects to array of ids
      state.favorites.artists = action.payload?.artists.map((artist) => artist.deezer_id) || [];
      state.favorites.albums = action.payload?.albums.map((album) => album.deezer_id) || [];
      state.favorites.songs = action.payload?.songs.map((song) => song.deezer_id) || [];
      state.favorites.playlists = action.payload?.playlists.map((playlist) => playlist.deezer_id) || [];
     
    },
    logout: (state) => {
        state.isAuth = false;
        state.token = '';
        state.user = null;

        // remove favorited items on logout
        state.favorites.artists = [];
        state.favorites.albums = [];
        state.favorites.songs = [];
        state.favorites.playlists = [];
    },
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
    }
  },


});

export const { setAuth, setToken, setUser, logout, login } = authSlice.actions;

export default authSlice.reducer;
