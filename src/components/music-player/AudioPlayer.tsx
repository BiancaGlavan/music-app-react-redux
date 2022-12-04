import { Box, Button, IconButton, Paper, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { ISong } from "../../redux/features/apiDeezerSlice";
import { PlayerState } from "../../redux/features/playerSlice";
import Queue from "./Queue";

interface IPropsAudioPlayer {
    playerState: PlayerState;
    onPrev?: () => void;
    onNext?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
}

const StyledAudioPlayer = styled(Paper)`
    display: flex;
    padding: 10px;

    .artist-info {
        display: flex;
        margin-right: 20px;
        align-items: center;
       
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
`;

const AudioPlayer = ({ playerState }: IPropsAudioPlayer) => {

    const [value, setValue] = useState(30);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
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
                    <IconButton>
                        <SkipPreviousOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <PlayCircleFilledOutlinedIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <SkipNextOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <RepeatOutlinedIcon />
                    </IconButton>
                </Box>
                <Slider className="slider" value={value} onChange={handleChange} />
            </Box>
           <Queue />

        </StyledAudioPlayer>
    )
}

export default AudioPlayer;