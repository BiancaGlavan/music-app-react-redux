import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAlbumHeaderSkeleton = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .album-img {
    margin-right: 30px;
    ${(props) => props.theme.breakpoints.down("sm")} {
      margin-right: 0;
    }
  }

  .album-info {
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.down("sm")} {
      margin-top: 10px;
      align-items: center;
    }
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

const AlbumHeaderSkeleton = () => {
  return (
    <StyledAlbumHeaderSkeleton>
      <Box className="album-img">
        <Skeleton variant="rectangular" width={250} height={250} />
      </Box>
      <Box className="album-info">
        <Skeleton variant="rectangular" width={200} height={30} />
        <Box className="artist">
          <Skeleton className="artist-img" variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={100} height={15} />
        </Box>
        <Box className="album-details">
          <Skeleton className="details" variant="rectangular" width={50} height={8} />
          <Skeleton className="details" variant="rectangular" width={40} height={8} />
          <Skeleton className="details" variant="rectangular" width={80} height={8} />
          <Skeleton className="details" variant="rectangular" width={60} height={8} />
        </Box>
      </Box>
    </StyledAlbumHeaderSkeleton>
  );
};

export default AlbumHeaderSkeleton;
