import { Box, Divider, Drawer, IconButton, Input, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const StyledNavigation = styled(Paper)`
    width: 100%;
    position: fixed;
    top: 0;
    padding: 10px;
    display: flex;
    align-items: center;
    z-index: 10;

    .search-field {
        display: flex;
        align-items: center;
        margin-left: 20px;
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return (
        <StyledNavigation square className="Navigation">
            {isMobile && <IconButton onClick={handleDrawerToggle}><MenuIcon /></IconButton>}
            <Box className="search-field">

                <TextField className="search-text" type="search" placeholder="Search" variant="standard" />
                <IconButton>
                    <SearchIcon fontSize="medium" />
                </IconButton>
            </Box>
            {/* <Divider /> */}
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                 keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                 display: { xs: 'block', md: 'none' },
                 '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
               }}
            >
                <SidebarMenu />
            </Drawer>
        </StyledNavigation>
    )
}

export default Navigation;