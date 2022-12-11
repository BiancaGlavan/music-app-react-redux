import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import TrackList from "../components/album/TrackList";
import NavigateBack from "../components/NavigateBack";
import { useSearchQuery } from "../redux/features/apiDeezerSlice";

const StyledSearchPage = styled(Container)`

`;

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const term = searchParams.get('term') || '';
    const { data: searchResult, isFetching, isLoading } = useSearchQuery(term);

    return (
        <StyledSearchPage>
            <NavigateBack />
            {!isFetching && !isLoading && searchResult && <TrackList title={`${searchResult.total} results`} cover="" tracks={searchResult.data}/>}
            
        </StyledSearchPage>

    )
}

export default SearchPage;