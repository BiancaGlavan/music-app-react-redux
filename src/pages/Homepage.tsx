import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ContentSlider from "../components/ContentSlider";
import ContentSliderSkeleton from "../components/loaders/ContentSliderSkeleton";
import { useGetChartsQuery } from "../redux/features/apiDeezerSlice";

const StyledHomepage =styled('div')`

`;

const Homepage = () => {
  const {data: charts, isLoading} = useGetChartsQuery();
  console.log('charts: ', charts);
  return (
    <StyledHomepage className="Homepage">
      {isLoading && <>
      <ContentSliderSkeleton />
      <ContentSliderSkeleton />
      <ContentSliderSkeleton />
      <ContentSliderSkeleton />
      </>}
      {!isLoading && charts && <ContentSlider type="artist" artists={charts.artists.data}/>}
      {!isLoading && charts && <ContentSlider type="track" tracks={charts.tracks.data}/>}
      {!isLoading && charts && <ContentSlider type="playlist" playlists={charts.playlists.data}/>}
      {!isLoading && charts && <ContentSlider type="album" albums={charts.albums.data}/>}
     
     
      
    </StyledHomepage>
  )
}

export default Homepage;