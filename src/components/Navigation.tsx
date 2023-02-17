import { Drawer, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Search from "./search/Search";
import classNames from "classnames";
import LoginRegister from "./login-register/LoginRegister";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetMyProfileQuery } from "../redux/features/apiSlice";
import { logout, setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const StyledNavigation = styled(Paper)`
  width: calc(100% - 280px);
  position: fixed;
  top: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  z-index: 10;

  &.isMobile {
    width: 100%;
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: userProfile, isSuccess } = useGetMyProfileQuery("", { skip: !authState.isAuth });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
    if (userProfile) {
      dispatch(setUser(userProfile));

    console.log('userProfile', userProfile);
    }
  }, [userProfile]);

  return (
    <StyledNavigation square className={classNames("Navigation", { isMobile: isMobile })}>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      )}
      <Search />
      {!authState.isAuth && <LoginRegister />}
      {authState.isAuth && authState.user && <UserDropdown user={authState.user} handleLogout={handleLogout} />}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        <SidebarMenu />
      </Drawer>
    </StyledNavigation>
  );
};

export default Navigation;
