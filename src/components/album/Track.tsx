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
        width: 40px;
        height: 40px;
        margin: 5px;
        position: relative;
        flex-shrink: 0;

        ${props => props.theme.breakpoints.up("md")} {
            width: 50px;
            height: 50px;
        }
      
          

        img {
            width: 100%;
        }

        .play-pause {
            position: absolute;
            background: ${props => props.theme.palette.background.default};
            top: 5px;
            left: 5px;
            width: 30px;
            height: 30px;
            border-radius: 30px;
            display: none;
            cursor: pointer;
            padding: 0;

            ${props => props.theme.breakpoints.up("md")} {
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
                <IconButton onClick={onAddTrack} className={classNames("play-pause", { active: isActive, playing: isPlaying })}>
                    {isPlaying ? <PauseCircleFilledOutlinedIcon className="icon pause" /> : <PlayCircleFilledOutlinedIcon className="icon play" />}
                    {/* {isActive && isPlaying ? <PauseCircleFilledOutlinedIcon className="icon pause" /> : <PlayCircleFilledOutlinedIcon className="icon play" />} */}
                </IconButton>


            </Box>
            <Typography className="track-nr" variant="subtitle1">{trackNr}</Typography>
            <Box className="track-artist">
                <Typography noWrap variant="body2">{track.title}</Typography>
               <Link className="artist-link" to={`/artists/${track.artist.id}`}>
               <Typography noWrap className="artist-name" variant="caption" color="textSecondary">{track.artist.name}</Typography>
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