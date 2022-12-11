import { Box, Divider, Skeleton } from "@mui/material";
import TrackSkeleton from "./TrackSkeleton";
import { styled } from "@mui/material/styles"

interface IPropsTrackListSkeleton {
  hideHeader?: boolean;
}

const StyledTrackListSkeleton = styled('div')`
.track {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 10px;

    .icon {
      margin-right: 20px;
    }
  }

  .divider {
    margin-bottom: 20px;
    
  }
`;

const TrackListSkeleton = ({ hideHeader = false }: IPropsTrackListSkeleton) => {
  return (
    <StyledTrackListSkeleton>
      {!hideHeader && <>
        <Box className="track">
          <Skeleton variant="rectangular" width={60} height={20} />
          <Skeleton className="icon" variant="circular" width={20} height={20} />
        </Box>
        <Divider className="divider" />
      </>}
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
    </StyledTrackListSkeleton>
  )
}

export default TrackListSkeleton;