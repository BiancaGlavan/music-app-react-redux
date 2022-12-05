import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../redux/hooks";
import TrackList from "../album/TrackList";

interface IPropsQueueContent {

}

const StyledQueueContent = styled('div')`
    display: flex;
    padding: 10px 40px;

   
    .artist {
       display: flex;
       flex-direction: column;
       margin-right: 30px;
       position: sticky;
       top: 70px;
       align-items: center;

       .image {
        max-width: 400px;
        max-height: 450px;
        margin-bottom: 20px;
       }
    }

    .track-list {
        flex-grow: 1;

        .track {
            margin-top: 0;
        }
       
    }
`;

const QueueContent = (props: IPropsQueueContent) => {
    const playerState = useAppSelector(state => state.player);


    return (
        <StyledQueueContent>
            <Box className="song-preview">
                <Box className="artist">
                    <img className="image" src={playerState.activeSong?.album.cover_big || ''} alt="" />
                    <Typography variant="subtitle1">{playerState.activeSong?.title || ''}</Typography>
                    <Typography variant="caption">{playerState.activeSong?.artist.name}</Typography>
                </Box>
            </Box>

            <Box className="track-list">
                <TrackList tracks={playerState.songList} cover={playerState.activeSong?.album.cover_medium || ''} />
            </Box>
        </StyledQueueContent>
    )
}

export default QueueContent;