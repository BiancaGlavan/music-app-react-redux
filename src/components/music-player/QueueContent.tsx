import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../redux/hooks";
import TrackList from "../album/TrackList";

interface IPropsQueueContent {

}

const StyledQueueContent = styled('div')`
    margin: 10px;

    .artist {
        display: flex;
        flex-direction: column;
        align-items: center;
       
        ${props => props.theme.breakpoints.up("sm")} {
            position: sticky;
            top: 70px;
        }
      

        .image {
            width: 100%;
            max-width: 300px;
        }

        .title {
            text-align: center;
        }
    }
`;

const QueueContent = (props: IPropsQueueContent) => {
    const playerState = useAppSelector(state => state.player);


    return (
        <StyledQueueContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box className="artist">         
                    {playerState && <> <img className="image" src={playerState.activeSong?.album.cover_big || ''} alt="" />
                    <Typography className="title" variant="subtitle1">{playerState.activeSong?.title || ''}</Typography>
                    <Typography variant="caption">{playerState.activeSong?.artist.name}</Typography>
                    </>
                    }
                    </Box>                
                </Grid>
                <Grid item className="track-list" xs={12} sm={8}>
                {playerState && <TrackList tracks={playerState.songList} cover={playerState.activeSong?.album.cover_medium || ''} />}
                </Grid>
            </Grid>
        </StyledQueueContent>
    )
}

export default QueueContent;

