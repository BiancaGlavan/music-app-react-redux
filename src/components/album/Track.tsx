import { Box, IconButton, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IAlbumResponse, ISong } from "../../redux/features/apiDeezerSlice";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import classNames from "classnames";
import { secondsToSongTime } from "../../helpers/timeFormater";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddSongToFavMutation } from "../../redux/features/apiSlice";

interface IPropsTrack {
  track: ISong;
  cover: string;
  trackNr: number;
  isActive?: boolean;
  isPlaying?: boolean;
  onAddTrack?: () => void;
}

const StyledTrack = styled(Paper)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .track-nr {
    margin: 0 20px;
  }

  .cover {
    width: 40px;
    height: 40px;
    margin: 5px;
    position: relative;
    flex-shrink: 0;

    ${(props) => props.theme.breakpoints.up("md")} {
      width: 50px;
      height: 50px;
    }

    img {
      width: 100%;
    }

    .play-pause {
      position: absolute;
      background: ${(props) => props.theme.palette.background.default};
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      display: none;
      cursor: pointer;
      padding: 0;

      ${(props) => props.theme.breakpoints.up("md")} {
        width: 40px;
        height: 40px;
      }

      .icon {
        width: 100%;
        height: 100%;
      }

      &.active {
        display: flex;
      }
    }
  }

  &:hover {
    .cover {
      .play-pause {
        display: flex;
      }
    }
  }

  .track-artist {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .artist-link {
      padding: 0;
      margin: 0;
      line-height: 18px;
    }
  }

  .more {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .fav-btn {
      color: ${(props) => props.theme.palette.secondary.main};
    }

    .duration {
      min-width: 33px;
    }
  }

  .artist-name {
    &:hover {
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

const Track = ({ track, cover, trackNr, isActive = false, isPlaying = false, onAddTrack = () => {} }: IPropsTrack) => {
    const authState = useAppSelector((state) => state.auth);
    const isFavorite = authState.favorites.songs.includes(track.id);
    const [addSongToFav, addSongToFavResponse] = useAddSongToFavMutation();

    const handleAddSongToFav = () => {
        if (track) {
            const songToSave = {
                deezer_id: track.id,
                title: track.title,
                preview: track.preview,
                duration: track.duration,
                album_cover: track.album.cover,
                artist_id: track.artist.id,
                artist_name: track.artist.name,
            };
      
            addSongToFav({ song: songToSave });
          }
    }

  return (
    <StyledTrack className="Track" elevation={isActive ? 5 : 1}>
      <Box className="cover">
        <img src={track.album.cover || cover} alt="track-cover" />
        <IconButton onClick={onAddTrack} className={classNames("play-pause", { active: isActive, playing: isPlaying })}>
          {isPlaying ? (
            <PauseCircleFilledOutlinedIcon className="icon pause" />
          ) : (
            <PlayCircleFilledOutlinedIcon className="icon play" />
          )}
        </IconButton>
      </Box>
      <Typography className="track-nr" variant="h6">
        {trackNr}
      </Typography>
      <Box className="track-artist">
        <Typography noWrap variant="h4">
          {track.title}
        </Typography>
        <Link className="artist-link" to={`/artists/${track.artist.id}`}>
          <Typography noWrap className="artist-name" variant="h6" color="textSecondary">
            {track.artist.name}
          </Typography>
        </Link>
      </Box>
      <Box className="more">
        <IconButton className="fav-btn" onClick={handleAddSongToFav}>
          {!isFavorite ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
        </IconButton>
        <Typography variant="h6" className="duration">
          {secondsToSongTime(track.duration)}
        </Typography>
      </Box>
    </StyledTrack>
  );
};

export default Track;
