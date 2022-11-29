import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import Playlists from "../components/artist/Playlists";
import SimilarArtists from "../components/artist/SimilarArtists";
import { useGetArtistByIdQuery, useGetArtistPlaylistsQuery, useGetRelatedArtistsQuery } from "../redux/features/apiDeezerSlice";


const StyledArtistPage = styled(Container)`
   margin-top: 100px;

    .artist {
        display: flex;
        margin-bottom: 30px;

        .artist-img {
            max-width: 200px;
            max-height: 200px;
           

            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
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
    const { data: relatedArtists } = useGetRelatedArtistsQuery(id || '');
    const { data: playlistResponse } = useGetArtistPlaylistsQuery(id || '');


    return (
        <StyledArtistPage>

            {artist && <Box className="artist">
                <Box className="artist-img">
                    <img src={artist.picture_big} alt="artist-picture" />
                </Box>
                <Box className="artist-details">
                    <Typography variant="h5">{artist?.name}</Typography>
                    <Typography variant="subtitle2" color="secondary"> {new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>

                </Box>
            </Box>}


            {relatedArtists && <SimilarArtists artists={relatedArtists.data} />}
            {playlistResponse && <Playlists playlists={playlistResponse.data} />}
        </StyledArtistPage>
    )
}

export default ArtistPage;