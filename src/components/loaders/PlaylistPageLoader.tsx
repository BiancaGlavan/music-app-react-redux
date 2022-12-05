import { Container } from "@mui/material";
import PlaylistHeaderSkeleton from "./PlaylistHeaderSkeleton";
import TrackListSkeleton from "./TrackListSkeleton";


const PlaylistPageLoader = () => {
  return (
    <Container>
            <PlaylistHeaderSkeleton />
            <TrackListSkeleton />
        </Container>
  )
}

export default PlaylistPageLoader;