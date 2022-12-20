import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IChartsArtist } from "../../redux/features/apiDeezerSlice";
import ArtistCard from "./ArtistCard";

interface IPropsArtistsList {
    artists: IChartsArtist[];
}

const StyledArtistsList = styled('div')`
    .title {
        margin: 20px 0;
    }
`;

const ArtistsList = ({artists}: IPropsArtistsList) => {
  return (
    <StyledArtistsList>
        <Typography className="title" variant="h2">Explore Artists by Genre</Typography>
        <Grid container spacing={2}>
            {artists.map((artist, idx) => <Grid item key={artist.id} xs={6} sm={4} md={4} lg={3}>
                <Link to={`/artists/${artist.id}`}>
                    <ArtistCard artist={artist}/>
                </Link>
            </Grid>)}
        </Grid>
    </StyledArtistsList>
  )
}

export default ArtistsList;