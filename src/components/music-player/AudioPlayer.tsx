import { Box, Button, IconButton, Paper, Slider, SpeedDial, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { ISong } from "../../redux/features/apiDeezerSlice";
import { onNextSong, onPrevSong, onVolumeChange, pause, play, PlayerState } from "../../redux/features/playerSlice";
import Queue from "./Queue";
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import { useAppDispatch } from "../../redux/hooks";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';


interface IPropsAudioPlayer {
    playerState: PlayerState;
    onPrev?: () => void;
    onNext?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
}

const StyledAudioPlayer = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;

    .player {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 100%;
    }

    .artist-info {
        display: flex;
        margin-right: 10px;
        align-items: center;
        flex-shrink: 0;
        flex-grow: 1;
        

        .fav {
            display: none;

            ${props => props.theme.breakpoints.up("sm")} {
                display: flex;
            }
        }
       
        img {
            display: none;
            

            ${props => props.theme.breakpoints.up("sm")} {
                width: 50px;
                height: 50px;
                object-fit: cover;
              }
        }

       .artist-name-and-song {
            margin-left: 10px;
            margin-right: 10px;
            overflow: hidden;
            flex-grow: 1;
            max-width: 170px;
       }
    }

    .slider-and-buttons {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

 

    .volume-btn {
        position: relative;
        margin-left: 10px;
        margin-right: 10px;

        .volume-slider {
            position: absolute;
            top: -50px;
            left: -60px;
            width: 150px;
            padding: 10px 10px;
            display: none;
        }

        &:hover {
            .volume-slider {
                display: flex;
            }
        }
    }
`;

const AudioPlayer = ({ playerState }: IPropsAudioPlayer) => {
    const [trackProgress, setTrackProgress] = useState(0);
    const [volume, setVolume] = useState(0.3);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Refs
    const audioRef = useRef(new Audio(playerState.activeSong?.preview));
    const intervalRef = useRef(0);
    const volumeRef = useRef(30);
    const isReady = useRef(false);


    const duration = audioRef.current?.duration || 0;
    const dispatch = useAppDispatch();


    const toPrevTrack = () => {

        dispatch(onPrevSong());
    }

    const toNextTrack = () => {

        dispatch(onNextSong());
    }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 300);
    };

    const onTimeChange = (value: number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);

        // If not already playing, start
        if (!playerState.isPlaying) {
            dispatch(play());
        }
        startTimer();
    };

    useEffect(() => {
        if (playerState.isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            if (isReady.current) {
                audioRef.current.pause();
            }
        }

    }, [playerState.isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        console.log('pause from use effect 2. pause().  index changed');

        audioRef.current = new Audio(playerState.activeSong?.preview);
        audioRef.current.volume = playerState.volume;
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            console.log('play from use effect 2. play()');
            audioRef.current.play();
            startTimer();

        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [playerState.currentIndex]);


    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            console.log('pause from use effect 3. unmount here');
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);


    const handlePause = () => {
        dispatch(pause());
    }

    const handlePlay = () => {
        dispatch(play());
    }

    // handle volume change
    useEffect(() => {
        audioRef.current.volume = playerState.volume;
    }, [playerState.volume]);



    const handleChange = (event: Event, newValue: number | number[]) => {
        onTimeChange(newValue as number);
    };

    return (
        <StyledAudioPlayer className="AudioPlayer" variant="outlined">
            <Box className="player">
                <Box className="artist-info">
                    <img src={playerState.activeSong?.album.cover_small} alt="" />
                    <Box className="artist-name-and-song">
                        <Typography noWrap variant="body2">{playerState.activeSong?.title}</Typography>
                        <Typography noWrap variant="caption">{playerState.activeSong?.artist.name}</Typography>
                    </Box>
                    <Box>
                        <IconButton className="fav">
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
                {!isMobile && <Box className="slider-and-buttons">
                    <Box className="buttons">
                        {!isMobile && <><IconButton>
                            <ShuffleOutlinedIcon />
                        </IconButton>
                            <IconButton onClick={toPrevTrack}>
                                <SkipPreviousOutlinedIcon />
                            </IconButton></>
                        }

                        {playerState.isPlaying ?
                            <IconButton onClick={handlePause}><PauseCircleFilledOutlinedIcon fontSize="large" /></IconButton> :
                            <IconButton onClick={handlePlay}><PlayCircleFilledOutlinedIcon fontSize="large" /></IconButton>
                        }


                        {!isMobile && <><IconButton onClick={toNextTrack}>
                            <SkipNextOutlinedIcon />
                        </IconButton><IconButton>
                                <RepeatOutlinedIcon />
                            </IconButton></>}
                    </Box>
                    {!isMobile && <Slider className="slider" step={0.1} min={0} max={duration} value={trackProgress || 0} onChange={handleChange} />}
                </Box>}
                {!isMobile && <Box className="volume" sx={{ width: 100 }}>
                    <IconButton className="volume-btn">
                        <Paper elevation={3} className="volume-slider">
                            <Slider className="" step={0.1} min={0} max={1}
                                value={playerState.volume}
                                onChange={(e, val) => dispatch(onVolumeChange(val as number))} />
                        </Paper>
                        {playerState.volume === 0 && <VolumeOffIcon />}
                        {playerState.volume > 0 && playerState.volume < 0.5 && <VolumeDownIcon />}
                        {playerState.volume >= 0.5 && <VolumeUpIcon />}
                    </IconButton>
                </Box>}

                {isMobile && (playerState.isPlaying ?
                    <IconButton onClick={handlePause}><PauseCircleFilledOutlinedIcon fontSize="large" /></IconButton> :
                    <IconButton onClick={handlePlay}><PlayCircleFilledOutlinedIcon fontSize="large" /></IconButton>
                )}
                <Queue />
            </Box>
            {isMobile && <Slider className="slider" step={0.1} min={0} max={duration} value={trackProgress || 0} onChange={handleChange} />}

        </StyledAudioPlayer>
    )
}

export default AudioPlayer;