import { Box, Container } from "@mui/material";
import React from "react";
import AlbumHeaderSkeleton from "../components/loaders/AlbumHeaderSkeleton";
import ArtistsFiltersSkeleton from "../components/loaders/ArtistsFiltersSkeleton";
import ArtistsListSkeleton from "../components/loaders/ArtistsListSkeleton";
import ContentSliderSkeleton from "../components/loaders/ContentSliderSkeleton";
import PlaylistHeaderSkeleton from "../components/loaders/PlaylistHeaderSkeleton";
import PlaylistHeaderLoader from "../components/loaders/PlaylistHeaderSkeleton";
import TrackListSkeleton from "../components/loaders/TrackListSkeleton";
import TrackListLoader from "../components/loaders/TrackListSkeleton";
import NavigateBack from "../components/NavigateBack";

const LoadersPage = () => {
  return (
    <Container>
      <NavigateBack />
      <PlaylistHeaderSkeleton />
      <TrackListSkeleton />
    </Container>
  );
};

export default LoadersPage;
