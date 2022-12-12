import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../redux/hooks";
import TrackList from "../album/TrackList";

interface IPropsQueueContent {

}

const StyledQueueContent = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 10px;

    ${props => props.theme.breakpoints.up("sm")} {
        flex-direction: row;
        padding: 10px 20px;
    }
    

   
    .artist {
       display: flex;
       flex-direction: column;
       align-items: center;
        
       ${props => props.theme.breakpoints.up("sm")} {
            margin-right: 30px;
            position: sticky;
            top: 70px;
       }

       .image {
        max-width: 300px;
        max-height: 300px;
        margin-bottom: 20px;

        ${props => props.theme.breakpoints.up("sm")} {
            max-width: 200px;
            max-height: 200px;
        }

        ${props => props.theme.breakpoints.up("md")} {
            max-width: 400px;
            max-height: 450px;
        }
       }

       .title {
        text-align: center;
        margin-bottom: 20px;
       }
    }

    .track-list {
        flex-grow: 1;
        margin-top: 20px;
        
        ${props => props.theme.breakpoints.up("sm")}{
            max-width: calc(100vw - 250px - 50px);
        }

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
                    {playerState && <> <img className="image" src={playerState.activeSong?.album.cover_big || ''} alt="" />
                    <Typography className="title" variant="subtitle1">{playerState.activeSong?.title || ''}</Typography>
                    <Typography variant="caption">{playerState.activeSong?.artist.name}</Typography>
                    </>
                    }
                </Box>

            </Box>

            <Box className="track-list">
                {playerState && <TrackList tracks={playerState.songList} cover={playerState.activeSong?.album.cover_medium || ''} />}
            </Box>
        </StyledQueueContent>
    )
}

export default QueueContent;