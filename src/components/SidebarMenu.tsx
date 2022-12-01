import { styled } from "@mui/material/styles";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';

const StyledSidebar = styled(Paper)`
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    min-width: 280px;
    padding-top: 40px;
    flex-shrink: 0;
    position: sticky;
    top: 0;
`;

const SidebarMenu = () => {
  return (
    <StyledSidebar square className="SidebarMenu">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryMusicOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </List>
    </StyledSidebar>
  )
}

export default SidebarMenu;