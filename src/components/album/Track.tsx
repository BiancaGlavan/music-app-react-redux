import { Box, IconButton, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IAlbumResponse, ISong } from "../../redux/features/apiDeezerSlice";
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import classNames from "classnames";
import { secondsToSongTime } from "../../helpers/timeFormater";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from "react-router-dom";

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
        width: 50px;
        height: 50px;
        margin: 5px;
        position: relative;

        img {
            width: 100%;
        }

        .play-pause {
            position: absolute;
            background: ${props => props.theme.palette.background.default};
            top: 5px;
            left: 5px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            display: none;
            cursor: pointer;
            

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
    }
    
    .more {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .artist-name {
        &:hover {
            color: ${props => props.theme.palette.text.primary};
        }
    }
    
`;

const Track = ({ track, cover, trackNr, isActive = false, isPlaying = false, onAddTrack = () => {} }: IPropsTrack) => {
    return (
        <StyledTrack className="Track" elevation={isActive ? 5 : 1}>
            <Box className="cover">
                <img src={track.album.cover || cover} alt="track-cover" />
                <Box onClick={onAddTrack} className={classNames("play-pause", { active: isActive, playing: isPlaying })}>
                    {isPlaying ? <PauseCircleFilledOutlinedIcon className="icon pause" /> : <PlayCircleFilledOutlinedIcon className="icon play" />}
                    {/* {isActive && isPlaying ? <PauseCircleFilledOutlinedIcon className="icon pause" /> : <PlayCircleFilledOutlinedIcon className="icon play" />} */}
                </Box>


            </Box>
            <Typography className="track-nr" variant="subtitle1">{trackNr}</Typography>
            <Box className="track-artist">
                <Typography variant="subtitle1">{track.title}</Typography>
               <Link to={`/artists/${track.artist.id}`}>
               <Typography className="artist-name" variant="caption" color="textSecondary">{track.artist.name}</Typography>
               </Link>
            </Box>
            <Box className="more">
                <IconButton>
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
                <Typography variant="subtitle1">
                    {secondsToSongTime(track.duration)}
                </Typography>
            </Box>
        </StyledTrack>
    )
}

export default Track;