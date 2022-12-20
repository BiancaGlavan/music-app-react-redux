import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import secondsToAlbumTime from "../../helpers/timeFormater";
import { IPlaylistResponse } from "../../redux/features/apiDeezerSlice";

interface IPropsPlaylistHeader {
    playlist: IPlaylistResponse;
}

const StyledPlaylistHeader = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${props => props.theme.breakpoints.up("sm")} {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .playlist-img {
            margin-right: 30px;
        }
    }

    .playlist-info {
        display: flex;
        flex-direction: column;
        
        .playlist-name {
            text-align: center;

            ${props => props.theme.breakpoints.up("sm")} {
                text-align: justify;
            }
        }
    }

    .artist {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        align-items: center;

        ${props => props.theme.breakpoints.up("sm")} {
            align-items: flex-start;
        }
    }

    .playlist-details {
        margin-top: 10px;

        .details {
            margin-right: 15px;
        }
    } 
`;

const PlaylistHeader = ({ playlist }: IPropsPlaylistHeader) => {
    return (
        <StyledPlaylistHeader>
            <Box className="playlist-img">
                <img src={playlist.picture_medium} alt="" />
            </Box>
            <Box className="playlist-info">
                <Typography variant="h2" className="playlist-name">
                    {playlist.title}
                </Typography>
                <Box className="artist">
                    <Typography className="text" variant="body1">Created by: {playlist.creator.name}</Typography>
                    <Typography className="text" variant="body2">{playlist.description}</Typography>
                </Box>
                <Box className="playlist-details">
                    <Typography className="details" color="textSecondary" variant="caption">{playlist.nb_tracks} tracks</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{secondsToAlbumTime(playlist.duration)}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{playlist.creation_date}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{new Intl.NumberFormat().format(playlist.fans)} listeners</Typography>
                </Box>
            </Box>
        </StyledPlaylistHeader>
    )
}

export default PlaylistHeader;