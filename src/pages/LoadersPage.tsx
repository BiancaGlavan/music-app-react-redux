import { Container } from '@mui/material';
import React from 'react'
import AlbumHeaderLoader from '../components/loaders/AlbumHeaderLoader';
import TrackListLoader from '../components/loaders/TrackListLoader';
import NavigateBack from '../components/NavigateBack';


const LoadersPage = () => {
    return (
        <Container>
            <NavigateBack />
            <AlbumHeaderLoader />
            <TrackListLoader />
        </Container>
    )
}

export default LoadersPage;