import SimilarArtists from "../components/artist/SimilarArtists";
import { useGetFavoriteArtistsQuery } from "../redux/features/apiSlice";
import { useAppSelector } from "../redux/hooks";


const FavoritesPage = () => {

    const authState = useAppSelector((state) => state.auth);

    const {data, isLoading} = useGetFavoriteArtistsQuery({}, {skip: !authState.isAuth});
  return (
    <div>Favorites

        {!isLoading && data && <SimilarArtists artists={data} />}
    </div>
  )
}

export default FavoritesPage;