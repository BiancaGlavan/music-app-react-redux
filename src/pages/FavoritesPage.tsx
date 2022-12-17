import { styled } from "@mui/material/styles";
import { Box, Chip, Container } from "@mui/material";
import { useState } from "react";
import SimilarArtists from "../components/artist/SimilarArtists";
import { useGetFavoriteAlbumsQuery, useGetFavoriteArtistsQuery } from "../redux/features/apiSlice";
import { useAppSelector } from "../redux/hooks";
import classNames from "classnames";

const StyledFavoritesPage = styled(Container)`
  .chips {
    margin-top: 20px;
    display: flex;
    gap: 10px;

    .chip {

      &.active {
        background: ${props => props.theme.palette.primary.main};
      }
    }
  }
`;

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState("artists");
  const authState = useAppSelector((state) => state.auth);

  const { data: artists, isLoading: isLoadingArtists } = useGetFavoriteArtistsQuery({}, { skip: !authState.isAuth });
  const { data: albums, isLoading: isLoadingAlbums } = useGetFavoriteAlbumsQuery({});

  return (
    <StyledFavoritesPage>
      <Box className="chips">
        <Chip label="Artists" className={classNames('chip', {active: activeTab === 'artists'})} onClick={() => setActiveTab("artists")} />
        <Chip label="Albums" className={classNames('chip', {active: activeTab === 'albums'})} onClick={() => setActiveTab("albums")} />
        <Chip label="Playlists" className={classNames('chip', {active: activeTab === 'playlists'})} onClick={() => setActiveTab("playlists")} />
        <Chip label="Songs" className={classNames('chip', {active: activeTab === 'songs'})} onClick={() => setActiveTab("songs")} />
      </Box>

      {activeTab === 'artists' && !isLoadingArtists && artists && <SimilarArtists title="Favorite Artists" artists={artists} />}
      {activeTab === 'albums' && !isLoadingAlbums && albums && <div>{albums.map((album) => <h6>{album.title}</h6>)}</div>}
    </StyledFavoritesPage>
  );
};

export default FavoritesPage;
