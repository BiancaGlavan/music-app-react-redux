import { Grid, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledArtistsListSkeleton = styled('div')`
.title {
    margin: 20px 0;
}

.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
        margin-bottom: 10px;
    }
}
`;

const ArtistsListSkeleton = () => {
  return (
    <StyledArtistsListSkeleton>
        <Skeleton variant="rectangular" className="title" width={200} height={30}/>
        <Grid container spacing={10}>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={120} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={50} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={80} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={100} height={20}/>
            </Grid>
            <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={70} height={20}/>
            </Grid> <Grid item className="artist-card" xs={6} sm={4} md={4} lg={3}>
                <Skeleton className="img" variant="circular" width={120} height={120}/>
                <Skeleton variant="rectangular" width={70} height={20}/>
            </Grid>
        </Grid>
    </StyledArtistsListSkeleton>
  )
}

export default ArtistsListSkeleton;