import { Box, Button, IconButton, Paper, Slider, SpeedDial, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { ISong } from "../../redux/features/apiDeezerSlice";
import { onNextSong, onPrevSong, pause, play, PlayerState } from "../../redux/features/playerSlice";
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
    align-items: center;
    padding: 10px;

    .artist-info {
        display: flex;
        margin-right: 20px;
        align-items: center;
        flex-shrink: 0;
        min-width: 350px;
       
        img {
            width: 60px;
            height: 60px;
            object-fit: cover;
        }

       .artist-name-and-song {
        margin-left: 20px;
        margin-right: 20px;
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

    .volume {
        margin-left: 20px;
        margin-right: 20px;
    }

    .volume-btn {
        position: relative;

        .volume-slider {
            position: absolute;
            top: -50px;
            left: -70px;
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




    // Refs
    const audioRef = useRef(new Audio(playerState.activeSong?.preview));
    const intervalRef = useRef(0);
    const volumeRef = useRef(30);
    const isReady = useRef(false);


    const { duration } = audioRef.current;
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

    const onScrub = (value: number) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);

        onScrubEnd();
    };

    const onScrubEnd = () => {
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
            audioRef.current.pause();
        }
    }, [playerState.isPlaying]);


    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(playerState.activeSong?.preview);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            //   setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [playerState.currentIndex]);


    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
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
        audioRef.current.volume = volume;
    }, [volume]);



    const handleChange = (event: Event, newValue: number | number[]) => {
        onScrub(newValue as number);
    };


    return (
        <StyledAudioPlayer className="AudioPlayer" variant="outlined">
            <Box className="artist-info">
                <img src={playerState.activeSong?.album.cover_small} alt="" />
                <Box className="artist-name-and-song">
                    <Typography variant="body2">{playerState.activeSong?.title}</Typography>
                    <Typography variant="caption">{playerState.activeSong?.artist.name}</Typography>
                </Box>
                <Box>
                    <IconButton>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box className="slider-and-buttons">
                <Box className="buttons">
                    <IconButton>
                        <ShuffleOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={toPrevTrack}>
                        <SkipPreviousOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        {playerState.isPlaying ?
                            <PauseCircleFilledOutlinedIcon fontSize="large" onClick={handlePause} /> :
                            <PlayCircleFilledOutlinedIcon fontSize="large" onClick={handlePlay} />}

                    </IconButton>
                    <IconButton onClick={toNextTrack}>
                        <SkipNextOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <RepeatOutlinedIcon />
                    </IconButton>
                </Box>
                <Slider className="slider" step={0.1} min={0} max={duration} value={trackProgress} onChange={handleChange} />
            </Box>
            <Box className="volume" sx={{ width: 100 }}>
                <IconButton className="volume-btn">
                    <Paper  elevation={3} className="volume-slider">
                        <Slider className="" step={0.1} min={0} max={1}
                            value={volume}
                            onChange={(e, val) => setVolume(val as number)} />
                    </Paper>
                    {volume === 0 && <VolumeOffIcon />}
                    {volume > 0 && volume < 0.5 && <VolumeDownIcon />}
                    {volume >= 0.5 && <VolumeUpIcon />}

                </IconButton>

            </Box>
            <Queue />

        </StyledAudioPlayer>
    )
}

export default AudioPlayer;