import { Container } from "@mui/material";
import NavigateBack from "../../NavigateBack";
import AlbumHeaderLoader from "../AlbumHeaderLoader";
import TrackListLoader from "../TrackListLoader";

const AlbumPageLoader = () => {
    return (
        <Container>
            <AlbumHeaderLoader />
            <TrackListLoader />
        </Container>
    )
}

export default AlbumPageLoader;