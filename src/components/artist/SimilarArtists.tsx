import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IArtist } from "../../redux/features/apiDeezerSlice";

interface IPropsSimilarArtists {
    artists: IArtist[];
}

const StyledSimilarArtist = styled('div')`

    .title {
        margin-bottom: 30px;
        margin-top: 30px;
      
    }

    .artist-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .artist-details {
            text-align: center;
        }

    
      
    }

     .artist-picture {
       
        img {
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
   
`;

const SimilarArtists = ({ artists }: IPropsSimilarArtists) => {

    return (
        <StyledSimilarArtist className="SimilarArtists">
            <Typography className="title" variant="h5">Similar Artists</Typography>
            <Grid container spacing={10} >
                {artists.map((artist) => <Grid item key={artist.id} xs={12} sm={6} md={4} lg={3}>
                    <Link className="artist-container" to={`/artists/${artist.id}`}>
                        <Box className="artist-picture">
                            <img src={artist.picture} alt="artist picture" />
                        </Box>
                        <Typography className="artist-details name" variant="subtitle1">{artist.name}</Typography>
                        <Typography className="artist-details" variant="subtitle2" color="secondary">{new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>
                    </Link>
                </Grid>)}
            </Grid>

        </StyledSimilarArtist>
    )
}

export default SimilarArtists