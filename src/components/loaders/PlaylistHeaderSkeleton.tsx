import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";




const StyledPlaylistHeaderSkeleton = styled('div')`
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
        flex-direction: column;
        margin-top: 20px;

        .desc {
            margin-top: 20px;
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

const PlaylistHeaderSkeleton = () => {
  return (
    <StyledPlaylistHeaderSkeleton>
        <Box className="album-img">
            <Skeleton variant="rectangular" width={250} height={250} />
        </Box>
        <Box className="album-info">
            <Skeleton variant="rectangular" width={200} height={40}/>
            <Box className="artist">
                <Skeleton variant="rectangular" width={150} height={15}/>
                <Skeleton className="desc" variant="rectangular" width={500} height={15}/>
            </Box>
            <Box className="album-details">
                <Skeleton className="details" variant="rectangular" width={50} height={8} />
                <Skeleton className="details" variant="rectangular" width={40} height={8}/>
                <Skeleton className="details" variant="rectangular" width={80} height={8}/>
                <Skeleton className="details" variant="rectangular" width={60} height={8}/>
            </Box>
        </Box>
    </StyledPlaylistHeaderSkeleton>
  )
}

export default PlaylistHeaderSkeleton;