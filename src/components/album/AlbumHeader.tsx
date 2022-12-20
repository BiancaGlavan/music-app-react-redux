import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import secondsToAlbumTime from "../../helpers/timeFormater";
import { IAlbumResponse } from "../../redux/features/apiDeezerSlice";

interface IPropsAlbumHeader {
    album: IAlbumResponse;
}

const StyledAlbumHeader = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    

        ${props => props.theme.breakpoints.up("sm")} {
            display: flex;
            flex-direction: row;
            align-items: flex-start;

            .album-img {
                margin-right: 30px;
            }
        }

    .album-info {
        display: flex;
        flex-direction: column;
        align-items: center;

        ${props => props.theme.breakpoints.up("sm")} {
            align-items: flex-start;
        }

        .album-name {
            text-align: center;
        }
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
        <StyledAlbumHeader className="AlbumHeader">
            <Box className="album-img">
                <img src={album.cover_medium} alt="" />
            </Box>
            <Box className="album-info">
                <Typography variant="h2" className="album-name">
                    {album.title}
                </Typography>
                <Box className="artist">
                    <Link to={`/artists/${album.artist.id}`}>
                        <img className="artist-img" src={album.artist.picture} alt="" /></Link>
                    <Link to={`/artists/${album.artist.id}`}>
                        <Typography variant="subtitle1">{album.artist.name}</Typography></Link>
                   
                </Box>
                <Box className="album-details">
                    <Typography className="details" color="textSecondary" variant="caption">{album.nb_tracks} tracks</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{secondsToAlbumTime(album.duration)}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{album.release_date}</Typography>
                    <Typography className="details" color="textSecondary" variant="caption">{new Intl.NumberFormat().format(album.fans)} listeners</Typography>
                </Box>
            </Box>
        </StyledAlbumHeader>
    )
}

export default AlbumHeader;