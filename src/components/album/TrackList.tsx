import { Box, Divider, Typography } from "@mui/material";
import { ISong } from "../../redux/features/apiDeezerSlice";
import Track from "./Track";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from "@mui/material/styles";
import { addSong } from "../../redux/features/playerSlice";
import { useAppDispatch } from "../../redux/hooks";

interface IPropsTrackList {
    tracks: ISong[];
    cover: string;
    
}

const StyledTrackList = styled('div')`

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

const TrackList = ({tracks, cover }: IPropsTrackList) => {
  const dispatch = useAppDispatch();
  
  const handleAddTrack = (track: ISong, trackIndex: number) => {
    dispatch(addSong({song: track, songList: tracks, activeIndex: trackIndex}));
  }

  return (
    <StyledTrackList className="TrackList">
       <Box className="track">
          <Typography variant="subtitle1">TRACK</Typography>
          <AccessTimeIcon fontSize="small" className="icon"/>
        </Box>
        <Divider className="divider"/>
      {tracks.map((track, idx) => <Track onAddTrack={() => handleAddTrack(track, idx)} trackNr={idx + 1}  cover={cover} key={track.id} track={track}/>)}
    </StyledTrackList>
  )
}

export default TrackList;