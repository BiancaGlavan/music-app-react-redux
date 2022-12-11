import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArtist } from "../../redux/features/apiDeezerSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface IPropsSimilarArtistsTab {
    artists: IArtist[];
    onTabChange: (tab: string) => void;
}

const StyledSimilarArtistsTab = styled(Box)`
    margin-top: 30px;
    margin-left: 30px;
    width: 35%;

    .similar-artists-title {
        margin-bottom: 20px;
    }
    
    .artist-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        
        .name-and-fans {
            flex-grow: 1;
            margin-left: 20px;
        }
        
        .artist-img {
            width: 80px;
            height: 80px;
            border-radius: 100%;
            
        }
    }
`;

const SimilarArtistsTab = ({ artists, onTabChange }: IPropsSimilarArtistsTab) => {
    return (
        <StyledSimilarArtistsTab className="SimilarArtistsTab">
            <Typography className="similar-artists-title" variant="h6">Fans also like</Typography>
            {artists.map((artist, idx) => <Box className="artist-info">
                <img className="artist-img" src={artist.picture} alt="" />
                <Box className="name-and-fans">
                    <Typography variant="subtitle2">{artist.name}</Typography>
                    <Typography variant="caption" color="textSecondary">{new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>
                </Box>
                <Box className="icon">
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                </Box>
            </Box>)}

            <Button variant="outlined" onClick={() => onTabChange('related')}>See more artists</Button>
        </StyledSimilarArtistsTab>
    )
}

export default SimilarArtistsTab;