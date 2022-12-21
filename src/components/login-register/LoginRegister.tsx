import { Box, Button, Dialog, DialogContent, Paper, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const StyledLoginRegister = styled('div')`
    .buttons {
        display: flex;
        gap: 10px;
    }
`;

const LoginRegister = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleClickOpenRegister = () => {
    setOpen(true);
    setActiveTab("register");
  };
  const handleClickOpenLogin = () => {
    setOpen(true);
    setActiveTab("login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledLoginRegister>
      <Box className="buttons">
        <Button onClick={handleClickOpenLogin}>
          Login
        </Button>
        <Button variant="outlined" size="small" onClick={handleClickOpenRegister}>
          Register
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box className="tabs">
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab value="login" label="Login" />
              <Tab value="register" label="Register" />
            </Tabs>
          </Box>
          {activeTab === "login" && <Login onTabChange={setActiveTab} />}
          {activeTab === "register" && <Register onTabChange={setActiveTab} />}
        </DialogContent>
      </Dialog>
    </StyledLoginRegister>
  );
};

export default LoginRegister;
