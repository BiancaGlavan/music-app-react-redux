import { Container } from '@mui/material';
import React from 'react'
import ArtistsFiltersSkeleton from '../components/loaders/ArtistsFiltersSkeleton';
import ArtistsListSkeleton from '../components/loaders/ArtistsListSkeleton';
import PlaylistHeaderLoader from '../components/loaders/PlaylistHeaderSkeleton';
import TopAlbumsSkeleton from '../components/loaders/TopAlbumsSkeleton';
import TopArtistsSkeleton from '../components/loaders/TopArtistsSkeleton';
import TopPlaylistsSkeleton from '../components/loaders/TopPlaylistsSkeleton';
import TrackListLoader from '../components/loaders/TrackListSkeleton';
import NavigateBack from '../components/NavigateBack';


const LoadersPage = () => {
    return (
        <Container>
           <ArtistsFiltersSkeleton />
           <ArtistsListSkeleton />
        </Container>
    )
}

export default LoadersPage;