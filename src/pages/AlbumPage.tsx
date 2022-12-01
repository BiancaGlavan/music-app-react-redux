import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AlbumHeader from "../components/album/AlbumHeader";
import { useGetAlbumByIdQuery } from "../redux/features/apiDeezerSlice";
import TrackList from "../components/album/TrackList";


const StyledAlbumPage = styled(Container)`
    padding-top: 30px;
`;

const AlbumPage = () => {
    const {id} = useParams();
    const {data: album, isLoading} = useGetAlbumByIdQuery(id || '');

  return (
    <StyledAlbumPage>
        {!isLoading && album && <AlbumHeader album={album}/>}
        {!isLoading && album && <TrackList cover={album.cover_small} tracks={album.tracks.data}/>}
    </StyledAlbumPage>
  )
}

export default AlbumPage;