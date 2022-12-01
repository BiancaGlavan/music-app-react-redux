import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import secondsToAlbumTime from "../../helpers/timeFormater";
import { IAlbumResponse } from "../../redux/features/apiDeezerSlice";

interface IPropsAlbumHeader {
    album: IAlbumResponse;
}

const StyledAlbumHeader = styled('div')`
    display: flex;

    .album-img {
        margin-right: 30px;
    }

    .album-info {
        display: flex;
        flex-direction: column;
    }

    .artist {
        display: flex;
        margin-top: 20px;
        align-items: center;

        .artist-img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 10px;
        }
    }

    .album-details {
        margin-top: 10px;

        .details {
            margin-right: 15px;
        }
    } 
`;

const AlbumHeader = ({ album }: IPropsAlbumHeader) => {
    return (
        <StyledAlbumHeader>
            <Box className="album-img">
                <img src={album.cover_medium} alt="" />
            </Box>
            <Box className="album-info">
                <Typography variant="h5" className="album-name">
                    {album.title}
                </Typography>
                <Box className="artist">
                    <img className="artist-img" src={album.artist.picture} alt="" />
                    <Typography variant="subtitle1">{album.artist.name}</Typography>
                </Box>
                <Box className="album-details">
                    <Typography className="details" color="textSecondary" variant="caption">{album.nb_tracks} tracks</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{secondsToAlbumTime(album.duration)}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{album.release_date}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{new Intl.NumberFormat().format(album.fans)} fans</Typography>
                </Box>
            </Box>
        </StyledAlbumHeader>
    )
}

export default AlbumHeader;