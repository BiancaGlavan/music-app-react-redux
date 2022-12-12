import { Box, Container, Divider, Typography } from "@mui/material";
import { ISong } from "../../redux/features/apiDeezerSlice";
import Track from "./Track";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from "@mui/material/styles";
import { addSong, pause, play } from "../../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface IPropsTrackList {
  tracks: ISong[];
  cover: string;
  hideHeader?: boolean;
  title?: string; 

}

const StyledTrackList = styled('div')`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .track {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;

    .icon {
      margin-right: 20px;
    }
  }

  .divider {
    margin-bottom: 20px;
    
  }
`;

const TrackList = ({ tracks, cover, hideHeader = false, title = 'TRACK' }: IPropsTrackList) => {
  const dispatch = useAppDispatch();
  const playerState = useAppSelector(state => state.player);

  const handleAddTrack = (track: ISong, trackIndex: number) => {
    if (playerState.activeSong?.id === track.id) {
      if (playerState.isPlaying) {
        dispatch(pause());
      } else {
        dispatch(play());
      }

    } else {
      dispatch(addSong({ song: track, songList: tracks, activeIndex: trackIndex }));
    }

  }

  return (
    <StyledTrackList className="TrackList">
      {!hideHeader && <>
        <Box className="track">
          <Typography variant="subtitle1">{title}</Typography>
          <AccessTimeIcon fontSize="small" className="icon" />
        </Box>
        <Divider className="divider" />
      </>}
      {tracks.map((track, idx) => <Track key={track.id}
        onAddTrack={() => handleAddTrack(track, idx)}
        trackNr={idx + 1}
        cover={cover}
        isActive={playerState.activeSong?.id === track.id}
        isPlaying={playerState.activeSong?.id === track.id && playerState.isPlaying}
        track={track} />)}
    </StyledTrackList>
  )
}

export default TrackList;