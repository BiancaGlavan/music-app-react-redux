import { Box, Container, Grid, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TrackListSkeleton from "./TrackListSkeleton";

const StyledArtistPageSkeleton = styled(Container)`
  .artist-container {
    display: flex;
    align-items: center;
    gap: 30px;

    .artist-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      align-items: center;

      .buttons {
        margin-top: 20px;
        display: flex;
        gap: 20px;
      }
    }
  }

  .artist-img {
    position: relative;
    width: 100px;
    height: 100px;

    ${(props) => props.theme.breakpoints.up("sm")} {
      width: 200px;
      height: 200px;
    }

    .img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }

  .tabs {
    margin-top: 40px;
    display: flex;
    gap: 30px;
  }

  .grid {
    margin-top: 30px;
  }

  .grid-similar-artists {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .similar-artists {
    display: flex;
    align-items: center;

    .fav {
        margin-left: auto;
    }

    .similar-artists-img {
      position: relative;
      width: 68px;
      height: 68px;
      margin-right: 20px;

      .similar-img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const ArtistPageSkeleton = () => {
  return (
    <StyledArtistPageSkeleton>
      <Box className="artist-container">
        <Box className="artist-img">
          <Skeleton className="img" variant="circular" />
        </Box>
        <Box className="artist-info">
          <Skeleton variant="rectangular" width={130} height={20} />
          <Skeleton variant="text" width={130} />
          <Box className="buttons">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
          </Box>
        </Box>
      </Box>
      <Box className="tabs">
        <Skeleton variant="rectangular" width={80} height={10} />
        <Skeleton variant="rectangular" width={80} height={10} />
        <Skeleton variant="rectangular" width={80} height={10} />
        <Skeleton variant="rectangular" width={80} height={10} />
      </Box>
      <Grid className="grid" container spacing={2}>
        <Grid item xs={12} sm={12} lg={8}>
          <TrackListSkeleton hideHeader />
        </Grid>
        <Grid className="grid-similar-artists" item xs={12} sm={12} lg={4}>
          <Skeleton variant="rectangular" width={120} height={20} />
          <Box className="similar-artists">
            <Box className="similar-artists-img">
              <Skeleton className="similar-img" variant="circular" />
            </Box>
            <Box className="similar-artists-info">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Box>
            <Skeleton className="fav" variant="circular" width={20} height={20}/>
          </Box>
          <Box className="similar-artists">
            <Box className="similar-artists-img">
              <Skeleton className="similar-img" variant="circular" />
            </Box>
            <Box className="similar-artists-info">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Box>
            <Skeleton className="fav" variant="circular" width={20} height={20}/>
          </Box>
          <Box className="similar-artists">
            <Box className="similar-artists-img">
              <Skeleton className="similar-img" variant="circular" />
            </Box>
            <Box className="similar-artists-info">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Box>
            <Skeleton className="fav" variant="circular" width={20} height={20}/>
          </Box>
          <Skeleton variant="rectangular" width={150} height={30}/>
        </Grid>
      </Grid>
    </StyledArtistPageSkeleton>
  );
};

export default ArtistPageSkeleton;
