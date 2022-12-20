import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IAlbumCustom } from "../../redux/features/apiSlice";

interface IPropsFavAlbums {
    albums: IAlbumCustom[];
}

const StyledFavoriteAlbums = styled('div')`
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

const FavoriteAlbums = ({albums}: IPropsFavAlbums) => {
  return (
    <StyledFavoriteAlbums className="ArtistAlbums">
        <Typography className="title" variant="h2">Favorite Albums</Typography>
        <Grid container spacing={2} >
                {albums.map((album) => <Grid item  key={album?.deezer_id}  xs={6} sm={6}  md={4} lg={3}>
                   <Link className="artist-container" to={`/album/${album.deezer_id}`}>
                   <Box className="artist-picture">
                        <img src={album?.cover_medium} alt="artist picture" />
                    </Box>
                    <Typography className="artist-details" variant="body2">{album?.title}</Typography>
                    <Typography className="artist-details" variant="caption" color="textSecondary">{album?.artist}</Typography>
                   </Link>
                </Grid>)}
            </Grid>
    </StyledFavoriteAlbums>
  )
}

export default FavoriteAlbums;