import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../redux/hooks";
import AudioPlayer from "./AudioPlayer";

const StyledMusicPlayer = styled('div')`
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 20;
   
`;

const MusicPlayer = () => {
    const playerState = useAppSelector(state => state.player);
    const authState = useAppSelector(state => state.auth);

  return (
    <StyledMusicPlayer className="MusicPlayer">
        {/* {playerState.isActive && <AudioPlayer playerState={playerState} />} */}
        <AudioPlayer authState={authState} playerState={playerState} />
    </StyledMusicPlayer>
  )
}

export default MusicPlayer;