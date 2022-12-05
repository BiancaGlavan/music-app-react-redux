import { Container } from "@mui/material";
import NavigateBack from "../NavigateBack";
import AlbumHeaderSkeleton from "./AlbumHeaderSkeleton";
import TrackListSkeleton from "./TrackListSkeleton";

const AlbumPageLoader = () => {
    return (
        <Container>
            <AlbumHeaderSkeleton />
            <TrackListSkeleton />
        </Container>
    )
}

export default AlbumPageLoader;