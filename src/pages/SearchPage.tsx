import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import TrackList from "../components/album/TrackList";
import NavigateBack from "../components/NavigateBack";
import { useSearchQuery } from "../redux/features/apiDeezerSlice";

const StyledSearchPage = styled(Container)`
    .results {
        margin-bottom: 10px;
    }
`;

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const term = searchParams.get('term') || '';
    const { data: searchResult, isFetching, isLoading } = useSearchQuery(term);

    return (
        <StyledSearchPage>
            <NavigateBack />
            {searchResult && <Typography className="results" variant="h3">{searchResult.total} results</Typography>}
            {!isFetching && !isLoading && searchResult && <TrackList hideHeader cover="" tracks={searchResult.data}/>}
            
        </StyledSearchPage>

    )
}

export default SearchPage;