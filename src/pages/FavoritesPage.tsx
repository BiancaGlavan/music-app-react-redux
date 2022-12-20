import { styled } from "@mui/material/styles";
import { Box, Chip, Container } from "@mui/material";
import { useState } from "react";
import SimilarArtists from "../components/artist/SimilarArtists";
import {
  IPlaylistCustom,
  ISongCustom,
  useGetFavoriteAlbumsQuery,
  useGetFavoriteArtistsQuery,
  useGetFavoritePlaylistsQuery,
  useGetFavoriteSongsQuery,
} from "../redux/features/apiSlice";
import { useAppSelector } from "../redux/hooks";
import classNames from "classnames";
import FavoriteAlbums from "../components/album/FavoriteAlbums";
import TrackList from "../components/album/TrackList";
import { IPlaylist, ISong } from "../redux/features/apiDeezerSlice";
import Playlists from "../components/artist/Playlists";

const StyledFavoritesPage = styled(Container)`
  .chips {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .chip {
      &.active {
        background: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
`;

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState("artists");
  const authState = useAppSelector((state) => state.auth);

  const { data: artists, isLoading: isLoadingArtists } = useGetFavoriteArtistsQuery({}, { skip: !authState.isAuth });
  const { data: albums, isLoading: isLoadingAlbums } = useGetFavoriteAlbumsQuery({});
  const { data: playlists, isLoading: isLoadingPlaylists, isFetching: isFetchingPlaylists } = useGetFavoritePlaylistsQuery({});
  const { data: songs, isLoading: isLoadingSongs } = useGetFavoriteSongsQuery({});

  const convertCustomSongs = (customSongs: ISongCustom[]): ISong[] => {
    return customSongs.map((customSong) => {
      return {
        id: customSong.deezer_id,
        title: customSong.title,
        preview: customSong.preview,
        explicit_lyrics: false,
        type: "",
        duration: customSong.duration,
        album: {
          id: 0,
          title: "",
          cover: customSong.album_cover,
          cover_medium: "",
          cover_small: "",
          cover_big: "",
        },
        artist: {
          id: customSong.artist_id,
          name: customSong.artist_name,
        },
      };
    });
  };

  const convertCustomPlaylists = (customPlaylists: IPlaylistCustom[]): IPlaylist[] => {
    return customPlaylists.map((customPlaylist) => {
      return {
        id: customPlaylist.deezer_id,
        picture: customPlaylist.picture_medium,
        picture_medium: customPlaylist.picture_medium,
        title: customPlaylist.title,
        user: {
          name: customPlaylist.creator,
        },
      };
    });
  };

  return (
    <StyledFavoritesPage>
      <Box className="chips">
        <Chip
          label="Artists"
          className={classNames("chip", { active: activeTab === "artists" })}
          onClick={() => setActiveTab("artists")}
        />
        <Chip
          label="Albums"
          className={classNames("chip", { active: activeTab === "albums" })}
          onClick={() => setActiveTab("albums")}
        />
        <Chip
          label="Playlists"
          className={classNames("chip", { active: activeTab === "playlists" })}
          onClick={() => setActiveTab("playlists")}
        />
        <Chip
          label="Songs"
          className={classNames("chip", { active: activeTab === "songs" })}
          onClick={() => setActiveTab("songs")}
        />
      </Box>

      {activeTab === "artists" && !isLoadingArtists && artists && (
        <SimilarArtists title="Favorite Artists" artists={artists} />
      )}
      {activeTab === "albums" && !isLoadingAlbums && albums && <FavoriteAlbums albums={albums} />}
      {activeTab === "playlists" && !isLoadingPlaylists && playlists && (
        <Playlists  playlists={convertCustomPlaylists(playlists)} title={'Favorite Playlists'} />
      )}
      {activeTab === "songs" && !isLoadingSongs && songs && <TrackList cover="" tracks={convertCustomSongs(songs)} />}
    </StyledFavoritesPage>
  );
};

export default FavoritesPage;
