import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IChartsArtist } from "../../redux/features/apiDeezerSlice";

interface IPropsArtistCard {
    artist: IChartsArtist;
}

const StyledArtistCard = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;

    .artist-name {
        text-align: center;
    }

    .artist-img {
       
        img {
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }
`;

const ArtistCard = ({artist}: IPropsArtistCard) => {
  return (
    <StyledArtistCard>
        <Box className="artist-img">
            <img src={artist.picture} alt="" />
        </Box>
        <Typography className="artist-name" variant="body1">{artist.name}</Typography>
    </StyledArtistCard>
  )
}

export default ArtistCard;