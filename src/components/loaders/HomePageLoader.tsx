import TopAlbumsSkeleton from "./TopAlbumsSkeleton";
import TopArtistsSkeleton from "./TopArtistsSkeleton";
import TopPlaylistsSkeleton from "./TopPlaylistsSkeleton";


const HomePageLoader = () => {
  return (
    <div>
         <TopAlbumsSkeleton />
           <TopPlaylistsSkeleton />
           <TopAlbumsSkeleton />
           <TopArtistsSkeleton />
    </div>
  )
}

export default HomePageLoader;