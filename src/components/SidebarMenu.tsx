import { styled } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const StyledSidebar = styled(Paper)`
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    padding: 20px;
    flex-shrink: 0;
    position: sticky;
    top: 0;
`;

const SidebarMenu = () => {
  return (
    <StyledSidebar square className="SidebarMenu">SidebarMenu
        <Link to={'/'}>
        HomePage
        </Link>
        <Link to={'/charts'}>
        Charts Page
        </Link>
        <Button variant="contained" color="primary">Primary</Button>
        
    </StyledSidebar>
  )
}

export default SidebarMenu;