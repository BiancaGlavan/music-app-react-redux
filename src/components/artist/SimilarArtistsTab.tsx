import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArtist } from "../../redux/features/apiDeezerSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom";

interface IPropsSimilarArtistsTab {
    artists: IArtist[];
    onTabChange: (tab: string) => void;
}

const StyledSimilarArtistsTab = styled(Box)`
    margin-top: 30px;
    flex-shrink: 0;
    flex-grow: 1;

    ${props => props.theme.breakpoints.up("sm")} {
        margin-top: 30px;
        
    }

    ${props => props.theme.breakpoints.up("md")} {
    margin-left: 0;
    margin-top: 30px;
    }

    ${props => props.theme.breakpoints.up("lg")} {
        margin-top: 30px;
        margin-left: 30px;
        width: 280px;
    }
    
  

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
            <Typography className="similar-artists-title" variant="h2">Fans also like</Typography>
            {artists.map((artist, idx) => <Box key={artist.id} className="artist-info">
                <img className="artist-img" src={artist.picture} alt="" />
                <Box className="name-and-fans">
                    <Link to={`/artists/${artist.id}`}>
                    <Typography variant="subtitle2">{artist.name}</Typography>
                    </Link>
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