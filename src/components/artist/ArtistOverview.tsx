import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useGetAlbumByIdQuery, useGetArtistAlbumsQuery, useGetArtistPlaylistsQuery, useGetArtistTopSongsQuery } from "../../redux/features/apiDeezerSlice";
import TrackList from "../album/TrackList";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Playlists from "./Playlists";
import ArtistAlbums from "./ArtistAlbums";

const StyledArtistOverview = styled('div')`
    .songs-and-artists {
        display: flex;
    }

    .tracks {
        width: 65%;
    }

    .similar-artists {
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

    }
  

  
`;

const ArtistOverview = () => {
    const { id } = useParams();
    const { data: topSongs, isLoading } = useGetArtistTopSongsQuery(id || '');
    const { data: album } = useGetAlbumByIdQuery(id || '');
    const { data: playlists, isLoading: isLoadingPlaylists} = useGetArtistPlaylistsQuery(id || '');
    const { data: albums, isLoading: isLoadingAlbums} = useGetArtistAlbumsQuery(id || '');

    return (
        <StyledArtistOverview>
            <Box className="songs-and-artists">
                <Box className="tracks">
                    {!isLoading && topSongs && album && <TrackList tracks={topSongs?.data} cover={album.cover_small} />}
                </Box>
                <Box className="similar-artists">
                    <Typography className="similar-artists-title" variant="h6">Fans also like</Typography>
                    <Box className="artist-info">
                        <img className="artist-img" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                        <Box className="name-and-fans">
                            <Typography variant="subtitle2">Justin Bieber</Typography>
                            <Typography variant="caption" color="textSecondary">1234 fans</Typography>
                        </Box>
                        <Box className="icon">
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className="artist-info">
                        <img className="artist-img" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                        <Box className="name-and-fans">
                            <Typography variant="subtitle2">Justin Bieber</Typography>
                            <Typography variant="caption" color="textSecondary">1234 fans</Typography>
                        </Box>
                        <Box className="icon">
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className="artist-info">
                        <img className="artist-img" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
                        <Box className="name-and-fans">
                            <Typography variant="subtitle2">Justin Bieber</Typography>
                            <Typography variant="caption" color="textSecondary">1234 fans</Typography>
                        </Box>
                        <Box className="icon">
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Button variant="outlined">See more artists</Button>
                </Box>
            </Box>
            {!isLoadingPlaylists && playlists && <Playlists playlists={playlists.data}/>}
            {!isLoadingAlbums && albums && <ArtistAlbums albums={albums.data}/>}

        </StyledArtistOverview>
    )
}

export default ArtistOverview;