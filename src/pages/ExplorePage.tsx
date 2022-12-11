import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ArtistsFilters from "../components/artist/ArtistsFilters";
import ArtistsList from "../components/artist/ArtistsList";
import ArtistsFiltersSkeleton from "../components/loaders/ArtistsFiltersSkeleton";
import ArtistsListSkeleton from "../components/loaders/ArtistsListSkeleton";
import { useGetArtistsByGenreQuery, useGetGenresQuery } from "../redux/features/apiDeezerSlice";

const StyledExplorePage = styled(Container)``;

const ExplorePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);

  const {data: genresRes, isLoading: isGenresLoading} = useGetGenresQuery();

  const {data: artistsRes, isLoading: isArtistsLoading, isFetching} = useGetArtistsByGenreQuery(selectedGenre);

  return (
    <StyledExplorePage>
      {isGenresLoading && <ArtistsFiltersSkeleton />}
      <ArtistsFilters activeGenreId={selectedGenre} onChange={setSelectedGenre} genres={genresRes?.data || []}/>
   
      {!isArtistsLoading && !isFetching && artistsRes && <ArtistsList artists={artistsRes.data}/>}
      {isArtistsLoading && <ArtistsListSkeleton />}
     
    </StyledExplorePage>
  )
}

export default ExplorePage;