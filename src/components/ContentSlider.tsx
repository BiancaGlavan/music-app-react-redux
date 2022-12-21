import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/material/styles";
import { IChartsAlbum, IChartsArtist, IChartsPlaylist, IChartsTrack, ISong } from "../redux/features/apiDeezerSlice";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRef } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addSong, pause, play } from "../redux/features/playerSlice";
import classNames from "classnames";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";

interface IPropsContentSlider {
  artists?: IChartsArtist[];
  albums?: IChartsAlbum[];
  playlists?: IChartsPlaylist[];
  tracks?: IChartsTrack[];
  type: "artist" | "album" | "playlist" | "track";
}

const StyledContentSlider = styled("div")`
  margin-bottom: 30px;

  .content-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    .truncate {
      max-width: calc(100% - 20px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .slide-img {
      width: calc(100% - 20px);
      margin: 10px;
    }

    .cover {
      width: calc(100% - 20px);
      margin: 10px;
      position: relative;

      .track-img {
        width: 100%;
      }

      &:hover {
        .play-pause {
          display: flex;
        }
      }
    }
  }

  .play-pause {
    position: absolute;
    background: ${(props) => props.theme.palette.background.default};
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    display: none;
    cursor: pointer;
    padding: 0;

    .icon {
      width: 100%;
      height: 100%;
    }

    &.active {
      display: flex;
    }
  }

  .swiper {
    width: calc(100vw - 20px);
    height: 100%;
  }

  @media screen and (min-width: 900px) {
    .swiper {
      width: calc(100vw - 300px);
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    margin: 10px;

    .slider-title {
      flex-grow: 1;
    }
  }
`;

const ContentSlider = ({ artists = [], albums = [], playlists = [], tracks = [], type }: IPropsContentSlider) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const dispatch = useAppDispatch();
  const playerState = useAppSelector((state) => state.player);

  const handleAddTrack = (track: ISong, trackIndex: number) => {
    if (playerState.activeSong?.id === track.id) {
      if (playerState.isPlaying) {
        dispatch(pause());
      } else {
        dispatch(play());
      }
    } else {
      dispatch(addSong({ song: track, songList: tracks as ISong[], activeIndex: trackIndex }));
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getTitle = () => {
    if (type === "artist") return "Top Artists";
    if (type === "album") return "Top Albums";
    if (type === "playlist") return "Top Playlists";
    if (type === "track") return "Top Songs";
  };

  const getArtists = () => {
    return artists.map((artist, idx) => (
      <SwiperSlide key={artist.id} className="swiper-slide">
        <Link to={`/artists/${artist.id}`}>
          <Box className="content-slide">
            <img className="slide-img" src={artist.picture} alt="" />
            <Typography className="truncate" variant="body1">
              {artist.name}
            </Typography>
          </Box>
        </Link>
      </SwiperSlide>
    ));
  };

  const getAlbums = () => {
    return albums.map((album, idx) => (
      <SwiperSlide key={album.id} className="swiper-slide">
        <Link to={`/album/${album.id}`}>
          <Box className="content-slide">
            <img className="slide-img" src={album.cover} alt="" />
            <Typography className="truncate" variant="body1">
              {album.title}
            </Typography>
            <Typography className="truncate" variant="h6">
              {album.artist.name}
            </Typography>
          </Box>
        </Link>
      </SwiperSlide>
    ));
  };

  const getPlaylists = () => {
    return playlists.map((playlist, idx) => (
      <SwiperSlide key={playlist.id} className="swiper-slide">
        <Link to={`/playlist/${playlist.id}`}>
          <Box className="content-slide">
            <img className="slide-img" src={playlist.picture} alt="" />
            <Typography className="truncate" variant="body1">
              {playlist.title}
            </Typography>
            <Typography className="truncate" variant="h6">
              Created by: {playlist.user.name}
            </Typography>
          </Box>
        </Link>
      </SwiperSlide>
    ));
  };

  const getTracks = () => {
    const isActive = false;
    const isPlaying = false;

    const isSongActive = (song: IChartsTrack) => {
      return playerState?.activeSong?.id === song.id;
    };

    const isSongPlaying = (song: IChartsTrack) => {
      return playerState.activeSong?.id === song.id && playerState.isPlaying;
    };

    return tracks.map((track, idx) => (
      <SwiperSlide key={track.id} className="swiper-slide">
        <Box className="content-slide">
          <Box className="cover">
            <img className="track-img" src={track.album.cover_medium} alt="" />
            <IconButton
              size="large"
              onClick={() => handleAddTrack(track, idx)}
              className={classNames("play-pause", { active: isSongActive(track), playing: isSongPlaying(track) })}
            >
              {isSongPlaying(track) ? (
                <PauseCircleFilledOutlinedIcon className="icon pause" />
              ) : (
                <PlayCircleFilledOutlinedIcon className="icon play" />
              )}
            </IconButton>
          </Box>
          <Typography className="truncate" variant="body1">
            {track.title}
          </Typography>
          <Link to={`/artists/${track.artist.id}`}>
            <Typography variant="h6">{track.artist.name}</Typography>
          </Link>
        </Box>
      </SwiperSlide>
    ));
  };

  return (
    <StyledContentSlider className="ContentSlider">
      <div className="buttons">
        <Typography variant="h3" className="slider-title">
          {getTitle()}
        </Typography>
        {!isMobile && (
          <>
            <IconButton ref={navigationPrevRef}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton ref={navigationNextRef}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </>
        )}
      </div>
      <Swiper
        className="my-swiper swiper-container"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper?.params?.navigation && swiper.params.navigation !== true) {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }
        }}
        modules={[Navigation]}
        spaceBetween={1}
        slidesPerView={2.2}
        breakpoints={{
          400: {
            slidesPerView: 3.2,
          },
          600: {
            slidesPerView: 4.2,
          },
          800: {
            slidesPerView: 4.2,
          },
          900: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
          1200: {
            slidesPerView: 5.2,
          },
        }}
      >
        {type === "artist" && getArtists()}
        {type === "album" && getAlbums()}
        {type === "playlist" && getPlaylists()}
        {type === "track" && getTracks()}
      </Swiper>
    </StyledContentSlider>
  );
};

export default ContentSlider;
