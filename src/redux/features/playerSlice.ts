import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISong } from './apiDeezerSlice';


export interface PlayerState {
    currentIndex: number;
    isActive: boolean;
    isPlaying: boolean;
    songList: ISong[];
    activeSong: ISong | null;
    volume: number;
}

const initialState: PlayerState = {
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    songList: [],
    activeSong: null,
    volume: 0.3,
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
        state.isPlaying = true;
    },
    play: (state) => {
        state.isPlaying = true;
    },
    pause: (state) => {
        state.isPlaying = false;
    },
    onNextSong: (state) => {
      const newIndex = state.currentIndex < state.songList.length - 2 ? state.currentIndex + 1 : 0;
      const newActiveSong = state.songList[newIndex];
      state.currentIndex = newIndex;
      state.activeSong = newActiveSong;
      state.isPlaying = true;
    },
    onPrevSong: (state) => {
      const newIndex = state.currentIndex === 0 ? state.songList.length - 1 : state.currentIndex - 1;
      const newActiveSong = state.songList[newIndex];
      state.currentIndex = newIndex;
      state.activeSong = newActiveSong;
      state.isPlaying = true;
    },
    onVolumeChange: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    }

  },


});

export const { addSong, play, pause, onNextSong, onPrevSong, onVolumeChange } = playerSlice.actions;

export default playerSlice.reducer;
