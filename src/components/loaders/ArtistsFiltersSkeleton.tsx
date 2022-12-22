import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledArtistsFiltersSkeleton = styled('div')`
    display: flex;
    overflow: hidden;

    .genre {
        margin: 10px;
        border-radius: 50px;
        flex-shrink: 0;
    }
`;

const ArtistsFiltersSkeleton = () => {
  return (
    <StyledArtistsFiltersSkeleton>
        <Skeleton className="genre" variant="rounded" width={40} height={30}/>
        <Skeleton className="genre" variant="rounded" width={70} height={30}/>
        <Skeleton className="genre" variant="rounded" width={100} height={30}/>
        <Skeleton className="genre" variant="rounded" width={50} height={30}/>
        <Skeleton className="genre" variant="rounded" width={100} height={30}/>
        <Skeleton className="genre" variant="rounded" width={50} height={30}/>
        <Skeleton className="genre" variant="rounded" width={80} height={30}/>
        <Skeleton className="genre" variant="rounded" width={70} height={30}/>
        <Skeleton className="genre" variant="rounded" width={50} height={30}/>
        <Skeleton className="genre" variant="rounded" width={70} height={30}/>
        <Skeleton className="genre" variant="rounded" width={50} height={30}/>
        <Skeleton className="genre" variant="rounded" width={80} height={30}/>
        <Skeleton className="genre" variant="rounded" width={100} height={30}/>
    </StyledArtistsFiltersSkeleton>
  )
}

export default ArtistsFiltersSkeleton;