import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
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
       max-width: 170px;
        img {
            width: 100%;
            border-radius: 7px;
            object-fit: cover;
        }
    }

  
`;

const ArtistAlbums = ({albums}: IPropsArtistAlbums) => {
  return (
    <StyledArtistAlbums>
        <Typography className="title" variant="h5">Albums</Typography>
        <Grid container spacing={10} >
                {albums.map((album) => <Grid item className="artist-container" key={album?.id}  xs={12} sm={6}  md={4} lg={3}>
                    <Box className="artist-picture">
                        <img src={album?.cover_medium} alt="artist picture" />
                    </Box>
                    <Typography className="artist-details" variant="subtitle1">{album?.title}</Typography>
                    <Typography className="artist-details" variant="subtitle2" color="textSecondary">Released on {album?.release_date}</Typography>
                </Grid>)}
            </Grid>
    </StyledArtistAlbums>
  )
}

export default ArtistAlbums;