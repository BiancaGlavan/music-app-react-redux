import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistAlbums from "../components/artist/ArtistAlbums";
import ArtistOverview from "../components/artist/ArtistOverview";
import Playlists from "../components/artist/Playlists";
import SimilarArtists from "../components/artist/SimilarArtists";
import NavigateBack from "../components/NavigateBack";
import { useGetArtistAlbumsQuery, useGetArtistByIdQuery, useGetArtistPlaylistsQuery, useGetRelatedArtistsQuery } from "../redux/features/apiDeezerSlice";


const StyledArtistPage = styled(Container)`
   

    .artist {
        display: flex;
        margin-bottom: 30px;

        .artist-img {
            max-width: 100px;
            max-height: 100px;

            ${props => props.theme.breakpoints.up("sm")} {
                max-width: 200px;
                max-height: 200px;
            }
           

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

    .artist-tabs {
        max-width: calc(100vw - 50px);
    }
`;

const ArtistPage = () => {

    const { id } = useParams();
    const { data: artist, isLoading, isFetching } = useGetArtistByIdQuery(id || '');
    const { data: relatedArtists, isFetching: isRelatedFetching } = useGetRelatedArtistsQuery(id || '');
    const { data: playlistResponse, isFetching: isPlaylistFetching } = useGetArtistPlaylistsQuery(id || '');
    const { data: albumsResponse, isFetching: isAlbumsFetching } = useGetArtistAlbumsQuery(id || '');
    const [activeTab, setActiveTab] = useState('overview');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [id, activeTab]);

    return (
        <StyledArtistPage>
            <NavigateBack />
            {!isFetching && artist && <Box className="artist">
                <Box className="artist-img">
                    <img src={artist.picture_big} alt="artist-picture" />
                </Box>
                <Box className="artist-details">
                    <Typography variant="h5">{artist?.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary"> {new Intl.NumberFormat().format(artist.nb_fan)} listeners</Typography>

                </Box>
            </Box>}
            {isFetching ? <div>is loading...</div> :
                <>
                    <Box className="artist-tabs">
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons
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
                    {activeTab === 'overview' && <ArtistOverview onTabChange={setActiveTab} />}
                    {!isAlbumsFetching && albumsResponse && activeTab === 'albums' && <ArtistAlbums albums={albumsResponse.data} />}
                    {!isRelatedFetching && relatedArtists && activeTab === 'related' && <SimilarArtists artists={relatedArtists.data} />}
                    {!isPlaylistFetching && playlistResponse?.data && activeTab === 'playlists' && <Playlists playlists={playlistResponse.data} />}
                </>
            }
        </StyledArtistPage>
    )
}

export default ArtistPage;