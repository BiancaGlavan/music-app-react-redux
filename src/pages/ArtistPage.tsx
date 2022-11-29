import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetArtistByIdQuery } from "../redux/features/apiDeezerSlice";


const StyledArtistPage = styled('div')`
    margin: 20px;

    .artist {
        display: flex;
        margin-left: 20px;

        .artist-img {
            max-width: 200px;
            max-height: 200px;
           

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .artist-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 40px;
        }
    }
`;

const ArtistPage = () => {

    const { id } = useParams();
    const { data: artist, isLoading } = useGetArtistByIdQuery(id || '');
    console.log('artist: ', artist);

    return (
        <StyledArtistPage>
          
            <Box className="artist">
                <Box className="artist-img">
                    <img src={artist?.picture_big} alt="artist-picture" />
                </Box>
                <Box className="artist-details">
                    <Typography variant="h5">{artist?.name}</Typography>
                    <Typography variant="subtitle2" color="secondary"> {artist?.nb_fan} listeners</Typography>
                    
                </Box>
            </Box>
        </StyledArtistPage>
    )
}

export default ArtistPage;