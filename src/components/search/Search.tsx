import { Box, Container, Drawer, IconButton, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import useDebounce from "../../helpers/useDebounce";
import { useSearchQuery } from "../../redux/features/apiDeezerSlice";
import TrackList from "../album/TrackList";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrackListSkeleton from "../loaders/TrackListSkeleton";


const StyledDrawerContent = styled('div')`
    background: ${props => props.theme.palette.background.paper};


    .search-field {
        flex-grow: 1;

        .MuiInputBase-root {
            border-radius: 30px;
            margin: 5px;

            input {
                padding: 10px;
                padding-left: 30px;
            }
        }
    }

    .form {
        display: flex;
        flex-grow: 1;
        position: relative;
    }

    .search-results {
        height: 500px;
        overflow: auto;
        padding: 20px;
    }

    .search-header {
        display: flex;
        align-items: center;
    }
`;

const StyledSearch = styled(Box)`
    position: relative;
    flex-grow: 1;
`;

const Search = () => {
    const navigate = useNavigate();
    const [term, setTerm] = useState('');
    const debouncedTerm = useDebounce(term, 400);
    const { data: searchResult, isFetching } = useSearchQuery(debouncedTerm, { skip: debouncedTerm.length < 3 });

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        navigate({
            pathname: "search",
            search: 'term=' + term
        });
    }

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const closeAndReset = () => {
        toggleDrawer();
        setTerm('');
    }

    const navigateAndReset = () => {
        setTerm('');
        setOpen(false);
        navigate({
            pathname: "search",
            search: 'term=' + term
        });
    }


    return (
        <StyledSearch>
            <IconButton onClick={toggleDrawer}>
                <SearchIcon />
            </IconButton>
            <Drawer
                anchor={'top'}
                open={open}
                onClose={closeAndReset}
            >
                <StyledDrawerContent>
                    <Container className="search-header">
                        <IconButton onClick={closeAndReset}>
                            <ArrowBackIcon />
                        </IconButton>
                        <form className="form" onSubmit={handleSubmit}>
                            <TextField value={term} onChange={(e) => setTerm(e.target.value)}
                                className="search-field" variant="outlined" autoComplete='off' />
                        </form>
                        <IconButton onClick={navigateAndReset}>
                            <SearchIcon />
                        </IconButton>
                    </Container>
                    {isFetching && <Paper className="search-results">
                        <TrackListSkeleton hideHeader />
                    </Paper>}
                    {!isFetching && searchResult && <Paper variant="outlined" className="search-results">
                        <TrackList hideHeader={true} cover="" tracks={searchResult.data} /></Paper>}

                </StyledDrawerContent>

            </Drawer>

        </StyledSearch >
    )
}

export default Search;