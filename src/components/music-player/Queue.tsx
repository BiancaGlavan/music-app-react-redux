import { Box, Button, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CloseIcon from '@mui/icons-material/Close';
import QueueContent from "./QueueContent";

const StyledQueue = styled(Box)`

  display: flex;
  align-items: center;
  margin-left: 10px;

  ${props => props.theme.breakpoints.up("sm")} {
    margin-left: 20px;
  }

  .MuiDrawer-paper {
    background: red;
  }

  .close {
    display: flex;
    justify-content: flex-end;
  }

`;

const Queue = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (


    <StyledQueue>
      {isMobile ? <IconButton onClick={handleDrawerToggle}>
        <QueueMusicIcon />
        </IconButton> : <Button variant="outlined" onClick={handleDrawerToggle} startIcon={<QueueMusicIcon />}>
       Queue
      </Button>}
      {/* <Button variant="outlined" onClick={handleDrawerToggle} startIcon={<QueueMusicIcon />}>
        {!isMobile && 'Queue'}
      </Button> */}
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', height: 'calc(100vh - 90px)', marginBottom: '105px' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <QueueContent />
      </Drawer>
    </StyledQueue>


  )
}

export default Queue;