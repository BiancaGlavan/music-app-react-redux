import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ArtistAlbums from "../components/artist/ArtistAlbums";
import Playlists from "../components/artist/Playlists";
import SimilarArtists from "../components/artist/SimilarArtists";
import { useGetArtistAlbumsQuery, useGetArtistByIdQuery, useGetArtistPlaylistsQuery, useGetRelatedArtistsQuery } from "../redux/features/apiDeezerSlice";


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
    const { data: albumsResponse } = useGetArtistAlbumsQuery(id || '');
    const [activeTab, setActiveTab] = useState('overview');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
      };
    return (
        <StyledArtistPage>

            {artist && <Box className="artist">
                <Box className="artist-img">
                    <img src={artist.picture_big} alt="artist-picture" />
                </Box>
                <Box className="artist-details">
                    <Typography variant="h5">{artist?.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary"> {new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>

                </Box>
            </Box>}
            <Box>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                >
                    <Tab
                        value="overview"
                        label="Overview"
                        
                    />
                    <Tab value="albums" label="Albums" />
                    <Tab value="playlists" label="Playlists" />
                    <Tab value="related" label="Similar Artists" />
                </Tabs>
                <Divider />
            </Box>
            {activeTab === 'overview' && <div>Overview Tab</div>}
            {albumsResponse && activeTab === 'albums' && <ArtistAlbums albums={albumsResponse.data} />}
            {relatedArtists && activeTab === 'related' && <SimilarArtists artists={relatedArtists.data} />}
            {playlistResponse && activeTab === 'playlists' && <Playlists playlists={playlistResponse.data} />}
            
        </StyledArtistPage>
    )
}

export default ArtistPage;