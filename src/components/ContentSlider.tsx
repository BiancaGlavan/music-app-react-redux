import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/material/styles";
import { IChartsAlbum, IChartsArtist, IChartsPlaylist, IChartsTrack } from "../redux/features/apiDeezerSlice";
import { Box, IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from "react-router-dom";


interface IPropsContentSlider {
    artists?: IChartsArtist[];
    albums?: IChartsAlbum[];
    playlists?: IChartsPlaylist[];
    tracks?: IChartsTrack[];
    type: 'artist' | 'album' | 'playlist' | 'track';
}

const StyledContentSlider = styled('div')`
    margin-bottom: 50px;

    .content-slide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .slide-img {
            width: calc(100% - 20px);
            margin: 10px;
        }
    }

    .swiper {
        width: calc(100vw - 20px);
        height: 100%;

    }

    @media screen and (min-width:900px) {
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

    const getTitle = () => {
        if(type === 'artist') return 'Top Artists';
        if(type === 'album') return 'Top Albums';
        if(type === 'playlist') return 'Top Playlists';
        if(type === 'track') return 'Top Songs';
    }

    const getArtists = () => {
        return artists.map((artist, idx) => <SwiperSlide key={artist.id} className="swiper-slide">
            <Box className="content-slide">
                <img className="slide-img" src={artist.picture} alt="" />
             <Link to={`/artists/${artist.id}`}>
             <Typography variant="subtitle2">
                    {artist.name}
                </Typography>
             </Link>
            </Box>
        </SwiperSlide>);
    }

    const getAlbums = () => {
        return albums.map((album, idx) => <SwiperSlide key={album.id} className="swiper-slide">
            <Box className="content-slide">
                <img className="slide-img" src={album.cover} alt="" />
                <Link to={`/album/${album.id}`}>
                <Typography variant="subtitle2">
                    {album.title}
                </Typography>
                </Link>
                <Typography variant="caption">
                    {album.artist.name}
                </Typography>
            </Box>
        </SwiperSlide>);
    }

    const getPlaylists = () => {
        return playlists.map((playlist, idx) => <SwiperSlide key={playlist.id} className="swiper-slide">
            <Box className="content-slide">
                <img className="slide-img" src={playlist.picture} alt="" />
                <Link to={`/playlist/${playlist.id}`}>
                <Typography variant="subtitle2">
                    {playlist.title}
                </Typography>
                </Link>
                <Typography variant="caption">
                    Created by: {playlist.user.name}
                </Typography>
            </Box>
        </SwiperSlide>);
    }

    const getTracks = () => {
        return tracks.map((track, idx) => <SwiperSlide key={track.id} className="swiper-slide">
            <Box className="content-slide">
                <img className="slide-img" src={track.album.cover} alt="" />
                <Typography variant="subtitle2">
                    {track.title}
                </Typography>
                <Typography variant="caption">
                    {track.artist.name}
                </Typography>
            </Box>
        </SwiperSlide>);
    }



    return (
        <StyledContentSlider className="ContentSlider">
            <div className="buttons">
                <Typography variant="subtitle1" className="slider-title">
                    {getTitle()}
                </Typography>
                <IconButton ref={navigationPrevRef}>
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton ref={navigationNextRef}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
            <Swiper className="my-swiper swiper-container" navigation={{
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

                spaceBetween={5}
                slidesPerView={1}
                breakpoints={{
                    400: {
                      slidesPerView: 2,
                    
                    },
                    600: {
                      slidesPerView: 3,
                      
                    },
                    800: {
                        slidesPerView: 4,
                    },
                    900: {
                        slidesPerView: 3,

                    },
                    1024: {
                      slidesPerView: 4,
                   
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                  }}
            >
                {type === 'artist' && getArtists()}
                {type === 'album' && getAlbums()}
                {type === 'playlist' && getPlaylists()}
                {type === 'track' && getTracks()}
            </Swiper>
        </StyledContentSlider>
    )
}

export default ContentSlider;