import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackList from "../components/album/TrackList";
import ContentHeader from "../components/ContentHeader";
import PlaylistPageLoader from "../components/loaders/PlaylistPageLoader";
import NavigateBack from "../components/NavigateBack";
import { useGetPlaylistByIdQuery } from "../redux/features/apiDeezerSlice";

const StyledPlaylistPage = styled(Container)`
  
`;

const PlaylistPage = () => {
  const { id } = useParams();
  const { data: playlist, isLoading } = useGetPlaylistByIdQuery(id || '');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  return (
    <StyledPlaylistPage>
      <NavigateBack />
      {isLoading && <PlaylistPageLoader />}
      {!isLoading && playlist && <ContentHeader type="playlist" playlist={playlist} />}
      {!isLoading && playlist && <TrackList cover={playlist.picture} tracks={playlist.tracks.data} />}
    </StyledPlaylistPage>
  )
}

export default PlaylistPage;
