import { Box, Button, Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledQueue = styled(Box)`

  display: flex;
  align-items: center;
  margin-left: 20px;
  

  .MuiDrawer-paper {
    background: red;
  }

`;

const Queue = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
      setOpen(!open);
  };

  return (


    <StyledQueue>
      <Button variant="contained" onClick={handleDrawerToggle}>
        Queue
      </Button>
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', height: 'calc(100vh - 90px)', marginBottom: '90px' },
        }}
      >
        Queue Content

        <Button variant="contained" onClick={handleDrawerToggle}>
        close
      </Button>
      </Drawer>
    </StyledQueue>


  )
}

export default Queue;