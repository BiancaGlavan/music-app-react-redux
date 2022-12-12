import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IArtistAlbum } from "../../redux/features/apiDeezerSlice";

interface IPropsArtistAlbums {
    albums: IArtistAlbum[];
}

const StyledArtistAlbums = styled('div')`

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

const ArtistAlbums = ({albums}: IPropsArtistAlbums) => {
  return (
    <StyledArtistAlbums className="ArtistAlbums">
        <Typography className="title" variant="h5">Albums</Typography>
        <Grid container spacing={10} >
                {albums.map((album) => <Grid item  key={album?.id}  xs={6} sm={6}  md={4} lg={3}>
                   <Link className="artist-container" to={`/album/${album.id}`}>
                   <Box className="artist-picture">
                        <img src={album?.cover_medium} alt="artist picture" />
                    </Box>
                    <Typography className="artist-details" variant="body1">{album?.title}</Typography>
                    <Typography className="artist-details" variant="body2" color="textSecondary">Released on {album?.release_date}</Typography>
                   </Link>
                </Grid>)}
            </Grid>
    </StyledArtistAlbums>
  )
}

export default ArtistAlbums;