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

    .playlist-img {
        margin-right: 30px;
    }

    .playlist-info {
        display: flex;
        flex-direction: column;
    }

    .artist {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        align-items: flex-start;
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
                <Typography variant="h5" className="playlist-name">
                    {playlist.title}
                </Typography>
                <Box className="artist">
                    <Typography variant="subtitle1">Created by: {playlist.creator.name}</Typography>
                    <Typography variant="subtitle1">{playlist.description}</Typography>
                </Box>
                <Box className="playlist-details">
                    <Typography className="details" color="textSecondary" variant="caption">{playlist.nb_tracks} tracks</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{secondsToAlbumTime(playlist.duration)}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{playlist.creation_date}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{new Intl.NumberFormat().format(playlist.fans)} fans</Typography>
                </Box>
            </Box>
        </StyledPlaylistHeader>
    )
}

export default PlaylistHeader;