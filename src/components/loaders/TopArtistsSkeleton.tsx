import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTopArtistsSkeleton = styled('div')`
margin-bottom: 50px;


.header {
    display: flex;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    justify-content: space-between;

    .buttons {
        display: flex;

        .button {
            margin-right: 20px;
        }
    }
}

.swiper {
    display: flex;

    .slide {
        display: flex;
        flex-direction: column;
        margin: 10px;
        flex-grow: 1;
    }

    .text-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
`;

const TopArtistsSkeleton = () => {
    return (
        <StyledTopArtistsSkeleton>
            <Box className="header">
                <Skeleton variant="rectangular" width={150} height={40} />
                <Box className="buttons">
                    <Skeleton className="button" variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                </Box>
            </Box>
            <Box className="swiper">
                <Box className="slide">
                    <Skeleton variant="rectangular" width={220} height={233} />
                    <Box className="text-box">
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Box>
                <Box className="slide">
                    <Skeleton variant="rectangular" width={220} height={233} />
                    <Box className="text-box">
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Box>
                <Box className="slide">
                    <Skeleton variant="rectangular" width={220} height={233} />
                    <Box className="text-box">
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Box>
                <Box className="slide">
                    <Skeleton variant="rectangular" width={220} height={233} />
                    <Box className="text-box">
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Box>
                <Box className="slide">
                    <Skeleton variant="rectangular" width={220} height={233} />
                    <Box className="text-box">
                        <Skeleton variant="text" width={100} />
                    </Box>
                </Box>
            </Box>
        </StyledTopArtistsSkeleton>
    )
}

export default TopArtistsSkeleton;