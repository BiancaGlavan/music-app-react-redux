import { Box, Container } from "@mui/material";
import React from "react";
import ArtistsFiltersSkeleton from "../components/loaders/ArtistsFiltersSkeleton";
import ArtistsListSkeleton from "../components/loaders/ArtistsListSkeleton";
import ContentSliderSkeleton from "../components/loaders/ContentSliderSkeleton";
import PlaylistHeaderLoader from "../components/loaders/PlaylistHeaderSkeleton";
import TrackListLoader from "../components/loaders/TrackListSkeleton";
import NavigateBack from "../components/NavigateBack";

const LoadersPage = () => {
  return (
    <Box>
     <ContentSliderSkeleton />
     <ContentSliderSkeleton />
     <ContentSliderSkeleton />
     <ContentSliderSkeleton />
    </Box>
  );
};

export default LoadersPage;
