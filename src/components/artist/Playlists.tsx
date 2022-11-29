import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IPlaylist } from "../../redux/features/apiDeezerSlice";

interface IPropsPlaylists {
    playlists: IPlaylist[];
}

const StyledPlaylists = styled('div')`

`;

const Playlists = ({playlists}: IPropsPlaylists) => {
  return (
    <StyledPlaylists>
        <Typography className="title" variant="h5">Playlists</Typography>
        <Grid container spacing={10} >
                {playlists.map((playlist) => <Grid item className="artist-container" key={playlist?.id}  xs={12} sm={8}  md={4} lg={3}>
                    <Box className="artist-picture">
                        <img src={playlist?.picture} alt="artist picture" />
                    </Box>
                    <Typography className="artist-details" variant="h6">{playlist?.title}</Typography>
                    <Typography className="artist-details" variant="subtitle2" color="secondary">Created by {playlist?.user.name}</Typography>
                </Grid>)}
            </Grid>
    </StyledPlaylists>
  )
}

export default Playlists;