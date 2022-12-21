import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
  useGetAlbumByIdQuery,
  useGetArtistAlbumsQuery,
  useGetArtistPlaylistsQuery,
  useGetArtistTopSongsQuery,
  useGetRelatedArtistsQuery,
} from "../../redux/features/apiDeezerSlice";
import TrackList from "../album/TrackList";

import Playlists from "./Playlists";
import ArtistAlbums from "./ArtistAlbums";
import SimilarArtistsTab from "./SimilarArtistsTab";

interface IPropsArtistOverview {
  onTabChange: (tab: string) => void;
}

const StyledArtistOverview = styled("div")`
 
`;

const ArtistOverview = ({ onTabChange }: IPropsArtistOverview) => {
  const { id } = useParams();
  const { data: topSongs, isLoading } = useGetArtistTopSongsQuery(id || "");
  const { data: album } = useGetAlbumByIdQuery(id || "");
  const { data: playlists, isLoading: isLoadingPlaylists } = useGetArtistPlaylistsQuery({
    artistId: id || "",
    offset: 0,
  });
  const { data: albums, isLoading: isLoadingAlbums } = useGetArtistAlbumsQuery(id || "");
  const { data: relatedArtists, isLoading: isLoadingRelatedArtists } = useGetRelatedArtistsQuery(id || "");

  return (
    <StyledArtistOverview className="ArtistOverview">
      <Grid container spacing={2}>
        {!isLoading && topSongs && topSongs.total > 0 && album && (
          <Grid item xs={12} sm={12} lg={8}>
            <TrackList tracks={topSongs?.data} cover={album.cover_small} />
          </Grid>
        )}

        {!isLoadingRelatedArtists && relatedArtists?.total && relatedArtists.total > 0 ? (
          <Grid item xs={12} sm={12} lg={4}>
            <SimilarArtistsTab artists={relatedArtists.data.slice(0, 3)} onTabChange={onTabChange} />
          </Grid>
        ) : null}
      </Grid>
      {/* {!isLoadingPlaylists && playlists?.data && <Playlists playlists={playlists.data} />} */}
      {!isLoadingAlbums && albums && <ArtistAlbums albums={albums.data} />}
    </StyledArtistOverview>
  );
};

export default ArtistOverview;
