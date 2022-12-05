import { Box, Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";


interface IPropsTrackSkeleton {
    artistWidth?: number;
    trackWidth?: number;
}

const StyledTrackSkeleton = styled(Paper)`
    display: flex;
    margin-bottom: 10px;
    align-items: center;

    .cover {
        margin: 5px;
    }

    .track-nr {
        margin: 0 20px;
    }

    .track-artist {
        flex-grow: 1;
    }

    .more {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    .fav-icon {
        margin-right: 10px;
    }
`;

const TrackSkeleton = ({ artistWidth = 70, trackWidth = 100 }: IPropsTrackSkeleton) => {
    return (
        <StyledTrackSkeleton elevation={1}>
            <Skeleton className="cover" variant="rectangular" width={50} height={50} />
            <Skeleton className="track-nr" variant="text" width={20} height={40} />
            <Box className="track-artist">
                <Skeleton variant="text" width={trackWidth} />
                <Skeleton className="artist-name" variant="text" width={artistWidth} />
            </Box>
            <Box className="more">
                <Skeleton variant="circular" className="fav-icon" width={30} height={30} />
                <Skeleton variant="text" width={40}  />

            </Box>
        </StyledTrackSkeleton>
    )
}

export default TrackSkeleton;