import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useGetAlbumByIdQuery, useGetArtistAlbumsQuery, useGetArtistPlaylistsQuery, useGetArtistTopSongsQuery, useGetRelatedArtistsQuery } from "../../redux/features/apiDeezerSlice";
import TrackList from "../album/TrackList";

import Playlists from "./Playlists";
import ArtistAlbums from "./ArtistAlbums";
import SimilarArtistsTab from "./SimilarArtistsTab";

interface IPropsArtistOverview {
    onTabChange: (tab: string) => void;
}

const StyledArtistOverview = styled('div')`
box-sizing: border-box;
flex-grow: 1;
    .songs-and-artists {
        display: flex;
        flex-direction: column;

        ${props => props.theme.breakpoints.up("sm")} {
            flex-direction: column;
        }

        ${props => props.theme.breakpoints.up("md")} {
            flex-direction: column;
        }

        ${props => props.theme.breakpoints.up("lg")} {
            flex-direction: row;
        }
    }

    .tracks {
       flex-grow: 1;
       max-width: calc(100vw - 55px );

       ${props => props.theme.breakpoints.up("lg")} {
            max-width: calc(100vw - 48px - 50px - 280px);
        }
    }

  
`;

const ArtistOverview = (props: IPropsArtistOverview) => {
    const { id } = useParams();
    const { data: topSongs, isLoading } = useGetArtistTopSongsQuery(id || '');
    const { data: album } = useGetAlbumByIdQuery(id || '');
    const { data: playlists, isLoading: isLoadingPlaylists } = useGetArtistPlaylistsQuery(id || '');
    const { data: albums, isLoading: isLoadingAlbums } = useGetArtistAlbumsQuery(id || '');
    const { data: relatedArtists, isLoading: isLoadingRelatedArtists } = useGetRelatedArtistsQuery(id || '');


    return (
        <StyledArtistOverview className="ArtistOverview">
            <Box className="songs-and-artists">
                <Box className="tracks">
                    {!isLoading && topSongs && album && <TrackList tracks={topSongs?.data} cover={album.cover_small} />}
                </Box>
                {!isLoadingRelatedArtists && relatedArtists?.total && relatedArtists.total > 0 ? <SimilarArtistsTab artists={relatedArtists.data.slice(0, 3)} onTabChange={props.onTabChange} /> : null}
            </Box>
            {!isLoadingPlaylists && playlists?.data && <Playlists playlists={playlists.data} />}
            {!isLoadingAlbums && albums && <ArtistAlbums albums={albums.data} />}
        </StyledArtistOverview>
    )
}

export default ArtistOverview;