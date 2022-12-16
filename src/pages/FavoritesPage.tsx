import { useGetFavoriteArtistsQuery } from "../redux/features/apiSlice";
import { useAppSelector } from "../redux/hooks";


const FavoritesPage = () => {

    const authState = useAppSelector((state) => state.auth);

    const {data, isLoading} = useGetFavoriteArtistsQuery({}, {skip: !authState.isAuth});
  return (
    <div>Favorites

        {!isLoading && data && data.map((artist, idx) => <h2 key={idx}>{artist.name}</h2>)}
    </div>
  )
}

export default FavoritesPage;