import { useParams } from "react-router-dom";
import { useGetAlbumByIdQuery } from "../redux/features/apiDeezerSlice";


const AlbumPage = () => {
    const {id} = useParams();
    const {data: album, isLoading} = useGetAlbumByIdQuery(id || '');

  return (
    <div>AlbumPage
        {!isLoading && album && <div>{album.title}</div>}
    </div>
  )
}

export default AlbumPage;