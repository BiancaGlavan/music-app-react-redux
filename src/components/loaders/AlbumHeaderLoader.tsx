import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";




const StyledAlbumHeaderLoader = styled('div')`
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
            margin-right: 10px;
        }
    }

    .album-details {
        display: flex;
        margin-top: 20px;

        .details {
            margin-right: 15px;
        }
    } 

`;

const AlbumHeaderLoader = () => {
  return (
    <StyledAlbumHeaderLoader>
        <Box className="album-img">
            <Skeleton variant="rectangular" width={250} height={250} />
        </Box>
        <Box className="album-info">
            <Skeleton variant="rectangular" width={200} height={40}/>
            <Box className="artist">
                <Skeleton className="artist-img" variant="circular" width={40} height={40}/>
                <Skeleton variant="rectangular" width={100} height={15}/>
            </Box>
            <Box className="album-details">
                <Skeleton className="details" variant="rectangular" width={50} height={8} />
                <Skeleton className="details" variant="rectangular" width={40} height={8}/>
                <Skeleton className="details" variant="rectangular" width={80} height={8}/>
                <Skeleton className="details" variant="rectangular" width={60} height={8}/>
            </Box>
        </Box>
    </StyledAlbumHeaderLoader>
  )
}

export default AlbumHeaderLoader;