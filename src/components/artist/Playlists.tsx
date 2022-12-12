import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
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
    margin-bottom: 30px;
  }

  .artist-details {
    text-align: center;
   
  }

  .artist-picture {
    max-width: 100px;
     img {
         width: 100%;
         border-radius: 7px;
         object-fit: cover;
     }
    ${props => props.theme.breakpoints.up("sm")} {
      max-width: 170px;
    }

    ${props => props.theme.breakpoints.up("md")} {
      max-width: 100px;
    }

    ${props => props.theme.breakpoints.up("lg")} {
      max-width: 170px;
    }
 }
`;

const Playlists = ({ playlists }: IPropsPlaylists) => {
  return (
    <StyledPlaylists className="Playlists">
      <Typography className="title" variant="h6">Playlists</Typography>
      <Grid container spacing={2} >
        {playlists.map((playlist) => <Grid item key={playlist?.id} xs={6} sm={6} md={4} lg={3}>
          <Link className="artist-container" to={`/playlist/${playlist.id}`}>
            <Box className="artist-picture">
              <img src={playlist?.picture_medium} alt="artist picture" />
            </Box>
            <Typography className="artist-details" variant="body2">{playlist?.title}</Typography>
            <Typography className="artist-details" variant="caption" color="textSecondary">Created by {playlist?.user.name}</Typography>
          </Link>
        </Grid>)}
      </Grid>
    </StyledPlaylists>
  )
}

export default Playlists;