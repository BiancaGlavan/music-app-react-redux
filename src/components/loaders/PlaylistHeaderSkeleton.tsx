import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPlaylistHeaderSkeleton = styled("div")`
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
    flex-direction: column;
    margin-top: 20px;

    ${(props) => props.theme.breakpoints.down("sm")} {
        align-items: center;
    }

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
        <Skeleton variant="rectangular" width={200} height={30} />
        <Box className="artist">
          <Skeleton variant="rectangular" width={200} height={15} />
          <Skeleton className="desc" variant="rectangular" width={280} height={15} />
        </Box>
        <Box className="album-details">
          <Skeleton className="details" variant="rectangular" width={50} height={8} />
          <Skeleton className="details" variant="rectangular" width={40} height={8} />
          <Skeleton className="details" variant="rectangular" width={80} height={8} />
          <Skeleton className="details" variant="rectangular" width={60} height={8} />
        </Box>
      </Box>
    </StyledPlaylistHeaderSkeleton>
  );
};

export default PlaylistHeaderSkeleton;
