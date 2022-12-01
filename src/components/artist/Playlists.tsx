import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IPlaylist } from "../../redux/features/apiDeezerSlice";

interface IPropsPlaylists {
    playlists: IPlaylist[];
}

const StyledPlaylists = styled('div')`
  .title {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .artist-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .artist-details {
    text-align: center;
  }

  .artist-picture {
    max-width: 170px;
     img {
         width: 100%;
         border-radius: 7px;
         object-fit: cover;
     }
 }
`;

const Playlists = ({playlists}: IPropsPlaylists) => {
  return (
    <StyledPlaylists>
        <Typography className="title" variant="h5">Playlists</Typography>
        <Grid container spacing={10} >
                {playlists.map((playlist) => <Grid item className="artist-container" key={playlist?.id}  xs={12} sm={6}  md={4} lg={3}>
                    <Box className="artist-picture">
                        <img src={playlist?.picture_medium} alt="artist picture" />
                    </Box>
                    <Typography className="artist-details" variant="subtitle1">{playlist?.title}</Typography>
                    <Typography className="artist-details" variant="subtitle2" color="textSecondary">Created by {playlist?.user.name}</Typography>
                </Grid>)}
            </Grid>
    </StyledPlaylists>
  )
}

export default Playlists;