import { Container } from '@mui/material';
import React from 'react'
import PlaylistHeaderLoader from '../components/loaders/PlaylistHeaderSkeleton';
import TrackListLoader from '../components/loaders/TrackListSkeleton';
import NavigateBack from '../components/NavigateBack';


const LoadersPage = () => {
    return (
        <Container>
            <NavigateBack />
            <PlaylistHeaderLoader />
            <TrackListLoader />
        </Container>
    )
}

export default LoadersPage;