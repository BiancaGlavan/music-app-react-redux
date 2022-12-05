import { Box, Divider, Skeleton } from "@mui/material";
import TrackLoader from "./TrackLoader";
import {styled} from "@mui/material/styles"


const StyledTrackListLoader = styled('div')`
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

const TrackListLoader = () => {
  return (
    <StyledTrackListLoader>
        <Box className="track">
            <Skeleton variant="rectangular" width={60} height={20}/>
            <Skeleton className="icon" variant="circular" width={20} height={20}/>
        </Box>
        <Divider className="divider"/>
        <TrackLoader />
        <TrackLoader />
        <TrackLoader />
        <TrackLoader />
        <TrackLoader />
        <TrackLoader />
        <TrackLoader />
    </StyledTrackListLoader>
  )
}

export default TrackListLoader;