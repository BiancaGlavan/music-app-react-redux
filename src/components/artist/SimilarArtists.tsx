import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IArtist } from "../../redux/features/apiDeezerSlice";

interface IPropsSimilarArtists {
    artists: IArtist[];
    title?: string;

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
        margin-bottom: 30px;

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
    }
   
`;

const SimilarArtists = ({ artists, title = 'Similar Artists' }: IPropsSimilarArtists) => {

    return (
        <StyledSimilarArtist className="SimilarArtists">
            <Typography className="title" variant="h2">{title}</Typography>
            <Grid container spacing={2} >
                {artists.map((artist) => <Grid item key={artist.deezer_id || artist.id} xs={6} sm={4} md={4} lg={3}>
                    <Link className="artist-container" to={`/artists/${artist.deezer_id || artist.id}`}>
                        <Box className="artist-picture">
                            <img src={artist.picture} alt="artist picture" />
                        </Box>
                        <Typography className="artist-details name" variant="body1">{artist.name}</Typography>
                        <Typography className="artist-details" variant="h6" color="textSecondary">{new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>
                    </Link>
                </Grid>)}
            </Grid>

        </StyledSimilarArtist>
    )
}

export default SimilarArtists