import { styled } from "@mui/material/styles";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import classNames from "classnames";

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

    .list-item {
      &.active {
        color: ${props => props.theme.palette.primary.main};
      }
    }
`;

const SidebarMenu = () => {
  const location = useLocation();

  return (
    <StyledSidebar square className="SidebarMenu">
      <List>
        <Link to={'/'}>
          <ListItem disablePadding className={classNames('list-item', {active: location.pathname === '/'})}>
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/explore'}>
          <ListItem disablePadding className={classNames('list-item', {active: location.pathname === '/explore'})}>
            <ListItemButton>
              <ListItemIcon>
                <LibraryMusicOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </StyledSidebar>
  )
}

export default SidebarMenu;