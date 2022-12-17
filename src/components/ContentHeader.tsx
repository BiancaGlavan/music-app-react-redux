import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import secondsToAlbumTime from "../helpers/timeFormater";
import { IAlbumResponse, IArtist, IPlaylistResponse } from "../redux/features/apiDeezerSlice";
import { useAddAlbumToFavMutation, useAddArtistToFavMutation } from "../redux/features/apiSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../redux/hooks";
import ShareIcon from "@mui/icons-material/Share";

interface IPropsContentHeader {
  artist?: IArtist;
  playlist?: IPlaylistResponse;
  album?: IAlbumResponse;
  type: "artist" | "album" | "playlist";
}

const StyledContentHeader = styled("div")`
  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    .fav-btn {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }

  .ArtistPage {
    display: flex;
    margin-bottom: 30px;

    .artist-page-img {
      max-width: 100px;
      max-height: 100px;

      ${(props) => props.theme.breakpoints.up("sm")} {
        max-width: 200px;
        max-height: 200px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    .artist-page-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
    }
  }

  .PlaylistAndAlbumHeader {
    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) => props.theme.breakpoints.up("sm")} {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      .playlist-img {
        margin-right: 30px;
        max-width: 250px;
        max-height: 250px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .artist-details {
      margin-top: 10px;
      text-align: center;

      ${(props) => props.theme.breakpoints.up("sm")} {
        text-align: justify;
      }

      .details {
        margin-right: 15px;
      }
    }
  }

  .playlist-info {
    display: flex;
    flex-direction: column;

    .playlist-artist {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      align-items: center;

      ${(props) => props.theme.breakpoints.up("sm")} {
        align-items: flex-start;
      }
    }

    .playlist-name {
      text-align: center;

      ${(props) => props.theme.breakpoints.up("sm")} {
        text-align: justify;
      }
    }

    .playlist-artist {
      .text {
        text-align: center;

        ${(props) => props.theme.breakpoints.up("sm")} {
          text-align: justify;
        }
      }
    }
  }

  .album-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) => props.theme.breakpoints.up("sm")} {
      align-items: flex-start;
    }

    .album-name {
      text-align: center;
    }

    .album-artist {
      display: flex;
      margin-top: 20px;
      align-items: center;

      .artist-img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
  }
`;

const ContentHeader = ({ artist, playlist, album, type }: IPropsContentHeader) => {
  const [addArtistToFav, addArtistToFavResponse] = useAddArtistToFavMutation();
  const [addAlbumToFav, addAlbumToFavResponse] = useAddAlbumToFavMutation();

  const authState = useAppSelector((state) => state.auth);

  const handleAddArtistToFav = () => {
    if (artist) {
      const artistToSave = {
        deezer_id: artist.id,
        name: artist.name,
        picture_big: artist.picture_big,
        nb_fan: artist.nb_fan,
        picture: artist.picture,
      };

      addArtistToFav({ artist: artistToSave });
    }
  };

  const handleAddAlbumToFav = () => {
    if (album) {
      const albumToSave = {
        deezer_id: album.id,
        title: album.title,
        artist: album.artist.name,
        cover_medium: album.cover_medium,
      };

      addAlbumToFav({ album: albumToSave});
    }
  };

  const handleAddPlaylistToFav = () => {
    if(playlist){
      const playlistToSave = {
        deezer_id: playlist.id,
        title: playlist.title,
        picture_medium: playlist.picture_medium,
        creator: playlist.creator.name
      }
    }
  };

  const artistHeader = () => {
    const isFavorite = artist ? authState.favorites.artists.includes(artist.id) : false;
    return (
      <Box className="ArtistPage">
        <Box className="artist-page-img">
          <img src={artist?.picture_big} alt="artist-picture" />
        </Box>
        <Box className="artist-page-details">
          <Typography variant="h6">{artist?.name}</Typography>
          {artist && (
            <Typography variant="subtitle2" color="textSecondary">
              {" "}
              {new Intl.NumberFormat().format(artist.nb_fan)} listeners
            </Typography>
          )}
          <Box className="buttons">
            <IconButton className="fav-btn" onClick={handleAddArtistToFav}>
              {!isFavorite ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
            </IconButton>
            <IconButton className="share-btn">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  const playlistHeader = () => {
    const isFavorite = playlist ? authState.favorites.playlists.includes(playlist.id) : false;

    return (
      <Box className="PlaylistAndAlbumHeader">
        <Box className="playlist-img">
          <img src={playlist?.picture_medium} alt="" />
        </Box>
        <Box className="playlist-info">
          <Typography variant="h6" className="playlist-name">
            {playlist?.title}
          </Typography>
          <Box className="playlist-artist">
            <Typography className="text" variant="body1">
              Created by: {playlist?.creator.name}
            </Typography>
            <Typography className="text" variant="body2">
              {playlist?.description}
            </Typography>
          </Box>
          <Box className="artist-details">
            <Typography className="details" color="textSecondary" variant="caption">
              {playlist?.nb_tracks} tracks
            </Typography>
            {playlist && (
              <Typography className="details" color="textSecondary" variant="caption">
                {secondsToAlbumTime(playlist?.duration)}
              </Typography>
            )}
            <Typography className="details" color="textSecondary" variant="caption">
              {playlist?.creation_date}
            </Typography>
            {playlist && (
              <Typography className="details" color="textSecondary" variant="caption">
                {new Intl.NumberFormat().format(playlist.fans)} listeners
              </Typography>
            )}
          </Box>
          <Box className="buttons">
            <IconButton className="fav-btn" onClick={handleAddPlaylistToFav}>
              {!isFavorite ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
            </IconButton>
            <IconButton className="share-btn">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  const albumHeader = () => {
    const isFavorite = album ? authState.favorites.albums.includes(album.id) : false;
    return (
      <Box className="PlaylistAndAlbumHeader">
        <Box className="playlist-img">
          <img src={album?.cover_medium} alt="" />
        </Box>
        <Box className="album-info">
          <Typography variant="h6" className="playlist-name">
            {album?.title}
          </Typography>
          <Box className="album-artist">
            <Link to={`/artists/${album?.artist.id}`}>
              <img className="artist-img" src={album?.artist.picture} alt="" />
            </Link>
            <Link to={`/artists/${album?.artist.id}`}>
              <Typography variant="subtitle1">{album?.artist.name}</Typography>
            </Link>
          </Box>
          <Box className="artist-details">
            <Typography className="details" color="textSecondary" variant="caption">
              {album?.nb_tracks} tracks
            </Typography>
            {album && (
              <Typography className="details" color="textSecondary" variant="caption">
                {secondsToAlbumTime(album?.duration)}
              </Typography>
            )}
            <Typography className="details" color="textSecondary" variant="caption">
              {album?.release_date}
            </Typography>
            {album && (
              <Typography className="details" color="textSecondary" variant="caption">
                {new Intl.NumberFormat().format(album.fans)} listeners
              </Typography>
            )}
          </Box>
          <Box className="buttons">
            <IconButton className="fav-btn" onClick={handleAddAlbumToFav}>
              {!isFavorite ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
            </IconButton>
            <IconButton className="share-btn">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <StyledContentHeader>
      <>
        {type === "artist" && artistHeader()}
        {type === "playlist" && playlistHeader()}
        {type === "album" && albumHeader()}
      </>
    </StyledContentHeader>
  );
};

export default ContentHeader;
