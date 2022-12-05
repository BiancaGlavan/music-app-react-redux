import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import TrackList from "../components/album/TrackList";
import NavigateBack from "../components/NavigateBack";
import PlaylistHeader from "../components/playlist/PlaylistHeader";
import { useGetPlaylistByIdQuery } from "../redux/features/apiDeezerSlice";

const StyledPlaylistPage = styled(Container)`
  
`;

const PlaylistPage = () => {
    const {id} = useParams();
    const {data: playlist, isLoading} = useGetPlaylistByIdQuery(id || '');

  return (
    <StyledPlaylistPage>
          <NavigateBack />
         {!isLoading && playlist && <PlaylistHeader playlist={playlist}/>}
         {!isLoading && playlist && <TrackList cover={playlist.picture} tracks={playlist.tracks.data}/>}
    </StyledPlaylistPage>
  )
}

export default PlaylistPage;
