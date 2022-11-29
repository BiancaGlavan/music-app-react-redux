import { Box, Divider, IconButton, Input, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

const StyledNavigation = styled(Paper)`
    width: 100%;
    position: fixed;
    top: 0;
    padding: 10px;

    .search-field {
        display: flex;
        align-items: center;
       
    }

    .search-text {
        input {
            &::after {
                border-bottom: none;
                display: none;
            }
        }
    }


`;

const Navigation = () => {
    return (
        <StyledNavigation square>
            <Box className="search-field">
                <IconButton>
                    <SearchIcon fontSize="medium" />
                </IconButton>
                <TextField className="search-text" type="search" placeholder="Search" variant="standard" />
            </Box>
            {/* <Divider /> */}
        </StyledNavigation>
    )
}

export default Navigation;