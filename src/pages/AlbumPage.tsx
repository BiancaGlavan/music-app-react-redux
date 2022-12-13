import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetAlbumByIdQuery } from "../redux/features/apiDeezerSlice";
import TrackList from "../components/album/TrackList";
import NavigateBack from "../components/NavigateBack";
import AlbumPageLoader from "../components/loaders/AlbumPageLoader";
import { useEffect } from "react";
import ContentHeader from "../components/ContentHeader";


const StyledAlbumPage = styled(Container)`

`;

const AlbumPage = () => {
  const { id } = useParams();
  const { data: album, isLoading } = useGetAlbumByIdQuery(id || '');

  useEffect(() => {
    window.scrollTo({top: 0, left: 0});
  }, [id]);

  return (
    <StyledAlbumPage>
      <NavigateBack />
      {isLoading && <AlbumPageLoader />}
      {!isLoading && album && <ContentHeader type="album" album={album} />}
      {!isLoading && album && <TrackList cover={album.cover_small} tracks={album.tracks.data} />}
    </StyledAlbumPage>
  )
}

export default AlbumPage;