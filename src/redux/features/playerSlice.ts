import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISong } from './apiDeezerSlice';


export interface PlayerState {
    currentIndex: number;
    isActive: boolean;
    isPlaying: boolean;
    songList: ISong[];
    activeSong: ISong | null;
}

const initialState: PlayerState = {
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    songList: [],
    activeSong: null,
};


export const playerSlice = createSlice({
  name: 'player',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    addSong: (state, action: PayloadAction<{song: ISong; songList: ISong[]; activeIndex: number}>) => {
      // state.products.push(action.payload);
      const newSong = action.payload.song;
        state.activeSong = newSong;
        state.currentIndex = action.payload.activeIndex;
        state.songList = action.payload.songList;
        state.isActive = true;
    },
    play: (state) => {
        state.isPlaying = true;
    },
    pause: (state) => {
        state.isPlaying = false;
    },

  },


});

export const { addSong, play, pause } = playerSlice.actions;

export default playerSlice.reducer;
