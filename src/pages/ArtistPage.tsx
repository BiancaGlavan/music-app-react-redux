import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistAlbums from "../components/artist/ArtistAlbums";
import ArtistOverview from "../components/artist/ArtistOverview";
import Playlists from "../components/artist/Playlists";
import SimilarArtists from "../components/artist/SimilarArtists";
import ContentHeader from "../components/ContentHeader";
import ArtistPageSkeleton from "../components/loaders/ArtistPageSkeleton";
import NavigateBack from "../components/NavigateBack";
import {
  useGetArtistAlbumsQuery,
  useGetArtistByIdQuery,
  useGetArtistPlaylistsQuery,
  useGetRelatedArtistsQuery,
} from "../redux/features/apiDeezerSlice";

const StyledArtistPage = styled(Container)``;

const ArtistPage = () => {
  // this is used for pagination. we increment by 10 each time, because we have 10 items per page
  const [playlistOffset, setPlaylistOffset] = useState(0);
  const { id } = useParams();
  const { data: artist, isLoading, isFetching } = useGetArtistByIdQuery(id || "");
  const { data: relatedArtists, isFetching: isRelatedFetching } = useGetRelatedArtistsQuery(id || "");
  const { data: playlistResponse, isLoading: isPlaylistLoading, isFetching: isPlaylistFetching } = useGetArtistPlaylistsQuery({
    artistId: id || "",
    offset: playlistOffset,
  });
  const { data: albumsResponse, isFetching: isAlbumsFetching } = useGetArtistAlbumsQuery(id || "");
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const nextPlaylistPage = () => {
    setPlaylistOffset(playlistOffset + 10);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id, activeTab]);

  return (
    <StyledArtistPage>
      <NavigateBack />
      {!isFetching && artist && <ContentHeader type="artist" artist={artist} />}
      {isFetching ? (
        <ArtistPageSkeleton />
      ) : (
        <>
          <Box className="artist-tabs">
            <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
              <Tab value="overview" label="Overview" />
              <Tab value="albums" label="Albums" />
              <Tab value="playlists" label="Playlists" />
              <Tab value="related" label="Similar Artists" />
            </Tabs>
            <Divider />
          </Box>
          {activeTab === "overview" && <ArtistOverview onTabChange={setActiveTab} />}
          {!isAlbumsFetching && albumsResponse && activeTab === "albums" && (
            <ArtistAlbums albums={albumsResponse.data} />
          )}
          {!isRelatedFetching && relatedArtists && activeTab === "related" && (
            <SimilarArtists artists={relatedArtists.data} />
          )}
          {!isPlaylistLoading && playlistResponse?.data && activeTab === "playlists" && (
            <Playlists
              playlists={playlistResponse.data}
              currentOffset={playlistOffset}
              totalItems={playlistResponse.total}
              onNextPage={nextPlaylistPage}
              isFetching={isPlaylistFetching}
            />
          )}
        </>
      )}
    </StyledArtistPage>
  );
};

export default ArtistPage;
