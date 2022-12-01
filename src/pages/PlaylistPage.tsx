import { useParams } from "react-router-dom";
import { useGetPlaylistByIdQuery } from "../redux/features/apiDeezerSlice";

const PlaylistPage = () => {
    const {id} = useParams();
    const {data: playlist, isLoading} = useGetPlaylistByIdQuery(id || '');

  return (
    <div>PlaylistPage
         {!isLoading && playlist && <div>{playlist.title}</div>}
    </div>
  )
}

export default PlaylistPage;
